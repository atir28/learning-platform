import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `<app-page-header title="Settings"></app-page-header>`,
})
export class SettingsComponent {}
