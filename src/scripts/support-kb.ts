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
  const submitButton = root.querySelector<HTMLButtonElement>('[data-support-search-submit]');
  const searchArea = root.querySelector<HTMLElement>('[data-support-search-area]');
  const optionsPanel = root.querySelector<HTMLElement>('[data-support-search-options]');
  const optionsList = root.querySelector<HTMLElement>('[data-support-search-options-list]');
  const cards = root.querySelectorAll<HTMLElement>('[data-kb-card]');
  const resultsList = root.querySelector<HTMLElement>('[data-support-results-list]');
  const emptyState = root.querySelector<HTMLElement>('[data-support-empty]');
  const resultCount = root.querySelector<HTMLElement>('[data-support-result-count]');

  if (
    !input ||
    !resultsList ||
    !emptyState ||
    !resultCount ||
    !submitButton ||
    !searchArea ||
    !optionsPanel ||
    !optionsList
  )
    return;

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

  const findMatches = (queryRaw: string): { query: string; matched: KbEntry[] } => {
    const query = normalize(queryRaw);
    const hasQuery = query.length > 0;

    const matched = config.entries.filter((entry) => {
      if (!hasQuery) return true;
      const haystack = `${entry.title} ${entry.summary} ${entry.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(query);
    });

    return { query, matched };
  };

  const renderOptions = (items: KbEntry[], query: string) => {
    const hasQuery = query.length > 0;
    const options = hasQuery ? items.slice(0, 6) : suggested.slice(0, 6);

    if (options.length === 0) {
      optionsList.innerHTML = '';
      optionsPanel.hidden = true;
      return;
    }

    optionsList.innerHTML = options
      .map(
        (entry) =>
          `<li><button type="button" class="support-search-option" data-support-search-option data-href="${entry.href}"><strong>${entry.title}</strong><span>${entry.summary}</span></button></li>`,
      )
      .join('');
    optionsPanel.hidden = false;
  };

  const render = (queryRaw: string, showOptions = false) => {
    const { query, matched } = findMatches(queryRaw);
    const hasQuery = query.length > 0;

    cards.forEach((card) => {
      card.style.display = '';
    });

    if (!hasQuery) {
      resultCount.textContent = '';
      renderResults(suggested);
      emptyState.style.display = 'none';
      if (showOptions) {
        renderOptions(matched, query);
      } else {
        optionsPanel.hidden = true;
      }
      return;
    }

    resultCount.textContent = `${matched.length} ${config.resultLabel}`;

    if (matched.length === 0) {
      resultsList.innerHTML = '';
      emptyState.textContent = config.emptyMessage;
      emptyState.style.display = '';
      if (showOptions) {
        renderOptions(matched, query);
      } else {
        optionsPanel.hidden = true;
      }
      return;
    }

    emptyState.style.display = 'none';
    renderResults(matched.slice(0, 8));
    if (showOptions) {
      renderOptions(matched, query);
    } else {
      optionsPanel.hidden = true;
    }
  };

  input.addEventListener('input', () => render(input.value, true));
  input.addEventListener('focus', () => render(input.value, true));
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const { query, matched } = findMatches(input.value);
    if (query.length === 0) {
      render('', true);
      return;
    }
    if (matched.length === 0) return;

    event.preventDefault();
    window.location.href = matched[0].href;
  });

  optionsList.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    const button = target instanceof HTMLElement ? target.closest<HTMLElement>('[data-support-search-option]') : null;
    if (!button) return;

    const href = button.getAttribute('data-href');
    if (!href) return;
    window.location.href = href;
  });

  submitButton.addEventListener('click', () => {
    const { query, matched } = findMatches(input.value);
    render(input.value, true);
    if (query.length === 0) return;
    if (matched.length > 0) {
      window.location.href = matched[0].href;
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    const insideSearch = searchArea.contains(target);
    if (!insideSearch) {
      optionsPanel.hidden = true;
    }
  });

  searchArea.addEventListener('mouseleave', () => {
    optionsPanel.hidden = true;
  });

  document.addEventListener('pointermove', (event) => {
    if (optionsPanel.hidden) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (searchArea.contains(target)) return;
    optionsPanel.hidden = true;
  });

  render('');
}
