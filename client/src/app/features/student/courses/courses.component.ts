import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="My Courses"></app-page-header>
    <app-empty-state icon="school" title="No courses" message="You haven't enrolled in any courses yet">
    </app-empty-state>
  `,
})
export class CoursesComponent {}
