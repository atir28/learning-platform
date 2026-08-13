import { Routes } from '@angular/router';
import { InstructorLayoutComponent } from '../../layouts/instructor-layout/instructor-layout.component';

export const instructorRoutes: Routes = [
  {
    path: '',
    component: InstructorLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.InstructorDashboardComponent),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./courses/courses.component').then((m) => m.InstructorCoursesComponent),
      },
      {
        path: 'live-classes',
        loadComponent: () =>
          import('./live-classes/live-classes.component').then(
            (m) => m.InstructorLiveClassesComponent
          ),
      },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./schedule/schedule.component').then((m) => m.ScheduleComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./students/students.component').then((m) => m.StudentsComponent),
      },
      {
        path: 'recordings',
        loadComponent: () =>
          import('./recordings/recordings.component').then((m) => m.InstructorRecordingsComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
