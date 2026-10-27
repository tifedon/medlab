'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AdminPressBook } from '@/lib/press-catalogue';
import type { BookCategory, BookStatus } from '@/lib/books';
import type { TeamMember } from '@/lib/people';
import { deleteBook, saveBook, type BookLinkInput } from './actions';
import PeoplePicker from './PeoplePicker';
import styles from './page.module.css';

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxImageSize = 12 * 1024 * 1024;

function splitList(value: FormDataEntryValue | null) {
  return String(value ?? '').split(/[\n,]/).map(item => item.trim()).filter(Boolean);
}

function makeSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function safeImageName(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  return `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-book-cover.${extension}`;
}

export default function BookEditor({ book, teamMembers }: { book: AdminPressBook | null; teamMembers: TeamMember[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [coverImageUrl, setCoverImageUrl] = useState(book?.cover_image_url ?? '');
  const [backCoverImageUrl, setBackCoverImageUrl] = useState(book?.back_cover_image_url ?? '');
  const [authors, setAuthors] = useState<string[]>(book?.author_names ?? []);
  const [editors, setEditors] = useState<string[]>(book?.editor_names ?? []);
  const [links, setLinks] = useState<BookLinkInput[]>(
    [...(book?.book_purchase_links ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(link => ({ retailerName: link.retailer_name, url: link.url, format: link.format ?? '', priceLabel: link.price_label ?? '' })),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [uploading, setUploading] = useState<'front' | 'back' | null>(null);

  async function uploadImage(file: File | undefined, side: 'front' | 'back') {
    if (!file) return;
    if (!imageTypes.has(file.type)) {
      setIsError(true);
      setMessage('Choose a JPG, PNG or WebP image.');
      return;
    }
    if (file.size > maxImageSize) {
      setIsError(true);
      setMessage('Cover images must be 12 MB or smaller.');
      return;
    }

    setUploading(side);
    setIsError(false);
    setMessage(`Uploading ${side} cover…`);
    const supabase = createClient();
    const path = safeImageName(file);
    const { error } = await supabase.storage.from('website-files').upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      setIsError(true);
      setMessage(error.message);
    } else {
      const { data } = supabase.storage.from('website-files').getPublicUrl(path);
      if (side === 'front') setCoverImageUrl(data.publicUrl);
      else setBackCoverImageUrl(data.publicUrl);
      setMessage(`${side === 'front' ? 'Front' : 'Back'} cover uploaded. Save the book to publish it.`);
    }
    setUploading(null);
  }

  function updateLink(index: number, field: keyof BookLinkInput, value: string) {
    setLinks(current => current.map((link, itemIndex) => itemIndex === index ? { ...link, [field]: value } : link));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const publicationYear = Number(form.get('publicationYear')) || null;
    const pageCount = Number(form.get('pageCount')) || null;
    const title = String(form.get('title') ?? '');

    setIsError(false);
    setMessage('Saving book…');
    startTransition(async () => {
      const result = await saveBook({
        id: book?.id,
        title,
        slug: String(form.get('slug') ?? '') || makeSlug(title),
        subtitle: String(form.get('subtitle') ?? ''),
        summary: String(form.get('summary') ?? ''),
        category: String(form.get('category')) as BookCategory,
        authors,
        editors,
        publisher: String(form.get('publisher') ?? ''),
        publicationYear,
        isbn13: String(form.get('isbn13') ?? ''),
        pageCount,
        status: String(form.get('status')) as BookStatus,
        coverImageUrl,
        backCoverImageUrl,
        keywords: splitList(form.get('keywords')),
        divisionIds: splitList(form.get('divisionIds')),
        isVisible: form.get('isVisible') === 'on',
        purchaseLinks: links.filter(link => link.retailerName.trim() || link.url.trim()),
      });

      if (!result.ok) {
        setIsError(true);
        setMessage(result.error ?? 'The book could not be saved.');
        return;
      }
      setMessage('Book saved.');
      router.push(`/admin/books/${result.id}`);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!book || !window.confirm(`Delete “${book.title}” from the catalogue? This cannot be undone.`)) return;
    setMessage('Deleting book…');
    startTransition(async () => {
      const result = await deleteBook(book.id);
      if (!result.ok) {
        setIsError(true);
        setMessage(result.error ?? 'The book could not be deleted.');
        return;
      }
      router.push('/admin/books');
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.editor}>
      <div className={`${styles.message} ${isError ? styles.messageError : ''}`} role="status" aria-live="polite">
        {message ?? 'Required fields are marked with an asterisk.'}
      </div>

      <section className={styles.formSection}>
        <div className={styles.sectionIntro}><h2>Book information</h2><p>The details shown in the public catalogue and book page.</p></div>
        <div className={styles.fields}>
          <label className={styles.full}>Title *<input name="title" required maxLength={240} defaultValue={book?.title ?? ''} /></label>
          <label className={styles.full}>Subtitle<input name="subtitle" defaultValue={book?.subtitle ?? ''} /></label>
          <label>URL slug<input name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="created-from-title" defaultValue={book?.slug ?? ''} /></label>
          <label>Category<select name="category" defaultValue={book?.category ?? 'reference'}><option value="reference">Reference book</option><option value="textbook">Textbook</option><option value="handbook">Handbook</option><option value="monograph">Monograph</option><option value="atlas">Atlas</option></select></label>
          <PeoplePicker
            label="Authors"
            hint="Tick team members, or type a name below to add someone not listed."
            teamMembers={teamMembers}
            value={authors}
            onChange={setAuthors}
          />
          <PeoplePicker
            label="Editors"
            hint="Tick team members, or type a name below to add someone not listed."
            teamMembers={teamMembers}
            value={editors}
            onChange={setEditors}
          />
          <label>Publisher<input name="publisher" defaultValue={book?.publisher ?? 'Sterling IMRES Press'} /></label>
          <label>Publication status<select name="status" defaultValue={book?.status ?? 'upcoming'}><option value="upcoming">Upcoming</option><option value="in-development">In development</option><option value="in-editing">In editing</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label>Publication year<input name="publicationYear" type="number" min={1400} max={2100} defaultValue={book?.publication_year ?? ''} /></label>
          <label>Page count<input name="pageCount" type="number" min={1} defaultValue={book?.page_count ?? ''} /></label>
          <label className={styles.full}>ISBN-13<input name="isbn13" defaultValue={book?.isbn13 ?? ''} /></label>
          <label className={styles.full}>Summary *<textarea name="summary" required minLength={20} maxLength={5000} rows={6} defaultValue={book?.summary ?? ''} /></label>
          <label>Keywords<textarea name="keywords" rows={4} placeholder="Comma-separated or one per line" defaultValue={book?.keywords.join(', ') ?? ''} /></label>
          <label>Division IDs<textarea name="divisionIds" rows={4} placeholder="editorial-publications" defaultValue={book?.division_ids.join(', ') ?? 'editorial-publications'} /></label>
          <label className={`${styles.full} ${styles.check}`}><input name="isVisible" type="checkbox" defaultChecked={book?.is_visible ?? true} />Show this book on the public website</label>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.sectionIntro}><h2>Cover images</h2><p>Upload front and back cover artwork, or paste an existing public image address.</p></div>
        <div className={styles.coverFields}>
          {([['front', coverImageUrl, setCoverImageUrl], ['back', backCoverImageUrl, setBackCoverImageUrl]] as const).map(([side, url, setUrl]) => (
            <div className={styles.coverField} key={side}>
              <h3>{side === 'front' ? 'Front cover' : 'Back cover'}</h3>
              {url ? <Image src={url} alt={`${side} cover preview`} width={300} height={388} className={styles.coverPreview} unoptimized /> : <div className={styles.coverPlaceholder}>No image</div>}
              <label>Image address<input type="url" value={url} onChange={event => setUrl(event.target.value)} /></label>
              <label className={styles.fileLabel}>Upload image<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading !== null} onChange={event => uploadImage(event.target.files?.[0], side)} /></label>
              {url ? <button type="button" className={styles.textButton} onClick={() => setUrl('')}>Remove from book</button> : null}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.sectionIntro}><h2>Where to buy</h2><p>Add retailer, distributor or publisher websites. The first website is used when a reader selects the animated book preview; every website appears on the public page.</p></div>
        <div className={styles.linksEditor}>
          {links.map((link, index) => (
            <div className={styles.linkRow} key={index}>
              <label>Retailer *<input value={link.retailerName} onChange={event => updateLink(index, 'retailerName', event.target.value)} placeholder="Amazon" /></label>
              <label>Purchase URL *<input type="url" value={link.url} onChange={event => updateLink(index, 'url', event.target.value)} placeholder="https://…" /></label>
              <label>Format<input value={link.format} onChange={event => updateLink(index, 'format', event.target.value)} placeholder="Paperback" /></label>
              <label>Price label<input value={link.priceLabel} onChange={event => updateLink(index, 'priceLabel', event.target.value)} placeholder="$29.99" /></label>
              <button type="button" className={styles.removeLink} onClick={() => setLinks(current => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
            </div>
          ))}
          <button type="button" className={styles.addLink} onClick={() => setLinks(current => [...current, { retailerName: '', url: '', format: '', priceLabel: '' }])}><span aria-hidden="true">+</span> Add another website</button>
        </div>
      </section>

      <div className={styles.formActions}>
        <button type="submit" disabled={isPending || uploading !== null}>{isPending ? 'Saving…' : book ? 'Save changes' : 'Add book'}</button>
        {book ? <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={isPending}>Delete book</button> : null}
      </div>
    </form>
  );
}
