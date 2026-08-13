import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      [ngClass]="statusClasses"
    >
      {{ label }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input() status: BadgeStatus = 'default';
  @Input() label: string = '';

  get statusClasses(): Record<string, boolean> {
    return {
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
        this.status === 'success',
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': this.status === 'error',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
        this.status === 'warning',
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': this.status === 'info',
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200':
        this.status === 'default',
    };
  }
}
