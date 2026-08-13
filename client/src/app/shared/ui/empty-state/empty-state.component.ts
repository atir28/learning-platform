import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12">
      <mat-icon [attr.aria-hidden]="true" class="text-gray-400 mb-4" [style.font-size.px]="64">
        {{ icon }}
      </mat-icon>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 text-center max-w-sm">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() title: string = 'No items found';
  @Input() message: string = 'There are currently no items to display.';
}
