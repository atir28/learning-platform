import { Component } from '@angular/core';
import { BaseLayoutComponent, NavItem } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-instructor-layout',
  standalone: true,
  imports: [BaseLayoutComponent],
  template: `<app-base-layout [navItems]="navItems"></app-base-layout>`,
})
export class InstructorLayoutComponent extends BaseLayoutComponent {
  override navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/instructor/dashboard' },
    { label: 'Courses', icon: 'school', route: '/instructor/courses' },
    { label: 'Live Classes', icon: 'videocam', route: '/instructor/live-classes' },
    { label: 'Schedule', icon: 'event', route: '/instructor/schedule' },
    { label: 'Students', icon: 'people', route: '/instructor/students' },
    { label: 'Recordings', icon: 'video_library', route: '/instructor/recordings' },
  ];
}
