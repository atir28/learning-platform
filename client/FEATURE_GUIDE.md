# Feature Development Guide

## Creating a New Feature

Follow this pattern to add a new feature to a role.

### Step 1: Create Feature Structure

```bash
mkdir -p src/app/features/[role]/[feature-name]/{pages,services,models}
```

### Step 2: Define Models (if needed)

Create feature-specific models in `src/app/features/[role]/[feature-name]/models/`:

```typescript
// course-detail.model.ts
export interface CourseDetailData {
  id: string;
  title: string;
  // ... feature-specific fields
}
```

Export from feature:
```typescript
// models/index.ts
export * from './course-detail.model';
```

### Step 3: Create Feature Service

```bash
ng generate service features/[role]/[feature-name]/[feature]
```

Example:

```typescript
// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../../models';
import { ApiService } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private api: ApiService) {}

  getCourses(pagination?: any): Observable<any> {
    return this.api.getPaginated<Course>('/courses', pagination);
  }

  getCourseById(id: string): Observable<any> {
    return this.api.get<Course>(`/courses/${id}`);
  }

  createCourse(data: Partial<Course>): Observable<any> {
    return this.api.post<Course>('/courses', data);
  }

  updateCourse(id: string, data: Partial<Course>): Observable<any> {
    return this.api.put<Course>(`/courses/${id}`, data);
  }

  deleteCourse(id: string): Observable<any> {
    return this.api.delete<Course>(`/courses/${id}`);
  }
}
```

### Step 4: Create Components

```bash
ng generate component features/[role]/[feature-name]/[component-name]
```

Make components standalone:

```typescript
// course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { CourseService } from '../course.service';
import { PageHeaderComponent, LoadingComponent } from '../../../shared/ui';
import { Course } from '../../../models';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    PageHeaderComponent,
    LoadingComponent,
  ],
  template: `
    <app-page-header title="Courses">
      <div actions>
        <button mat-raised-button color="primary" routerLink="create">
          Create Course
        </button>
      </div>
    </app-page-header>

    <div *ngIf="loading$ | async; else content">
      <app-loading></app-loading>
    </div>

    <ng-template #content>
      <table mat-table [dataSource]="courses$ | async">
        <!-- Columns here -->
      </table>
    </ng-template>
  `,
})
export class CourseListComponent implements OnInit {
  courses$ = this.courseService.getCourses();
  loading$ = this.courseService.loading$;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // Initialize
  }
}
```

### Step 5: Create Routes

```typescript
// course.routes.ts
import { Routes } from '@angular/router';

export const courseRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./course-list/course-list.component').then(m => m.CourseListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./course-form/course-form.component').then(m => m.CourseFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./course-detail/course-detail.component').then(m => m.CourseDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./course-form/course-form.component').then(m => m.CourseFormComponent),
  },
];
```

### Step 6: Wire Routes in Parent

In `src/app/features/[role]/[role].routes.ts`:

```typescript
{
  path: 'courses',
  loadChildren: () =>
    import('./courses/course.routes').then(m => m.courseRoutes),
},
```

## Common Patterns

### List with Pagination

```typescript
import { signal } from '@angular/core';
import { PaginationParams } from '../../../core/services/api.service';

@Component({...})
export class ListComponent {
  items$ = this.service.getItems(this.pagination);
  
  pagination = signal<PaginationParams>({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  onPageChange(page: number): void {
    this.pagination.update(p => ({ ...p, page }));
    this.items$ = this.service.getItems(this.pagination());
  }
}
```

### Form Submission

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';

@Component({...})
export class FormComponent {
  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();
    
    this.service.create(data).subscribe({
      next: () => {
        this.notification.success('Created successfully');
        this.router.navigate(['..']);
      },
      error: (err) => {
        this.notification.error(err.error?.message || 'Failed to create');
      },
    });
  }

  constructor(
    private fb: FormBuilder,
    private service: MyService,
    private notification: NotificationService,
    private router: Router,
  ) {}
}
```

### Detail with Edit

```typescript
@Component({...})
export class DetailComponent implements OnInit {
  item$ = new Observable<Item>();
  isEditing = signal(false);

