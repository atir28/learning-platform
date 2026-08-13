import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `<app-page-header title="My Profile"></app-page-header>`,
})
export class ProfileComponent {}
