import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="
        rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        shadow-sm hover:shadow-md transition-shadow
        p-6
      "
      [ngClass]="{ 'cursor-pointer': clickable }"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() clickable = false;
}
