/** Formats YYYY, YYYY-MM or YYYY-MM-DD without inventing missing precision. */
export function formatDate(value?: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  if (!month) return String(year);
  const date = new Date(Date.UTC(year, month - 1, day || 1));
  return date.toLocaleDateString('en-GB', { timeZone: 'UTC', month: 'long', year: 'numeric', ...(day ? { day: 'numeric' } : {}) });
}

export function plural(count: number, one: string, many = `${one}s`) {
  return `${count} ${count === 1 ? one : many}`;
}
