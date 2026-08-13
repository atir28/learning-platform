import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Instructors"></app-page-header>
    <app-empty-state icon="school" title="Instructors list" message="Instructor management interface">
    </app-empty-state>
  `,
})
export class InstructorsComponent {}
