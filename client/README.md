# Live-Class Learning Platform - Angular Frontend

Production-ready Angular 19+ frontend for a live-class learning platform.

## Stack
- Angular 19+ (standalone components)
- TypeScript with strict typing
- Tailwind CSS
- Angular Material
- RxJS + Signals
- Feature-based architecture

## Architecture

```
src/
├── app/
│   ├── core/              # Core app infrastructure
│   │   ├── auth/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   ├── config/
│   │   ├── errors/
│   │   └── core.providers.ts
│   ├── shared/            # Reusable across features
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── ui/
│   │   └── utils/
│   ├── layouts/           # Role-based layouts
│   ├── features/          # Feature modules (lazy-loaded)
│   ├── models/            # Domain models/interfaces
│   ├── services/          # API & domain services
│   ├── state/             # State management (signals/services)
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles/
│   ├── tailwind.css
│   └── theme.css
```

## Key Concepts

- **ClassSession**: Represents a live class with external meeting URL (Zoom, Google Meet, Teams, etc.)
- **Role-based**: Student, Instructor, Admin with separate layouts and routes
- **Theme**: Light/Dark support with Tailwind + Angular Material
- **Lazy Loading**: Features load on demand per role
- **Signals**: Modern state management with Angular Signals
- **Standalone Components**: No NgModules for features

## Getting Started

1. Install dependencies
2. Configure theme in Tailwind
3. Set up auth service and guards
4. Create feature modules following patterns
5. Implement API service layer

See individual README files in folders for more details.
