import { Component } from '@angular/core';
import { BaseLayoutComponent, NavItem } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [BaseLayoutComponent],
  template: `<app-base-layout [navItems]="navItems"></app-base-layout>`,
})
export class StudentLayoutComponent extends BaseLayoutComponent {
  override navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/student/dashboard' },
    { label: 'My Courses', icon: 'school', route: '/student/courses' },
    { label: 'Live Classes', icon: 'videocam', route: '/student/live-classes' },
    { label: 'Calendar', icon: 'calendar_today', route: '/student/calendar' },
    { label: 'Recordings', icon: 'video_library', route: '/student/recordings' },
    { label: 'Profile', icon: 'person', route: '/student/profile' },
  ];
}
