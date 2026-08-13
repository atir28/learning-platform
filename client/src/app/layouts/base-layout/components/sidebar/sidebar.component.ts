import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { NavItem } from '../../base-layout.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  template: `
    <div class="h-full flex flex-col bg-white dark:bg-gray-900">
      <!-- Logo/Header -->
      <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <mat-icon class="text-white text-xl">school</mat-icon>
          </div>
          <div>
            <h1 class="font-extrabold text-gray-900 dark:text-white text-base tracking-wide">LearnHub</h1>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Pro Learning</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto px-4 py-6">
        <div class="space-y-1.5">
          <ng-container *ngFor="let item of navItems">
            <!-- Simple Menu Item -->
            <button
              *ngIf="!item.children"
              [routerLink]="item.route"
              routerLinkActive="active"
              (click)="navigate.emit()"
              class="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-all duration-200 text-sm font-semibold border-0 bg-transparent cursor-pointer group"
            >
              <mat-icon class="text-xl flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{{ item.icon }}</mat-icon>
              <span class="flex-1 text-left tracking-wide">{{ item.label }}</span>
            </button>

            <!-- Expandable Menu Item -->
            <mat-expansion-panel
              *ngIf="item.children"
              class="mb-1.5 shadow-none border-0 bg-transparent"
              hideToggle="false"
            >
              <mat-expansion-panel-header class="h-auto px-0 hover:bg-slate-50 dark:hover:bg-gray-800/60 rounded-xl transition-colors group">
                <div class="flex items-center gap-3.5 py-3 px-4 w-full">
                  <mat-icon class="text-xl flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{{ item.icon }}</mat-icon>
                  <span class="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white flex-1 text-left tracking-wide">{{ item.label }}</span>
                </div>
              </mat-expansion-panel-header>

              <div class="p-0 bg-slate-50/50 dark:bg-gray-805/20 rounded-xl mt-1.5 py-1 pl-4 space-y-1 border-l-2 border-slate-100 dark:border-gray-800">
                <button
                  *ngFor="let child of item.children"
                  [routerLink]="child.route"
                  routerLinkActive="active-child"
                  (click)="navigate.emit()"
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-105/50 dark:hover:bg-gray-800/40 transition-colors text-xs font-semibold border-0 bg-transparent cursor-pointer rounded-lg group"
                >
                  <span class="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></span>
                  <span class="tracking-wide">{{ child.label }}</span>
                </button>
              </div>
            </mat-expansion-panel>
          </ng-container>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="border-t border-gray-100 dark:border-gray-800 p-5">
        <div class="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-gray-800/40 dark:to-gray-800/20 border border-slate-100 dark:border-gray-800 rounded-xl p-3.5 text-center">
          <p class="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">LearnHub Pro</p>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">Version 1.0.0</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      button[routerLinkActive="active"] {
        @apply bg-blue-50/70 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold shadow-sm;
      }

      button[routerLinkActive="active"] mat-icon {
        @apply text-blue-600 dark:text-blue-400;
      }

      button[routerLinkActive="active-child"] {
        @apply bg-blue-50/50 dark:bg-blue-950/15 text-blue-600 dark:text-blue-400 font-bold;
      }

      button[routerLinkActive="active-child"] span.w-1.5 {
        @apply bg-blue-500 dark:bg-blue-400;
      }

      ::ng-deep .mat-expansion-panel {
        background: transparent !important;
      }

      ::ng-deep .mat-expansion-panel-body {
        padding: 0 !important;
      }

      ::ng-deep .mat-expansion-indicator::after {
        color: rgb(156 163 175) !important;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() navItems: NavItem[] = [];
  @Output() navigate = new EventEmitter<void>();
}
