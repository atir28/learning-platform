import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Courses"></app-page-header>
    <app-empty-state icon="library_books" title="Courses list" message="Course management interface">
    </app-empty-state>
  `,
})
export class AdminCoursesComponent {}
