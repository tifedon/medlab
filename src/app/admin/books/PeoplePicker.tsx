'use client';

import { useState } from 'react';
import type { TeamMember } from '@/lib/people';
import styles from './page.module.css';

interface Props {
  label: string;
  hint: string;
  teamMembers: TeamMember[];
  value: string[];          // currently selected names
  onChange: (names: string[]) => void;
}

export default function PeoplePicker({ label, hint, teamMembers, value, onChange }: Props) {
  const [customInput, setCustomInput] = useState('');

  // Names that are selected but NOT in the team roster (custom names)
  const rosterNames = new Set(teamMembers.map(m => m.name));
  const customNames = value.filter(n => !rosterNames.has(n));

  function toggleMember(name: string) {
    onChange(value.includes(name) ? value.filter(n => n !== name) : [...value, name]);
  }

  function addCustomName() {
    const trimmed = customInput.trim();
    if (!trimmed || value.includes(trimmed)) {
      setCustomInput('');
      return;
    }
    onChange([...value, trimmed]);
    setCustomInput('');
  }

  function removeCustom(name: string) {
    onChange(value.filter(n => n !== name));
  }

  return (
    <div className={styles.peoplePicker}>
      <div className={styles.peoplePickerHeader}>
        <span className={styles.peoplePickerLabel}>{label}</span>
        <span className={styles.peoplePickerHint}>{hint}</span>
      </div>

      {/* Team roster checkboxes */}
      <div className={styles.rosterGrid}>
        {teamMembers.map(member => {
          const checked = value.includes(member.name);
          return (
            <label key={member.slug} className={`${styles.rosterItem} ${checked ? styles.rosterItemChecked : ''}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleMember(member.name)}
                className={styles.rosterCheckbox}
              />
              <span className={styles.rosterName}>{member.name}</span>
              <span className={styles.rosterTitle}>{member.title}</span>
            </label>
          );
        })}
      </div>

      {/* Custom names already added */}
      {customNames.length > 0 && (
        <ul className={styles.customNameList}>
          {customNames.map(name => (
            <li key={name} className={styles.customNameItem}>
              <span>{name}</span>
              <button type="button" className={styles.removeCustom} onClick={() => removeCustom(name)} aria-label={`Remove ${name}`}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add a name not in the roster */}
      <div className={styles.customNameRow}>
        <input
          type="text"
          className={styles.customNameInput}
          placeholder="Add a name not listed above…"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomName(); } }}
        />
        <button type="button" className={styles.addCustomBtn} onClick={addCustomName} disabled={!customInput.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}
