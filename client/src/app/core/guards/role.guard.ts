import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserRole } from '../../models';

@Injectable({ providedIn: 'root' })
export class RoleGuard {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  canActivateByRole(requiredRoles: UserRole[]): CanActivateFn {
    return (route, state) => {
      const user = this.auth.user();

      if (!user) {
        this.notification.warning('Please log in first');
        this.router.navigate(['/auth/login']);
        return false;
      }

      if (requiredRoles.includes(user.role)) {
        return true;
      }

      this.notification.error('You do not have access to this page');
      this.router.navigate(['/']);
      return false;
    };
  }

  isStudentGuard: CanActivateFn = (route, state) => {
    return this.canActivateByRole(['student'])(route, state);
  };

  isInstructorGuard: CanActivateFn = (route, state) => {
    return this.canActivateByRole(['instructor'])(route, state);
  };

  isAdminGuard: CanActivateFn = (route, state) => {
    return this.canActivateByRole(['admin'])(route, state);
  };

  isInstructorOrAdminGuard: CanActivateFn = (route, state) => {
    return this.canActivateByRole(['instructor', 'admin'])(route, state);
  };
}
