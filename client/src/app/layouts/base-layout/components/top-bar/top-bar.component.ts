import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule
  ],
  styles: [`
    /* ── User Menu ── */
    ::ng-deep .user-menu-class {
      min-width: 320px !important;
    }

    ::ng-deep .user-menu-class .mat-mdc-menu-panel {
      background-color: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 14px !important;
      box-shadow: 0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.08) !important;
      overflow: hidden !important;
    }

    :host-context(.dark) ::ng-deep .user-menu-class .mat-mdc-menu-panel,
    .dark ::ng-deep .user-menu-class .mat-mdc-menu-panel {
      background-color: #111827 !important;
      border-color: #1f2937 !important;
    }

    ::ng-deep .user-menu-class .mat-mdc-menu-content {
      padding: 0 !important;
      background-color: inherit !important;
    }

    ::ng-deep .user-menu-class .mat-mdc-menu-item {
      min-height: 40px;
      line-height: 40px;
      background-color: transparent !important;
    }

    /* ── Notifications Menu ── */
    ::ng-deep .notifications-menu-class {
      min-width: 340px !important;
    }

    ::ng-deep .notifications-menu-class .mat-mdc-menu-panel {
      background-color: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 14px !important;
      box-shadow: 0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.08) !important;
      overflow: hidden !important;
    }

    .dark ::ng-deep .notifications-menu-class .mat-mdc-menu-panel {
      background-color: #111827 !important;
      border-color: #1f2937 !important;
    }

    ::ng-deep .notifications-menu-class .mat-mdc-menu-content {
      padding: 0 !important;
      background-color: inherit !important;
    }

    ::ng-deep .notifications-menu-class .mat-mdc-menu-item {
      min-height: unset;
      background-color: transparent !important;
    }

    /* ── Tooltip ── */
    ::ng-deep .mat-tooltip {
      font-size: 12px !important;
      padding: 6px 10px !important;
    }

    /* ── Badge overflow fix ── */
    button[mat-icon-button].relative {
      overflow: visible !important;
    }
  `],
  template: `
    <mat-toolbar
      color="primary"
      class="shadow-md sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-950 border-b border-white/10"
    >
      <!-- Left Section: Logo & Branding -->
      <div class="flex items-center gap-3">
        <!-- Sidebar Toggle -->
        <button
          mat-icon-button
          (click)="onToggleSidebar()"
          matTooltip="Toggle sidebar"
          matTooltipPosition="below"
          class="hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 rounded-xl"
        >
          <mat-icon class="text-xl text-white">menu</mat-icon>
        </button>

        <!-- Branding -->
        <div class="hidden sm:flex items-center gap-2 group cursor-pointer">
          <div class="w-9 h-9 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/25 transition-all duration-300">
            <mat-icon class="text-white text-lg transition-transform duration-300 group-hover:rotate-12">school</mat-icon>
          </div>
          <div>
            <h1 class="text-sm font-extrabold text-white leading-tight tracking-wide">LearnHub</h1>
            <p class="text-[10px] text-white/70 font-semibold tracking-wider uppercase">Pro Edition</p>
          </div>
        </div>
      </div>

      <!-- Right Section: Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          mat-icon-button
          (click)="onToggleTheme()"
          matTooltip="Toggle theme"
          matTooltipPosition="below"
          class="hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 rounded-xl h-10 w-10"
        >
          <mat-icon class="text-xl text-white transition-transform duration-300 hover:rotate-45">{{ theme.isDark ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>

        <!-- Notifications -->
        <button
          mat-icon-button
          [matMenuTriggerFor]="notificationsMenu"
          matTooltip="Notifications"
          matTooltipPosition="below"
          class="hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 rounded-xl relative group flex items-center justify-center h-10 w-10"
        >
          <div class="relative flex items-center justify-center">
            <mat-icon class="text-xl text-white transition-transform duration-200 group-hover:scale-105">notifications</mat-icon>
            <!-- Custom Badge -->
            <span class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-indigo-600 dark:ring-indigo-950 shadow-md transform scale-100 group-hover:scale-110 transition-all duration-200">
              3
            </span>
          </div>
        </button>

        <!-- User Menu -->
        <button
          [matMenuTriggerFor]="userMenu"
          matTooltip="My account"
          matTooltipPosition="below"
          class="hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 rounded-xl ml-1 p-1 flex items-center justify-center border-0 bg-transparent cursor-pointer group h-10 w-10"
        >
          <ng-container *ngIf="user$ | async as user; else guestAvatar">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-md border border-white/20 group-hover:scale-105 transition-transform duration-200">
              {{ getInitials(user) }}
            </div>
          </ng-container>
          <ng-template #guestAvatar>
            <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shadow-md">
              <mat-icon class="text-lg">person</mat-icon>
            </div>
          </ng-template>
        </button>
      </div>

      <!-- Notifications Menu -->
      <mat-menu #notificationsMenu="matMenu" panelClass="notifications-menu-class">
        <div class="px-4 py-3 font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">
          Notifications
        </div>
        <button mat-menu-item class="h-auto py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-850">
          <div class="flex gap-3 w-full">
            <mat-icon class="text-blue-500 text-lg flex-shrink-0">info</mat-icon>
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900 dark:text-white">New Class Added</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Angular Advanced Patterns class scheduled</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
        </button>
        <button mat-menu-item class="h-auto py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-850 border-t border-gray-100 dark:border-gray-850">
          <div class="flex gap-3 w-full">
            <mat-icon class="text-green-500 text-lg flex-shrink-0">check_circle</mat-icon>
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Assignment Submitted</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Your project submission was successful</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </button>
        <button mat-menu-item class="h-auto py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-850 border-t border-gray-100 dark:border-gray-850">
          <div class="flex gap-3 w-full">
            <mat-icon class="text-orange-500 text-lg flex-shrink-0">warning</mat-icon>
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Low Attendance Alert</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Your attendance is below 80%</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item class="text-center text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-850">
          <span class="text-sm font-medium">View All Notifications</span>
        </button>
      </mat-menu>

      <!-- User Menu Dropdown -->
      <mat-menu #userMenu="matMenu" panelClass="user-menu-class">
        <!-- Header Section -->
        <div class="px-4 py-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/40 dark:to-gray-800/80 border-b border-gray-100 dark:border-gray-700/50">
          <div class="flex items-center gap-3" *ngIf="user$ | async as user">
            <!-- Avatar -->
            <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md text-white font-extrabold text-base">
              {{ getInitials(user) }}
            </div>
            <!-- User Info -->
            <div class="flex-1">
              <p class="text-sm font-bold text-gray-900 dark:text-white leading-snug">{{ user.firstName }} {{ user.lastName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium truncate max-w-44">{{ user.email }}</p>
              <div class="flex items-center gap-1.5 mt-2">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span class="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wide bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded">{{ user.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="px-4 py-3 grid grid-cols-3 gap-2 border-b border-gray-100 dark:border-gray-750">
          <div class="text-center">
            <p class="text-lg font-extrabold text-gray-900 dark:text-white">5</p>
            <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Courses</p>
          </div>
          <div class="text-center border-l border-r border-gray-100 dark:border-gray-750">
            <p class="text-lg font-extrabold text-gray-900 dark:text-white">92%</p>
            <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attend.</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-extrabold text-gray-900 dark:text-white">3</p>
            <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Upcoming</p>
          </div>
        </div>

        <!-- Menu Items Section -->
        <div class="py-1">
          <p class="px-4 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Account</p>
          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">person</mat-icon>
            <span class="text-sm font-medium">My Profile</span>
          </button>

          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">edit</mat-icon>
            <span class="text-sm font-medium">Edit Profile</span>
          </button>
        </div>

        <div class="py-1 border-t border-gray-100 dark:border-gray-800">
          <p class="px-4 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Preferences</p>
          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">settings</mat-icon>
            <span class="text-sm font-medium">Settings</span>
          </button>

          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">lock</mat-icon>
            <span class="text-sm font-medium">Security & Privacy</span>
          </button>

          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">notifications</mat-icon>
            <span class="text-sm font-medium">Notifications</span>
          </button>
        </div>

        <div class="py-1 border-t border-gray-100 dark:border-gray-800">
          <p class="px-4 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Support</p>
          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">help</mat-icon>
            <span class="text-sm font-medium">Help & Support</span>
          </button>

          <button
            mat-menu-item
            class="h-10 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <mat-icon class="text-gray-400 dark:text-gray-500 mr-3 text-lg">info</mat-icon>
            <span class="text-sm font-medium">About</span>
          </button>
        </div>

        <!-- Logout Section -->
        <div class="py-1 border-t border-gray-100 dark:border-gray-800">
          <button
            mat-menu-item
            (click)="onLogout()"
            class="h-10 px-4 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors text-red-600 dark:text-red-400 font-semibold w-full"
          >
            <mat-icon class="text-red-600 dark:text-red-400 mr-3 text-lg">logout</mat-icon>
            <span class="text-sm">Logout</span>
          </button>
        </div>
      </mat-menu>
    </mat-toolbar>
  `,
})
export class TopBarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  user$ = this.auth.auth$;

  constructor(protected theme: ThemeService, private auth: AuthService) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onToggleTheme(): void {
    this.theme.toggleTheme();
  }

  onLogout(): void {
    this.auth.logout();
  }

  getInitials(user: any): string {
    if (!user) return '??';
    const first = user.firstName ? user.firstName.charAt(0) : '';
    const last = user.lastName ? user.lastName.charAt(0) : '';
    return (first + last).toUpperCase() || 'U';
  }
}
