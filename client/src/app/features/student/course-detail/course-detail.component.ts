import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `<app-page-header title="Course Detail"></app-page-header>`,
})
export class CourseDetailComponent {}
