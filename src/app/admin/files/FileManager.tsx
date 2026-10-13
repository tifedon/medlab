'use client';

import { useRef, useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export interface WebsiteFileRecord {
  name: string;
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  size: number | null;
  mimeType: string | null;
  publicUrl: string;
}

const bucket = 'website-files';
const maxFileSize = 50 * 1024 * 1024;
const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function safeFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.');
  const extension = dotIndex > 0 ? fileName.slice(dotIndex).toLowerCase() : '';
  const base = (dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'website-file';

  return `${base}${extension}`;
}

function displayName(fileName: string) {
  return fileName.replace(/^\d{13}-[a-f0-9]{8}-/, '');
}

function formatBytes(bytes: number | null) {
  if (bytes === null) return 'Size unavailable';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function mapStorageFile(
  item: {
    name: string;
    id?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    metadata?: Record<string, unknown> | null;
  },
  publicUrl: string,
): WebsiteFileRecord {
  return {
    name: item.name,
    id: item.id ?? item.name,
    createdAt: item.created_at ?? null,
    updatedAt: item.updated_at ?? null,
    size: typeof item.metadata?.size === 'number' ? item.metadata.size : null,
    mimeType: typeof item.metadata?.mimetype === 'string' ? item.metadata.mimetype : null,
    publicUrl,
  };
}

export default function FileManager({ initialFiles, initialError }: { initialFiles: WebsiteFileRecord[]; initialError: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(initialFiles);
  const [message, setMessage] = useState<string | null>(initialError ? 'Storage is not ready. Apply the website file storage migration, then reload this page.' : null);
  const [isError, setIsError] = useState(Boolean(initialError));
  const [busyFile, setBusyFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function refreshFiles() {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from(bucket).list('', {
      limit: 200,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) throw error;

    setFiles(
      (data ?? []).filter(item => item.id).map(item => {
        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(item.name);
        return mapStorageFile(item, publicData.publicUrl);
      }),
    );
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = inputRef.current?.files?.[0];

    if (!selected) {
      setIsError(true);
      setMessage('Choose a PDF or image to upload.');
      return;
    }
    if (!allowedTypes.has(selected.type)) {
      setIsError(true);
      setMessage('Only PDF, JPG, PNG and WebP files are accepted.');
      return;
    }
    if (selected.size > maxFileSize) {
      setIsError(true);
      setMessage('This file is larger than the 50 MB upload limit.');
      return;
    }

    setIsUploading(true);
    setIsError(false);
    setMessage(`Uploading ${selected.name}…`);

    const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeFileName(selected.name)}`;
    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).upload(path, selected, {
      cacheControl: '3600',
      contentType: selected.type,
      upsert: false,
    });

    if (error) {
      setIsUploading(false);
      setIsError(true);
      setMessage(error.message);
      return;
    }

    try {
      await refreshFiles();
      if (inputRef.current) inputRef.current.value = '';
      setMessage(`${selected.name} is now available on the website.`);
    } catch (refreshError) {
      setIsError(true);
      setMessage(refreshError instanceof Error ? refreshError.message : 'The file uploaded, but the list could not be refreshed.');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemove(file: WebsiteFileRecord) {
    if (!window.confirm(`Remove “${displayName(file.name)}” from the website? Its public link will stop working.`)) return;

    setBusyFile(file.name);
    setIsError(false);
    setMessage(`Removing ${displayName(file.name)}…`);
    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).remove([file.name]);

    if (error) {
      setIsError(true);
      setMessage(error.message);
    } else {
      setFiles(current => current.filter(item => item.name !== file.name));
      setMessage(`${displayName(file.name)} was removed.`);
    }
    setBusyFile(null);
  }

  async function handleCopy(file: WebsiteFileRecord) {
    try {
      await navigator.clipboard.writeText(file.publicUrl);
      setIsError(false);
      setMessage(`Copied the public link for ${displayName(file.name)}.`);
    } catch {
      setIsError(true);
      setMessage('The link could not be copied. Open the file and copy the address from your browser.');
    }
  }

  return (
    <div>
      <section className={styles.upload} aria-labelledby="upload-heading">
        <div>
          <h2 id="upload-heading">Add a file</h2>
          <p>Accepted formats: PDF, JPG, PNG and WebP. Maximum size: 50 MB. Uploaded files are public to anyone with the link.</p>
        </div>
        <form onSubmit={handleUpload} className={styles.uploadForm}>
          <label htmlFor="website-file">Choose file</label>
          <input ref={inputRef} id="website-file" name="websiteFile" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" disabled={isUploading} />
          <button type="submit" disabled={isUploading}>{isUploading ? 'Uploading…' : 'Upload file'}</button>
        </form>
      </section>

      <div className={`${styles.message} ${isError ? styles.messageError : ''}`} role="status" aria-live="polite">
        {message ?? `${files.length} file${files.length === 1 ? '' : 's'} available.`}
      </div>

      <section className={styles.files} aria-labelledby="files-heading">
        <div className={styles.listHeading}>
          <h2 id="files-heading">Current files</h2>
          <span>{files.length}</span>
        </div>
        {files.length === 0 ? (
          <p className={styles.empty}>No website files have been uploaded yet.</p>
        ) : (
          <ul className={styles.fileList}>
            {files.map(file => (
              <li key={file.id}>
                <div className={styles.fileDetails}>
                  <a href={file.publicUrl} target="_blank" rel="noopener noreferrer">{displayName(file.name)}</a>
                  <span>
                    {file.mimeType ?? 'File'} · {formatBytes(file.size)}
                    {file.createdAt ? ` · Added ${new Date(file.createdAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}` : ''}
                  </span>
                </div>
                <div className={styles.fileActions}>
                  <button type="button" onClick={() => handleCopy(file)}>Copy link</button>
                  <button type="button" className={styles.remove} onClick={() => handleRemove(file)} disabled={busyFile === file.name}>
                    {busyFile === file.name ? 'Removing…' : 'Remove'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
