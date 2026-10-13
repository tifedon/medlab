'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { BookPurchaseLink } from '@/lib/books';
import styles from './LockedBookPreview.module.css';

interface LockedBookPreviewProps {
  title: string;
  frontCover: string;
  backCover: string;
  purchaseLinks: BookPurchaseLink[];
}

function Cover({
  side,
  src,
  title,
  purchaseLink,
}: {
  side: 'front' | 'back';
  src: string;
  title: string;
  purchaseLink?: BookPurchaseLink;
}) {
  const image = (
    <Image
      src={src}
      alt={`${title} ${side} cover`}
      width={510}
      height={660}
      sizes="(max-width: 640px) 36vw, 230px"
      className={styles.coverImage}
    />
  );

  if (!purchaseLink) return <div className={styles.cover}>{image}</div>;

  return (
    <a
      className={styles.cover}
      href={purchaseLink.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buy ${title} from ${purchaseLink.retailerName}`}
    >
      {image}
    </a>
  );
}

export default function LockedBookPreview({ title, frontCover, backCover, purchaseLinks }: LockedBookPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const previewId = useId();
  const primaryPurchaseLink = purchaseLinks[0];

  return (
    <div className={styles.preview}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={previewId}
        onClick={() => setIsOpen(open => !open)}
      >
        {isOpen ? 'Close book preview' : 'Preview the book'}
      </button>

      {isOpen ? (
        <div id={previewId} className={styles.reveal}>
          <div className={styles.stage}>
            <div className={styles.front}>
              <Cover side="front" src={frontCover} title={title} purchaseLink={primaryPurchaseLink} />
            </div>

            <div className={styles.lockColumn} role="img" aria-label="Book contents locked until purchase">
              <div className={styles.lock} aria-hidden="true">
                <span className={styles.shackle} />
                <span className={styles.lockBody}><span className={styles.keyhole} /></span>
              </div>
              <strong>Preview locked</strong>
              <span>Purchase to access the complete book</span>
            </div>

            <div className={styles.back}>
              <Cover side="back" src={backCover} title={title} purchaseLink={primaryPurchaseLink} />
            </div>
          </div>

          {!primaryPurchaseLink ? (
            <p className={styles.note}>Purchase links for this title will be added when they become available.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
