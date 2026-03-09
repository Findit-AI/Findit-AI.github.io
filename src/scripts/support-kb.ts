interface KbEntry {
  id: string;
  title: string;
  summary: string;
  href: string;
  keywords: string[];
}

interface SupportKbConfig {
  entries: KbEntry[];
  suggestedIds: string[];
  emptyMessage: string;
  resultLabel: string;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function mountSupportKb(root: Element | null, config: SupportKbConfig): void {
  if (!(root instanceof HTMLElement)) return;

  const input = root.querySelector<HTMLInputElement>('[data-support-search-input]');
  const cards = root.querySelectorAll<HTMLElement>('[data-kb-card]');
  const resultsList = root.querySelector<HTMLElement>('[data-support-results-list]');
  const emptyState = root.querySelector<HTMLElement>('[data-support-empty]');
  const resultCount = root.querySelector<HTMLElement>('[data-support-result-count]');

  if (!input || !resultsList || !emptyState || !resultCount) return;

  const renderResults = (items: KbEntry[]) => {
    resultsList.innerHTML = items
      .map(
        (entry) =>
          `<li><a class="support-result-link" href="${entry.href}"><strong>${entry.title}</strong><span>${entry.summary}</span></a></li>`,
      )
      .join('');
  };

  const suggested = config.suggestedIds
    .map((id) => config.entries.find((entry) => entry.id === id))
    .filter((entry): entry is KbEntry => Boolean(entry));

  const render = (queryRaw: string) => {
    const query = normalize(queryRaw);
    const hasQuery = query.length > 0;

    const matched = config.entries.filter((entry) => {
      if (!hasQuery) return true;
      const haystack = `${entry.title} ${entry.summary} ${entry.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(query);
    });

    cards.forEach((card) => {
      card.style.display = '';
    });

    if (!hasQuery) {
      resultCount.textContent = '';
      renderResults(suggested);
      emptyState.style.display = 'none';
      return;
    }

    resultCount.textContent = `${matched.length} ${config.resultLabel}`;

    if (matched.length === 0) {
      resultsList.innerHTML = '';
      emptyState.textContent = config.emptyMessage;
      emptyState.style.display = '';
      return;
    }

    emptyState.style.display = 'none';
    renderResults(matched.slice(0, 8));
  };

  input.addEventListener('input', () => render(input.value));
  render('');
}
