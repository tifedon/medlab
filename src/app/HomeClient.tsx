'use client';
import React, { useDeferredValue, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/Icons';
import styles from './page.module.css';

const searchTabs = ['All', 'Research', 'Publications', 'Books', 'People'] as const;
type SearchTab = (typeof searchTabs)[number];
export type HomeSearchKind = Exclude<SearchTab, 'All'>;

export interface HomeSearchSuggestion {
  id: string;
  title: string;
  description: string;
  kind: HomeSearchKind;
  href: string;
  searchText: string;
}

const normalize = (value: string) => value.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

function rankSuggestion(item: HomeSearchSuggestion, rawQuery: string) {
  const query = normalize(rawQuery.trim());
  if (!query) return 0;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const searchText = normalize(item.searchText);
  const tokens = query.split(/\s+/).filter(Boolean);
  if (!tokens.every(token => searchText.includes(token))) return 0;

  let score = tokens.length * 5;
  if (title === query) score += 120;
  else if (title.startsWith(query)) score += 90;
  else if (title.includes(query)) score += 65;
  if (description.startsWith(query)) score += 35;
  else if (description.includes(query)) score += 20;
  if (searchText.includes(query)) score += 25;
  return score;
}

export default function HomeClient({ suggestions }: { suggestions: HomeSearchSuggestion[] }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('All');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const matches = useMemo(() => {
    const trimmed = deferredQuery.trim();
    if (!trimmed) return [];

    return suggestions
      .filter(item => activeTab === 'All' || item.kind === activeTab)
      .map(item => ({ item, score: rankSuggestion(item, trimmed) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 6)
      .map(result => result.item);
  }, [activeTab, deferredQuery, suggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const type = activeTab === 'All' ? '' : `&type=${activeTab.toLowerCase()}`;
      router.push(`/search?q=${encodeURIComponent(query.trim())}${type}`);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestionsOpen || matches.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestion(current => (current + 1) % matches.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion(current => (current <= 0 ? matches.length - 1 : current - 1));
    } else if (event.key === 'Enter' && activeSuggestion >= 0) {
      event.preventDefault();
      setSuggestionsOpen(false);
      router.push(matches[activeSuggestion].href);
    } else if (event.key === 'Escape') {
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  const showSuggestions = suggestionsOpen && query.trim().length > 0;

  return (
    <div
      className={styles.searchWrapper}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setSuggestionsOpen(false);
          setActiveSuggestion(-1);
        }
      }}
    >
      <div className={styles.searchTabs}>
        {searchTabs.map(tab => (
          <button
            key={tab}
            className={`${styles.searchTab} ${activeTab === tab ? styles.searchTabActive : ''}`}
            type="button"
            aria-pressed={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveSuggestion(-1);
              setSuggestionsOpen(Boolean(query.trim()));
              inputRef.current?.focus();
            }}
            id={`search-tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.searchControl}>
        <form onSubmit={handleSearch} className={styles.searchForm} role="search">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setSuggestionsOpen(true);
              setActiveSuggestion(-1);
            }}
            onFocus={() => setSuggestionsOpen(true)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search research, publications, books, people, DOIs or ISBNs…"
            role="combobox"
            aria-label="Search Sterling IMRES"
            aria-autocomplete="list"
            aria-controls="home-search-suggestions"
            aria-expanded={showSuggestions}
            aria-activedescendant={activeSuggestion >= 0 ? `home-suggestion-${matches[activeSuggestion]?.id}` : undefined}
            className={styles.searchInput}
            id="home-search-input"
          />
          <button type="submit" className={styles.searchBtn} id="home-search-submit" aria-label="Search">
            <SearchIcon size={21} />
          </button>
        </form>

        {showSuggestions ? (
          <div className={styles.suggestionPanel} id="home-search-suggestions" role="listbox" aria-label="Search suggestions">
            {matches.length > 0 ? (
              <ul className={styles.suggestionList}>
                {matches.map((item, index) => (
                  <li
                    key={item.id}
                    id={`home-suggestion-${item.id}`}
                    role="option"
                    aria-selected={activeSuggestion === index}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.suggestionLink} ${activeSuggestion === index ? styles.suggestionLinkActive : ''}`}
                      onMouseEnter={() => setActiveSuggestion(index)}
                      onClick={() => setSuggestionsOpen(false)}
                    >
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>
                      <span className={styles.suggestionType}>{item.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.suggestionEmpty}>No close match yet. Press Enter or the search icon for a full search.</p>
            )}
          </div>
        ) : null}
      </div>
      <div className={styles.searchHints}>
        <span className={styles.searchHintLabel}>Try:</span>
        {['systematic review', 'periodontitis', 'natural products', 'peer review'].map(hint => (
          <button
            key={hint}
            type="button"
            className={styles.searchHint}
            onClick={() => {
              setQuery(hint);
              setActiveSuggestion(-1);
              setSuggestionsOpen(true);
              inputRef.current?.focus();
            }}
          >
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
}
