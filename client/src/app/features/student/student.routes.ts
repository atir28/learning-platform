import { Routes } from '@angular/router';
import { StudentLayoutComponent } from '../../layouts/student-layout/student-layout.component';

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.StudentDashboardComponent),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./courses/courses.component').then((m) => m.CoursesComponent),
      },
      {
        path: 'courses/:id',
        loadComponent: () =>
          import('./course-detail/course-detail.component').then(
            (m) => m.CourseDetailComponent
          ),
      },
      {
        path: 'live-classes',
        loadComponent: () =>
          import('./live-classes/live-classes.component').then(
            (m) => m.LiveClassesComponent
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calendar/calendar.component').then((m) => m.CalendarComponent),
      },
      {
        path: 'recordings',
        loadComponent: () =>
          import('./recordings/recordings.component').then((m) => m.RecordingsComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
