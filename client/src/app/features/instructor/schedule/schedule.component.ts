import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `<app-page-header title="Schedule"></app-page-header>`,
})
export class ScheduleComponent {}
