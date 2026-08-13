import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard, RoleGuard } from './guards';
import { AuthService, ApiService, ThemeService, NotificationService } from './services';

export const CORE_PROVIDERS = [
  AuthService,
  ApiService,
  ThemeService,
  NotificationService,
  AuthGuard,
  RoleGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
