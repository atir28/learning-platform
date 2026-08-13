import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-instructor-live-classes',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Live Classes"></app-page-header>
    <app-empty-state icon="videocam" title="No classes" message="No live classes scheduled">
    </app-empty-state>
  `,
})
export class InstructorLiveClassesComponent {}