  constructor(
    private route: ActivatedRoute,
    private service: MyService,
  ) {}

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      switchMap(params => this.service.getById(params.get('id')!))
    );
  }

  onEdit(): void {
    this.isEditing.set(true);
  }

  onSave(data: Item): void {
    this.service.update(data.id, data).subscribe({
      next: () => {
        this.notification.success('Updated');
        this.isEditing.set(false);
        this.item$ = this.service.getById(data.id);
      },
      error: (err) => this.notification.error(err.error?.message),
    });
  }
}
```

### Delete with Confirmation

```typescript
import { MatDialog } from '@angular/material/dialog';

@Component({...})
export class ListComponent {
  onDelete(id: string): void {
    if (!confirm('Are you sure?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.notification.success('Deleted');
        this.loadItems();
      },
      error: (err) => this.notification.error('Failed to delete'),
    });
  }

  // Or with Material Dialog
  onDeleteWithDialog(id: string): void {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      // Delete logic
    });
  }
}
```

### Search/Filter

```typescript
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({...})
export class ListComponent {
  searchTerm = new FormControl('');
  
  items$ = this.searchTerm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.service.search(term)),
  );
}
```

## State Management Pattern

For feature-level state, use signals:

```typescript
// course.state.ts
import { signal, computed } from '@angular/core';
import { Course } from '../../../models';

export interface CourseState {
  courses: Course[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

export class CourseStore {
  private courseSignal = signal<CourseState>({
    courses: [],
    selectedId: null,
    loading: false,
    error: null,
  });

  // Read-only signals
  courses = computed(() => this.courseSignal().courses);
  selected = computed(() =>
    this.courseSignal().courses.find(c => c.id === this.courseSignal().selectedId)
  );
  loading = computed(() => this.courseSignal().loading);

  // Actions
  load(): void {
    this.courseSignal.update(s => ({ ...s, loading: true }));
    this.service.getCourses().subscribe({
      next: (data) => {
        this.courseSignal.update(s => ({ ...s, courses: data, loading: false }));
      },
      error: (err) => {
        this.courseSignal.update(s => ({ ...s, error: err.message, loading: false }));
      },
    });
  }

  select(id: string): void {
    this.courseSignal.update(s => ({ ...s, selectedId: id }));
  }
}
```

Usage in component:

```typescript
@Component({...})
export class CourseComponent {
  courses = this.store.courses;
  selected = this.store.selected;
  loading = this.store.loading;

  constructor(private store: CourseStore) {
    this.store.load();
  }
}
```

## Testing Features

### Service Test

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
  });

  it('should fetch courses', () => {
    // Test implementation
  });
});
```

### Component Test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display courses', () => {
    expect(component.courses$).toBeDefined();
  });
});
```

## Best Practices

1. **Keep components focused**: One responsibility per component
2. **Use services for data**: HTTP calls in services, not components
3. **Compose over inheritance**: Extend functionality via composition
4. **Lazy load routes**: Load features on-demand
5. **Use signals**: Modern Angular state management
6. **Type everything**: Strict TypeScript
7. **Error handling**: Always handle errors gracefully
8. **Loading states**: Show loading indicators
9. **Accessibility**: Use semantic HTML + ARIA
10. **Performance**: Use OnPush change detection, unsubscribe properly

## File Naming

- Component: `*.component.ts`
- Service: `*.service.ts`
- Model: `*.model.ts`
- Routes: `*.routes.ts`
- State: `*.store.ts` or `*.state.ts`
- Directive: `*.directive.ts`
- Pipe: `*.pipe.ts`
- Guard: `*.guard.ts`
- Interceptor: `*.interceptor.ts`
