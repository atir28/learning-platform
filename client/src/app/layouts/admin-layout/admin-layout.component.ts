import { Component } from '@angular/core';
import { BaseLayoutComponent, NavItem } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [BaseLayoutComponent],
  template: `<app-base-layout [navItems]="navItems"></app-base-layout>`,
})
export class AdminLayoutComponent extends BaseLayoutComponent {
  override navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Users', icon: 'people', route: '/admin/users' },
    { label: 'Instructors', icon: 'school', route: '/admin/instructors' },
    { label: 'Courses', icon: 'library_books', route: '/admin/courses' },
    { label: 'Enrollments', icon: 'assignment', route: '/admin/enrollments' },
    { label: 'Reports', icon: 'analytics', route: '/admin/reports' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' },
  ];
}
