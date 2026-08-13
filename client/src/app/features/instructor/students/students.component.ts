import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Students"></app-page-header>
    <app-empty-state icon="people" title="No students" message="No students enrolled yet">
    </app-empty-state>
  `,
})
export class StudentsComponent {}
