import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <mat-card class="w-full max-w-md shadow-2xl">
        <mat-card-content class="p-8">
          <!-- Header -->
          <div class="mb-8 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <mat-icon class="text-white text-2xl">lock_reset</mat-icon>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Recover access to your account</p>
          </div>

          <!-- Coming Soon -->
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <div class="flex items-start">
              <mat-icon class="text-blue-600 dark:text-blue-400 mr-3 mt-1">schedule</mat-icon>
              <div>
                <h3 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Coming Soon</h3>
                <p class="text-sm text-blue-800 dark:text-blue-400">
                  Password reset feature is currently under development. For account recovery, please contact support.
                </p>
              </div>
            </div>
          </div>

          <!-- Back to Login -->
          <button
            mat-raised-button
            color="primary"
            routerLink="/auth/login"
            class="w-full h-12 text-base font-medium"
          >
            <mat-icon class="mr-2">arrow_back</mat-icon>
            Back to Login
          </button>

          <!-- Support -->
          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Need help?
            <a
              href="mailto:support@example.com"
              class="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact support
            </a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ForgotPasswordComponent {}
