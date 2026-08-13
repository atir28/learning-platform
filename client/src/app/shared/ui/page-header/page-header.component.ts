import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
          <p *ngIf="subtitle" class="mt-2 text-gray-600 dark:text-gray-400">{{ subtitle }}</p>
        </div>
        <ng-content select="[actions]"></ng-content>
      </div>
      <ng-content select="[content]"></ng-content>
    </div>
  `,
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
