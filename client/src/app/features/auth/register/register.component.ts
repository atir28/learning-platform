import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
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
                <mat-icon class="text-white text-2xl">school</mat-icon>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Join our learning community</p>
          </div>

          <!-- Coming Soon -->
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
            <div class="flex items-start">
              <mat-icon class="text-yellow-600 dark:text-yellow-400 mr-3 mt-1">info</mat-icon>
              <div>
                <h3 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Coming Soon</h3>
                <p class="text-sm text-yellow-800 dark:text-yellow-400">
                  Registration is currently under development. Please check back soon or contact support for early access.
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
            Back to Login
          </button>

          <!-- Alternative -->
          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?
            <a
              routerLink="/auth/login"
              class="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign in
            </a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class RegisterComponent {}
