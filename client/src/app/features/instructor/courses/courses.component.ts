import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-instructor-courses',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Courses"></app-page-header>
    <app-empty-state icon="school" title="No courses" message="You haven't created any courses yet">
    </app-empty-state>
  `,
})
export class InstructorCoursesComponent {}
