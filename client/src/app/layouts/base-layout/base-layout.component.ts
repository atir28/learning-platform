import { Component, Input, ViewChild, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeService } from '../../core/services/theme.service';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    TopBarComponent,
    SidebarComponent,
  ],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <!-- Top Bar - Full Width -->
      <app-top-bar (toggleSidebar)="toggleSidebar()"></app-top-bar>

      <!-- Sidenav Container with Content -->
      <mat-sidenav-container class="flex-1 overflow-hidden">
        <!-- Sidebar -->
        <mat-sidenav
          #sidenav
          [opened]="sidebarOpen()"
          [mode]="sidebarMode()"
          class="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800"
          [fixedInViewport]="false"
          (openedChange)="onSidebarChange($event)"
        >
          <app-sidebar [navItems]="navItems" (navigate)="onNavigate()"></app-sidebar>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content class="overflow-auto">
          <main class="h-full bg-gray-50 dark:bg-gray-900">
            <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
              <router-outlet></router-outlet>
            </div>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      mat-sidenav-container {
        height: 100%;
      }

      mat-sidenav-content {
        height: 100%;
      }

      mat-sidenav {
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class BaseLayoutComponent {
  @Input() navItems: NavItem[] = [];
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Responsive signals
  private screenWidthSignal = signal(window.innerWidth);
  isLargeScreen = signal(window.innerWidth >= 768);
  sidebarOpen = signal(window.innerWidth >= 768);
  sidebarMode = signal<'side' | 'over'>(window.innerWidth >= 768 ? 'side' : 'over');

  constructor(protected theme: ThemeService) {
    // Handle window resize
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      this.screenWidthSignal.set(newWidth);
      this.updateResponsiveState(newWidth);
    });

    // Setup responsive effect
    effect(() => {
      const width = this.screenWidthSignal();
      this.updateResponsiveState(width);
    });
  }

  private updateResponsiveState(width: number): void {
    const isLarge = width >= 768;
    this.isLargeScreen.set(isLarge);

    if (isLarge) {
      // Large screen: sidebar always visible, side mode
      this.sidebarMode.set('side');
      this.sidebarOpen.set(true);
    } else {
      // Small screen: sidebar hidden by default, over mode
      this.sidebarMode.set('over');
      this.sidebarOpen.set(false);
    }
  }

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

  onSidebarChange(isOpen: boolean): void {
    this.sidebarOpen.set(isOpen);
  }

  onNavigate(): void {
    // Close sidebar on small screens after navigation
    if (!this.isLargeScreen()) {
      this.sidenav.close();
    }
  }
}
