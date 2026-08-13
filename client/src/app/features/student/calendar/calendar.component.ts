import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `<app-page-header title="Calendar"></app-page-header>`,
})
export class CalendarComponent {}
