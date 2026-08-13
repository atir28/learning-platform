import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header title="Users"></app-page-header>
    <app-empty-state icon="people" title="Users list" message="User management interface">
    </app-empty-state>
  `,
})
export class UsersComponent {}
