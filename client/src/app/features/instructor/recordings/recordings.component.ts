import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-instructor-recordings',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Recordings"></app-page-header>
    <app-empty-state icon="video_library" title="No recordings" message="No recordings available yet">
    </app-empty-state>
  `,
})
export class InstructorRecordingsComponent {}
