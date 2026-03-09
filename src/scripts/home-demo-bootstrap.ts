import type { DemoConfig } from './demo-shell';

function readConfig(): DemoConfig | null {
  const node = document.getElementById('home-demo-config');
  if (!node) return null;

  try {
    return JSON.parse(node.textContent ?? '') as DemoConfig;
  } catch (error) {
    console.error('[demo-shell] Invalid JSON config.', error);
    return null;
  }
}

export function setupHomeDemo(): void {
  const root = document.querySelector('[data-demo-shell]');
  const config = readConfig();

  if (!(root instanceof HTMLElement) || !config || !('IntersectionObserver' in window)) {
    return;
  }

  let loaded = false;

  const loadDemo = async () => {
    if (loaded) return;
    loaded = true;

    try {
      const module = await import('./demo-shell');
      module.mountDemoShell(root, config);
    } catch (error) {
      console.error('[demo-shell] Failed to load interactive module.', error);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          loadDemo();
        }
      });
    },
    { threshold: 0.2, rootMargin: '120px' },
  );

  observer.observe(root);
}
