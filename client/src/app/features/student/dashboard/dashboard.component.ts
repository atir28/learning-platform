import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    PageHeaderComponent,
  ],
  template: `
    <app-page-header
      title="Dashboard"
      subtitle="Welcome back, John! Here's your learning overview."
    >
      <div actions>
        <button mat-raised-button color="primary" routerLink="/student/courses">
          <mat-icon>library_add</mat-icon>
          Explore Courses
        </button>
      </div>
    </app-page-header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Enrolled Courses -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <mat-icon class="text-blue-600 dark:text-blue-400">school</mat-icon>
          </div>
          <span class="text-2xl text-green-500 font-semibold">↑ 1</span>
        </div>
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Enrolled Courses</h3>
        <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">5</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">3 active this semester</p>
      </div>

      <!-- Upcoming Classes -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <mat-icon class="text-purple-600 dark:text-purple-400">videocam</mat-icon>
          </div>
          <span class="text-2xl text-orange-500 font-semibold">→ 3</span>
        </div>
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Upcoming Classes</h3>
        <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">3</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">This week</p>
      </div>

      <!-- Attendance Rate -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <mat-icon class="text-green-600 dark:text-green-400">check_circle</mat-icon>
          </div>
          <span class="text-2xl text-green-500 font-semibold">+2%</span>
        </div>
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Attendance Rate</h3>
        <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">92%</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Excellent attendance</p>
      </div>

      <!-- New Materials -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <mat-icon class="text-red-600 dark:text-red-400">description</mat-icon>
          </div>
          <span class="text-2xl text-blue-500 font-semibold">+7</span>
        </div>
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">New Materials</h3>
        <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">7</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Waiting to review</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Upcoming Classes Section -->
      <div class="lg:col-span-2">
        <mat-card class="shadow-sm">
          <mat-card-header class="border-b border-gray-200 dark:border-gray-700 p-6">
            <mat-card-title class="text-xl font-bold m-0">Upcoming Classes</mat-card-title>
          </mat-card-header>
          <mat-list class="p-0">
            <mat-list-item class="h-auto border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-6 py-4">
              <div class="w-full">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">Angular Advanced Patterns</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">With Jane Instructor</p>
                  </div>
                  <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">Today 3:00 PM</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-500">📍 Google Meet</p>
              </div>
            </mat-list-item>

            <mat-list-item class="h-auto border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-6 py-4">
              <div class="w-full">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">TypeScript Fundamentals</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">With John Teacher</p>
                  </div>
                  <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">Tomorrow 10:00 AM</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-500">📍 Zoom</p>
              </div>
            </mat-list-item>

            <mat-list-item class="h-auto hover:bg-gray-50 dark:hover:bg-gray-700/50 px-6 py-4">
              <div class="w-full">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">Web Design Masterclass</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">With Design Team</p>
                  </div>
                  <span class="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">Next Friday</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-500">📍 Microsoft Teams</p>
              </div>
            </mat-list-item>
          </mat-list>
          <mat-card-footer class="border-t border-gray-200 dark:border-gray-700 p-4">
            <button mat-stroked-button routerLink="/student/live-classes" class="w-full">
              View All Classes
            </button>
          </mat-card-footer>
        </mat-card>
      </div>

      <!-- Quick Actions & Progress -->
      <div class="space-y-6">
        <!-- Progress Card -->
        <mat-card class="shadow-sm">
          <mat-card-header class="border-b border-gray-200 dark:border-gray-700 p-4">
            <mat-card-title class="text-lg font-bold m-0">Learning Progress</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6 space-y-4">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Angular Course</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">75%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript Basics</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">60%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: 60%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Web Design</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">45%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 45%"></div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Quick Links -->
        <mat-card class="shadow-sm">
          <mat-card-header class="border-b border-gray-200 dark:border-gray-700 p-4">
            <mat-card-title class="text-lg font-bold m-0">Quick Links</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-0">
            <button mat-menu-item routerLink="/student/courses" class="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <mat-icon class="text-lg">library_books</mat-icon>
              My Courses
            </button>
            <button mat-menu-item routerLink="/student/recordings" class="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
              <mat-icon class="text-lg">video_library</mat-icon>
              Recordings
            </button>
            <button mat-menu-item routerLink="/student/calendar" class="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
              <mat-icon class="text-lg">calendar_today</mat-icon>
              Calendar
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})
export class StudentDashboardComponent {}
