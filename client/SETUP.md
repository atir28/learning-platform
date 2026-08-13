# Project Setup Guide

## Prerequisites

- Node.js 18+ / npm 9+
- Angular CLI 19+
- TypeScript 5.2+

## Installation

```bash
# Create new Angular project (if not done)
ng new learning-platform --skip-git

cd learning-platform

# Install dependencies
npm install

# Install Material
ng add @angular/material

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Configuration

### 1. Tailwind Configuration

Update `tailwind.config.js`:
```javascript
content: ['./src/**/*.{html,ts}'],
darkMode: 'class',
```

### 2. Global Styles

In `angular.json`, under `projects > [project] > architect > build > styles`:
```json
"styles": [
  "src/styles/tailwind.css",
  "src/styles.css"
]
```

### 3. TypeScript Configuration

In `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "paths": {
      "@models/*": ["src/app/models/*"],
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```

### 4. Environment Configuration

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000',
};

export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api',
  wsUrl: 'wss://api.example.com',
};
```

### 5. HTTP Configuration

In `app.config.ts`, add HTTP error handling:
```typescript
provideHttpClient(
  withInterceptors([...]),
  withXsrfConfiguration({
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN',
  })
)
```

## File Structure Setup

Copy the provided architecture to your project:
```
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── features/
│   ├── layouts/
│   ├── models/
│   ├── styles/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css
└── main.ts
```

## Running the Project

```bash
# Development server
ng serve

# Navigate to http://localhost:4200

# Production build
ng build --configuration production
```

## Environment Variables

Create `.env.local` (not committed):
```
NG_APP_API_URL=http://localhost:3000/api
NG_APP_WS_URL=ws://localhost:3000
```

Access in code:
```typescript
import { environment } from '../../environments/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;
}
```

## Development Tips

### Create a New Feature

1. Create feature folder:
```bash
mkdir -p src/app/features/[role]/[feature]
```

2. Create routes file:
```typescript
// [feature].routes.ts
export const [feature]Routes: Routes = [
  { path: 'dashboard', loadComponent: () => ... }
];
```

3. Create component:
```bash
ng generate component features/[role]/[feature]/[feature]
```

4. Wire routes in `app.routes.ts`

### Add a New Service

```bash
ng generate service core/services/[service]
```

Register in `core.providers.ts`:
```typescript
export const CORE_PROVIDERS = [
  YourNewService,
];
```

### Add a Shared Component

```bash
ng generate component shared/ui/[component]
```

Export in `shared/ui/index.ts`:
```typescript
export * from './[component]/[component].component';
```

## Testing

### Unit Tests

```bash
# Run all tests
ng test

# Run specific test file
ng test --include='**/auth.service.spec.ts'

# Coverage
ng test --code-coverage
```

### E2E Tests

```bash
# Run E2E tests
ng e2e

# Specific spec
ng e2e --specs='e2e/src/app.e2e-spec.ts'
```

## Debugging

### Angular DevTools
Install [Angular DevTools](https://angular.io/guide/devtools) Chrome extension for:
- Component tree inspection
- Change detection visualization
- Service state inspection

### Console Logs
Use Angular's built-in logger:
```typescript
import { inject } from '@angular/core';
import { NgZone } from '@angular/core';

export class MyService {
  ngZone = inject(NgZone);

  log(msg: string) {
    this.ngZone.run(() => console.log(msg));
  }
}
```

## Performance

### Route Lazy Loading
Routes already configured for lazy loading per feature.

### Change Detection Strategy
```typescript
@Component({
  selector: 'app-my',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### Preloading Strategy
```typescript
import { PreloadAllModules } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, preloadingStrategy(PreloadAllModules))
  ]
});
```

## API Integration

### Backend Setup

The .NET backend should implement:

1. **Authentication**
   - `POST /api/auth/login` - Login
   - `POST /api/auth/register` - Register
   - `POST /api/auth/refresh` - Refresh token
   - `GET /api/auth/me` - Get current user

2. **Generic Response Format**
   ```csharp
   public class ApiResponse<T>
   {
       public bool Success { get; set; }
       public T Data { get; set; }
       public ApiError Error { get; set; }
       public DateTime Timestamp { get; set; }
   }
   ```

3. **Role-Based Access Control (RBAC)**
   - Implement claims-based authorization
   - Return user role in JWT token

4. **CORS Configuration**
   ```csharp
   builder.Services.AddCors(options =>
   {
       options.AddPolicy("AllowFrontend", policy =>
       {
           policy.WithOrigins("http://localhost:4200")
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials();
       });
   });
   ```

## Deployment

### Build Optimization

```bash
# Production build with optimization
ng build --configuration production --optimization

# Check bundle size
ng build --stats-json
npm install webpack-bundle-analyzer
```

### Environment-Specific Configuration

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api',
  wsUrl: 'wss://api.example.com',
};
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/[project-name] /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Port Already in Use
```bash
# Use different port
ng serve --port 4201
```

### Module Not Found
- Check path in imports
- Verify barrel exports in `index.ts` files
- Clear node_modules and reinstall

### Style Issues
- Run `ng build` to check for CSS errors
- Verify Tailwind config
- Check for Material theme conflicts

### Authentication Issues
- Verify token stored in localStorage
- Check AuthInterceptor is registered
- Verify backend CORS config

## Next Steps

1. Set up .NET backend with API endpoints
2. Configure API_URL environment variable
3. Implement feature services per role
4. Add comprehensive tests
5. Set up CI/CD pipeline
6. Configure production deployment

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Angular Material](https://material.angular.io)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
