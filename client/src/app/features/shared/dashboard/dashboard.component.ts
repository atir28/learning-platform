import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Redirecting to dashboard...</h1>
        <p class="text-gray-600 dark:text-gray-400">Please wait while we load your dashboard.</p>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) {
    effect(() => {
      const user = this.auth.user();
      if (user) {
        const dashboardRoute = `/${user.role}/dashboard`;
        this.router.navigate([dashboardRoute]);
      }
    });
  }
}
