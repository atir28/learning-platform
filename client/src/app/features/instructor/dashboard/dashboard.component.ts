import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Dashboard" subtitle="Instructor Dashboard">
    </app-page-header>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Courses</h3>
        <p class="text-3xl font-bold mt-2">3</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Students</h3>
        <p class="text-3xl font-bold mt-2">145</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Classes Today</h3>
        <p class="text-3xl font-bold mt-2">2</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium">Recordings</h3>
        <p class="text-3xl font-bold mt-2">24</p>
      </div>
    </div>
  `,
})
export class InstructorDashboardComponent {}
