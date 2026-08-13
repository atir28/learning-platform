import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button mat-raised-button color="primary" routerLink="/">
          Go to Home
        </button>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
