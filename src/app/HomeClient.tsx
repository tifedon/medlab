'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/Icons';
import styles from './page.module.css';

const searchTabs = ['All', 'Research', 'Publications', 'Books', 'People'];

export default function HomeClient() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const type = activeTab === 'All' ? '' : `&type=${activeTab.toLowerCase()}`;
      router.push(`/search?q=${encodeURIComponent(query.trim())}${type}`);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchTabs}>
        {searchTabs.map(tab => (
          <button
            key={tab}
            className={`${styles.searchTab} ${activeTab === tab ? styles.searchTabActive : ''}`}
            type="button"
            aria-pressed={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            id={`search-tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <SearchIcon size={22} className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search research, publications, books, people, DOIs or ISBNs…"
          aria-label="Search Sterling IMRES"
          className={styles.searchInput}
          id="home-search-input"
        />
        <button type="submit" className={styles.searchBtn} id="home-search-submit">
          Search
        </button>
      </form>
      <div className={styles.searchHints}>
        <span className={styles.searchHintLabel}>Try:</span>
        {['systematic review', 'periodontitis', 'natural products', 'peer review'].map(hint => (
          <button key={hint} type="button" className={styles.searchHint} onClick={() => setQuery(hint)}>{hint}</button>
        ))}
      </div>
    </div>
  );
}
