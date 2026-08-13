import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <mat-card class="w-full max-w-md shadow-2xl">
        <mat-card-content class="p-8">
          <!-- Header -->
          <div class="mb-8 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <mat-icon class="text-white text-2xl">school</mat-icon>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Platform</h1>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Sign in to your account</p>
          </div>

          <!-- Form -->
          <form [formGroup]="form" (ngSubmit)="onLogin()" class="space-y-5">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-3 text-gray-400">email</mat-icon>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="you@example.com"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p *ngIf="form.get('email')?.hasError('required') && form.get('email')?.touched" class="mt-1 text-sm text-red-500">
                Email is required
              </p>
              <p *ngIf="form.get('email')?.hasError('email') && form.get('email')?.touched" class="mt-1 text-sm text-red-500">
                Please enter a valid email
              </p>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-3 text-gray-400">lock</mat-icon>
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  class="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <mat-icon class="text-xl">{{ showPassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
              </div>
              <p *ngIf="form.get('password')?.hasError('required') && form.get('password')?.touched" class="mt-1 text-sm text-red-500">
                Password is required
              </p>
              <p *ngIf="form.get('password')?.hasError('minlength') && form.get('password')?.touched" class="mt-1 text-sm text-red-500">
                Password must be at least 6 characters
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-sm">
              <mat-checkbox formControlName="rememberMe" class="m-0">
                <span class="text-gray-700 dark:text-gray-300">Remember me</span>
              </mat-checkbox>
              <a
                routerLink="/auth/forgot-password"
                class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            <!-- Login Button -->
            <button
              mat-raised-button
              color="primary"
              type="submit"
              class="w-full h-12 text-base font-medium"
              [disabled]="form.invalid || auth.isLoading()"
            >
              <mat-icon *ngIf="auth.isLoading()" class="mr-2 animate-spin">
                hourglass_empty
              </mat-icon>
              {{ auth.isLoading() ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span class="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <!-- Demo Credentials -->
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p class="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-3">Demo Credentials:</p>
            <div class="space-y-2 text-xs text-blue-800 dark:text-blue-400">
              <p><strong>Student:</strong> student&#64;example.com / password123</p>
              <p><strong>Instructor:</strong> instructor&#64;example.com / password123</p>
              <p><strong>Admin:</strong> admin&#64;example.com / password123</p>
            </div>
          </div>

          <!-- Sign Up Link -->
          <p class="text-center text-sm text-gray-700 dark:text-gray-300">
            Don't have an account?
            <a
              routerLink="/auth/register"
              class="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create one
            </a>
          </p>
        </mat-card-content>
      </mat-card>

      <!-- Footer -->
      <div class="absolute bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Angular 19 • Tailwind CSS • Material Design</p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  showPassword = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: (user) => {
        this.notification.success(`Welcome ${user.firstName}!`);
        this.navigateByRole(user.role);
      },
      error: (err) => {
        this.notification.error(err.error?.message || 'Login failed. Please try again.');
      },
    });
  }

  private navigateByRole(role: string): void {
    const routes: Record<string, string> = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    };

    const route = routes[role] || '/dashboard';
    this.router.navigate([route]);
  }
}
