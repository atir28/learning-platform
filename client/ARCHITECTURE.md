# Architecture Overview

## Core Design Principles

1. **Feature-Based Structure**: Code organized by feature (student, instructor, admin), not by technical layer
2. **Standalone Components**: All components are standalone; no NgModules
3. **Lazy Loading**: Features load on-demand per route
4. **Role-Based Access**: Auth guards enforce role-based permissions
5. **Signal-First State**: Modern Angular signals for state management
6. **Clean Separation**: Core services isolated from feature logic

## Directory Structure

```
src/app/
├── core/                    # Core infrastructure (singleton services)
│   ├── auth/               # Auth service
│   ├── guards/             # Route guards (auth, role-based)
│   ├── interceptors/       # HTTP interceptors (token injection)
│   ├── services/           # Core services (API, theme, notifications)
│   └── core.providers.ts   # DI configuration
│
├── shared/                 # Shared across features
│   ├── ui/                 # Reusable UI primitives
│   │   ├── card/
│   │   ├── page-header/
│   │   ├── loading/
│   │   ├── empty-state/
│   │   └── status-badge/
│   ├── components/         # Complex shared components
│   ├── directives/         # Custom directives
│   ├── pipes/              # Custom pipes
│   └── utils/              # Helper functions
│
├── features/               # Feature modules (lazy-loaded)
│   ├── auth/               # Authentication feature
│   ├── student/            # Student-specific features
│   ├── instructor/         # Instructor-specific features
│   ├── admin/              # Admin-specific features
│   └── shared/             # Shared feature components
│
├── layouts/                # Role-based layouts
│   ├── base-layout/        # Base layout with sidebar/topbar
│   ├── student-layout/     # Student navigation
│   ├── instructor-layout/  # Instructor navigation
│   └── admin-layout/       # Admin navigation
│
├── models/                 # TypeScript interfaces/models
│   ├── user.model.ts
│   ├── course.model.ts
│   ├── class-session.model.ts
│   ├── attendance.model.ts
│   ├── material.model.ts
│   ├── notification.model.ts
│   ├── api.model.ts
│   └── index.ts            # Barrel export
│
├── styles/                 # Global styles
│   └── tailwind.css        # Tailwind + theme setup
│
├── app.component.ts        # Root component
├── app.routes.ts           # Route configuration
└── app.config.ts           # Application configuration
```

## Routing Strategy

### Public Routes
- `/auth/login` - Login page
- `/auth/register` - Registration
- `/auth/forgot-password` - Password reset

### Protected Routes (Auth Guard)
- `/student/...` - Student features
- `/instructor/...` - Instructor features
- `/admin/...` - Admin features

Each role has its own layout with role-specific navigation.

## State Management

### Current Approach (Service-Based)
- **AuthService**: Manages auth state using signals
  - `user()` - Current user signal
  - `token()` - Auth token signal
  - `isLoading()` - Loading state signal
  - `auth$` - Observable for RxJS compatibility

### Future Enhancement
- Can migrate to full signal-based state management
- Or adopt a state management library (NgRx, Akita, etc.)
- Current pattern supports gradual migration

## HTTP & API

- **ApiService**: Generic HTTP methods with typed responses
- **AuthInterceptor**: Automatically injects tokens, handles 401 errors
- **Error Handling**: Errors propagated to components via RxJS

API Response Format:
```typescript
{
  success: boolean;
  data?: T;
  error?: { code, message, details };
  timestamp: string;
}
```

## Theme System

### Mechanism
- **ThemeService**: Manages light/dark/system themes
- **CSS Variables**: Theme values in tailwind.css
- **Tailwind Dark Mode**: Uses class strategy (`dark:` utilities)
- **Material Integration**: Dark mode class applied to root

### Themes
- `light` - Light theme (default)
- `dark` - Dark theme
- `system` - Follows OS preference

Theme persists in localStorage.

## Component Structure

