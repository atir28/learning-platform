import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8">
      <mat-spinner [diameter]="diameter"></mat-spinner>
      <p *ngIf="message" class="mt-4 text-gray-600 dark:text-gray-400">{{ message }}</p>
    </div>
  `,
})
export class LoadingComponent {
  @Input() message: string = 'Loading...';
  @Input() diameter: number = 50;
}
