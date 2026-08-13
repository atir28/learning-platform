import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Admin Dashboard">
    </app-page-header>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Users</h3>
        <p class="text-3xl font-bold mt-2">1,234</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Courses</h3>
        <p class="text-3xl font-bold mt-2">45</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Enrollments</h3>
        <p class="text-3xl font-bold mt-2">5,678</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg Attendance</h3>
        <p class="text-3xl font-bold mt-2">87%</p>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {}