### Shared UI Components
Small, focused, reusable primitives:
- `CardComponent` - Card wrapper
- `PageHeaderComponent` - Page title and actions
- `LoadingComponent` - Loading spinner
- `EmptyStateComponent` - Empty state message
- `StatusBadgeComponent` - Status indicator

### Feature Components
Role-specific pages that compose UI components:
- Dashboard
- List pages (courses, live classes, etc.)
- Detail pages
- Forms

### Layout Components
Top-level route components that wrap features:
- `StudentLayoutComponent` - Student navigation + outlet
- `InstructorLayoutComponent` - Instructor navigation + outlet
- `AdminLayoutComponent` - Admin navigation + outlet

## Authentication Flow

1. User enters credentials → Login component
2. AuthService.login() → POST /api/auth/login
3. Server returns token + user data
4. AuthService stores token (localStorage) + signals
5. AuthInterceptor injects token in all requests
6. On 401: AuthInterceptor refreshes token
7. On logout: Clear token + user, redirect to login

## Key Services

### AuthService
- `login(email, password)` - User login
- `register(userData)` - User registration
- `logout()` - Clear session
- `refreshToken()` - Refresh JWT
- Signals: `user()`, `token()`, `isLoading()`

### ApiService
- `get<T>(endpoint)` - GET request
- `post<T>(endpoint, body)` - POST request
- `put<T>(endpoint, body)` - PUT request
- `patch<T>(endpoint, body)` - PATCH request
- `delete<T>(endpoint)` - DELETE request
- `getPaginated<T>(endpoint, params)` - Paginated GET

### ThemeService
- `setTheme(mode)` - Set theme mode
- `toggleTheme()` - Toggle between light/dark
- Signal: `themeMode()` - Current theme
- Property: `isDark` - Is dark theme active

### NotificationService
- `success(message)` - Show success toast
- `error(message)` - Show error toast
- `info(message)` - Show info toast
- `warning(message)` - Show warning toast

## Guards

### AuthGuard
Prevents access to protected routes without authentication.
```typescript
// Apply to route
canActivate: [AuthGuard]
```

### RoleGuard
Restricts routes to specific user roles.
```typescript
// Apply to route
canActivate: [RoleGuard.isStudentGuard]
canActivate: [RoleGuard.isInstructorGuard]
canActivate: [RoleGuard.isAdminGuard]
```

## Domain Models

All models are in `src/app/models/`:

- **User** - User account with role
- **Course** - Course definition
- **Enrollment** - Student enrollment in course
- **ClassSession** - Live class (external meeting URL + metadata)
- **Schedule** - Recurring schedule for classes
- **Attendance** - Attendance record
- **Material** - Course materials
- **Recording** - Class recording
- **Notification** - User notification

Models map 1:1 to .NET DTOs for easy backend integration.

## Future Enhancements

1. **State Management**: Migrate to NgRx or Signals API
2. **Offline Support**: Service Worker + IndexedDB
3. **Real-time**: WebSocket for live class notifications
4. **File Upload**: Direct S3/Cloud Storage integration
5. **Video Streaming**: CDN for recording playback
6. **Internationalization**: i18n for multiple languages
7. **Analytics**: Track user behavior and engagement
8. **Testing**: E2E tests with Cypress/Playwright

## Development Workflow

1. Create feature folder under `src/app/features/[role]/[feature]`
2. Create route file: `[feature].routes.ts`
3. Create component: `[component].component.ts`
4. Create service if needed: `[feature].service.ts`
5. Use guards for auth/role protection
6. Import from `src/app/models` for types
7. Use ApiService for HTTP calls
8. Use shared UI components for consistency

## Testing

- **Unit Tests**: Test services and pipes
- **Component Tests**: Test templates and user interactions
- **E2E Tests**: Test user workflows across roles
- **Visual Tests**: Test theme switching and responsive design

Placeholder pattern:
```typescript
// service.spec.ts
describe('MyService', () => {
  // Tests here
});

// component.spec.ts
describe('MyComponent', () => {
  // Tests here
});
```
