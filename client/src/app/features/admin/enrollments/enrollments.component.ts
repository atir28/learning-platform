import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Enrollments"></app-page-header>
    <app-empty-state icon="assignment" title="Enrollments list" message="Enrollment management interface">
    </app-empty-state>
  `,
})
export class EnrollmentsComponent {}
