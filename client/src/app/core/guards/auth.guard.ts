import { Injectable } from '@angular/core';
import { Router, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  canActivate: CanActivateFn = (route, state) => {
    if (this.auth.isAuthenticated) {
      return true;
    }

    this.notification.warning('Please log in to continue');
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  };

  canActivateChild: CanActivateChildFn = (childRoute, state) => {
    return this.canActivate(childRoute, state);
  };
}
