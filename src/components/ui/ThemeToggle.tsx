/**
 * ThemeToggle — React island that cycles light → dark → system → light.
 *
 * The choice persists in localStorage under `siteConfig.themeStorageKey` and
 * is applied by toggling the `dark` class on <html> (Tailwind `darkMode:
 * 'class'`). The inline script in BaseLayout applies the same value before
 * first paint so there is no flash of the wrong scheme.
 *
 * No window/document access happens during render — only in the state
 * initializer (guarded), event handlers, and effects.
 */
import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { siteConfig, type ThemeMode } from '../../data/site';
import { MoonIcon, MonitorIcon, SunIcon } from './icons';

const THEME_ORDER: readonly ThemeMode[] = ['light', 'dark', 'system'];

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(siteConfig.themeStorageKey);
    if (isThemeMode(stored)) return stored;
  } catch {
    // localStorage unavailable (SSR or privacy mode) — fall back to default.
  }
  return siteConfig.defaultTheme;
}

function resolveDark(mode: ThemeMode): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Apply the mode to the document. Safe to call from effects/handlers only. */
function applyMode(mode: ThemeMode): void {
  const dark = resolveDark(mode);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

const MODE_ICON: Record<ThemeMode, (props: { className?: string }) => ReactElement> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

export default function ThemeToggle(): ReactElement {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode);

  useEffect(() => {
    applyMode(mode);
    try {
      localStorage.setItem(siteConfig.themeStorageKey, mode);
    } catch {
      // Persisting the choice is best-effort; the visual toggle still works.
    }

    // While following the OS, re-apply whenever the OS preference changes.
    if (mode !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (): void => applyMode('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mode]);

  const cycleMode = useCallback(() => {
    setMode((prev) => THEME_ORDER[(THEME_ORDER.indexOf(prev) + 1) % THEME_ORDER.length]);
  }, []);

  const Icon = MODE_ICON[mode];
  const label = `Theme: ${mode}. Activate to switch theme.`;

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={label}
      title={label}
      className="rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
