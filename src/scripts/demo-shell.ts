export type DemoHue = 'red' | 'blue' | 'violet';

export interface DemoScene {
  id: string;
  name: string;
  summary: string;
  path: string;
  chips: string[];
  lineWidths: number[];
  hue: DemoHue;
}

export interface DemoConfig {
  scenes: DemoScene[];
  stateLabel: string;
}

function clampWidth(value: number): number {
  return Math.min(100, Math.max(24, value));
}

function updateScene(root: HTMLElement, scene: DemoScene, stateLabel: string): void {
  const path = root.querySelector<HTMLElement>('[data-demo-path]');
  const name = root.querySelector<HTMLElement>('[data-demo-scene-name]');
  const state = root.querySelector<HTMLElement>('[data-demo-scene-state]');
  const summary = root.querySelector<HTMLElement>('[data-demo-summary]');
  const canvas = root.querySelector<HTMLElement>('.demo-canvas');
  const lineElements = root.querySelectorAll<HTMLElement>('.demo-lines span');
  const chipRow = root.querySelector<HTMLElement>('[data-demo-chip-row]');

  if (path) path.textContent = scene.path;
  if (name) name.textContent = scene.name;
  if (state) state.textContent = stateLabel;
  if (summary) summary.textContent = scene.summary;
  if (canvas) canvas.dataset.demoTone = scene.hue;

  lineElements.forEach((line, index) => {
    const width = scene.lineWidths[index] ?? 42;
    line.style.width = `${clampWidth(width)}%`;
  });

  if (chipRow) {
    chipRow.innerHTML = '';
    for (const chip of scene.chips) {
      const node = document.createElement('span');
      node.textContent = chip;
      chipRow.appendChild(node);
    }
  }
}

export function mountDemoShell(root: Element | null, config: DemoConfig): void {
  if (!(root instanceof HTMLElement)) return;

  const tabs = root.querySelectorAll<HTMLButtonElement>('[data-demo-tab]');
  if (!tabs.length || !config.scenes.length) return;

  const scenes = new Map(config.scenes.map((scene) => [scene.id, scene]));

  const setActive = (id: string) => {
    const scene = scenes.get(id);
    if (!scene) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.demoTab === id;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    updateScene(root, scene, config.stateLabel);
  };

  const firstScene = config.scenes[0];
  setActive(firstScene.id);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.demoTab;
      if (!id) return;
      setActive(id);
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || config.scenes.length < 2) return;

  let index = 0;
  let inViewport = true;
  let intervalId: number | null = null;

  const stopAutoRotate = () => {
    if (intervalId === null) return;
    window.clearInterval(intervalId);
    intervalId = null;
  };

  const startAutoRotate = () => {
    if (intervalId !== null) return;
    intervalId = window.setInterval(() => {
      index = (index + 1) % config.scenes.length;
      setActive(config.scenes[index].id);
    }, 4500);
  };

  const syncAutoRotate = () => {
    if (inViewport && !document.hidden) {
      startAutoRotate();
      return;
    }

    stopAutoRotate();
  };

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inViewport = Boolean(entry?.isIntersecting);
        syncAutoRotate();
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(root);
  }

  document.addEventListener('visibilitychange', syncAutoRotate);
  syncAutoRotate();
}
