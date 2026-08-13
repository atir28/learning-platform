import { Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from './core/guards';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/student/student.routes').then((m) => m.studentRoutes),
    data: { role: 'student' },
  },
  {
    path: 'instructor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/instructor/instructor.routes').then((m) => m.instructorRoutes),
    data: { role: 'instructor' },
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
    data: { role: 'admin' },
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
