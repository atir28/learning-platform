import { Injectable, effect, signal, inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private overlayContainer = inject(OverlayContainer);
  private themeModeSignal = signal<ThemeMode>('system');
  private systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  themeMode = this.themeModeSignal.asReadonly();

  get isDark(): boolean {
    const mode = this.themeModeSignal();
    if (mode === 'system') {
      return this.systemPrefersDark;
    }
    return mode === 'dark';
  }

  constructor() {
    this.loadTheme();
    this.setupThemeEffect();
    this.watchSystemPreference();
  }

  setTheme(mode: ThemeMode): void {
    this.themeModeSignal.set(mode);
    localStorage.setItem('theme-mode', mode);
  }

  toggleTheme(): void {
    const current = this.themeModeSignal();
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme(this.systemPrefersDark ? 'light' : 'dark');
    }
  }

  private setupThemeEffect(): void {
    effect(() => {
      const isDark = this.isDark;
      const root = document.documentElement;
      const overlayEl = this.overlayContainer.getContainerElement();

      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        overlayEl.classList.add('dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        overlayEl.classList.remove('dark');
      }
    });
  }

  private watchSystemPreference(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.systemPrefersDark = e.matches;
      if (this.themeModeSignal() === 'system') {
        this.setupThemeEffect();
      }
    });
  }

  private loadTheme(): void {
    const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored) {
      this.themeModeSignal.set(stored);
    }
  }
}

