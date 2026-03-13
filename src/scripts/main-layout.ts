(() => {
  const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
  const mobileNavToggle = document.querySelector<HTMLButtonElement>('[data-mobile-nav-toggle]');
  const primaryNav = document.querySelector<HTMLElement>('[data-primary-nav]');
  const localeSwitchLinks = document.querySelectorAll<HTMLAnchorElement>('[data-locale-preference]');
  const localePreferenceStorageKey =
    document.documentElement.dataset.localeStorageKey ?? 'findit-locale-preference';

  const dropdowns = document.querySelectorAll('[data-nav-dropdown]');

  const closeMobileMenu = () => {
    if (!siteHeader || !mobileNavToggle) return;
    siteHeader.classList.remove('is-menu-open');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  };

  const openMobileMenu = () => {
    if (!siteHeader || !mobileNavToggle) return;
    siteHeader.classList.add('is-menu-open');
    mobileNavToggle.setAttribute('aria-expanded', 'true');
  };

  const closeAll = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
    if (!(trigger instanceof HTMLButtonElement)) return;

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('is-open');
      closeAll();
      if (!isOpen) {
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (siteHeader && !siteHeader.contains(target)) {
      closeMobileMenu();
    }

    const insideDropdown = [...dropdowns].some((dropdown) => dropdown.contains(target));
    if (!insideDropdown) closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAll();
      closeMobileMenu();
    }
  });

  if (mobileNavToggle && siteHeader) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = siteHeader.classList.contains('is-menu-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (primaryNav) {
      primaryNav.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const link = target.closest('a');
        if (!link) return;
        closeMobileMenu();
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });
  }

  localeSwitchLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const preferredLocale = link.dataset.localePreference;
      if (!preferredLocale) return;

      try {
        localStorage.setItem(localePreferenceStorageKey, preferredLocale);
      } catch {
        // Ignore storage failures and fall back to browser language detection.
      }
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.documentElement.classList.add('js-motion');

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  targets.forEach((node) => observer.observe(node));
})();
