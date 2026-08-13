# ClassSession Implementation Guide

## Core Concept

A **ClassSession** is the central domain concept for live classes. It represents a scheduled meeting with an external URL (Zoom, Google Meet, Teams, etc.), NOT a tight integration with a specific provider.

```typescript
interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  
  startDateTime: string;  // ISO 8601
  endDateTime: string;
  
  meetingProvider: 'zoom' | 'google-meet' | 'teams' | 'other';
  meetingUrl: string;     // Generic external URL
  
  status: 'scheduled' | 'upcoming' | 'live' | 'completed' | 'cancelled';
  recordingUrl?: string;
  recordingStatus?: 'pending' | 'processing' | 'available' | 'failed';
  
  instructorId: string;
  maxAttendees?: number;
  
  createdAt: string;
  updatedAt: string;
}
```

## Why This Design?

1. **Provider Agnostic**: Not locked to Zoom API or any specific provider
2. **Simple**: Just a URL, metadata, and timing
3. **Flexible**: Can add more providers without architecture change
4. **Future-Proof**: Supports eventual in-app meeting capability
5. **Scalable**: No licensing/quota issues with provider APIs

## Data Flow

### Creating a ClassSession

Instructor creates live class in their course:

```
Instructor Form
  ↓
POST /api/courses/{courseId}/class-sessions
  {
    title: "Introduction to Angular",
    startDateTime: "2024-01-15T10:00:00Z",
    endDateTime: "2024-01-15T11:00:00Z",
    meetingProvider: "zoom",
    meetingUrl: "https://zoom.us/j/123456789",
    maxAttendees: 50
  }
  ↓
Backend creates ClassSession
  ↓
Students see in calendar/upcoming classes
```

### Joining a ClassSession

Student joins live class:

```
Student clicks "Join Class"
  ↓
GET /api/class-sessions/{id}
  ← {ClassSession with meetingUrl}
  ↓
Open meetingUrl in new window (external provider)
  ↓
POST /api/class-sessions/{id}/attendance
  {
    studentId: "...",
    joinedAt: "2024-01-15T10:05:00Z"
  }
  ↓
Backend marks attendance
```

### Recording a ClassSession

After class, instructor uploads recording:

```
Instructor uploads recording file
  ↓
POST /api/class-sessions/{id}/recording
  {
    recordingUrl: "https://cdn.example.com/recording.mp4",
    duration: 3600,
    fileSize: 1048576000
  }
  ↓
Backend stores recording metadata
  ↓
Students access "Recordings" section
```

## Implementation Examples

### Service: ClassSessionService

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassSession, ClassSessionWithRecording } from '../../../models';
import { ApiService, PaginationParams } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ClassSessionService {
  constructor(private api: ApiService) {}

  // Student: Get upcoming classes for enrolled course
  getUpcomingClasses(courseId: string): Observable<any> {
    return this.api.get<ClassSession[]>(
      `/courses/${courseId}/class-sessions/upcoming`
    );
  }

  // Get all class sessions for a course
  getClassSessions(courseId: string, pagination?: PaginationParams): Observable<any> {
    return this.api.getPaginated<ClassSession>(
      `/courses/${courseId}/class-sessions`,
      pagination
    );
  }

  // Get single session details
  getClassSession(id: string): Observable<any> {
    return this.api.get<ClassSessionWithRecording>(`/class-sessions/${id}`);
  }

  // Instructor: Create class session
  createClassSession(courseId: string, data: Partial<ClassSession>): Observable<any> {
    return this.api.post<ClassSession>(
      `/courses/${courseId}/class-sessions`,
      data
    );
  }

  // Instructor: Update session
  updateClassSession(id: string, data: Partial<ClassSession>): Observable<any> {
    return this.api.put<ClassSession>(`/class-sessions/${id}`, data);
  }

  // Instructor: Cancel session
  cancelClassSession(id: string): Observable<any> {
    return this.api.patch<ClassSession>(`/class-sessions/${id}`, {
      status: 'cancelled',
    });
  }

  // Delete session
  deleteClassSession(id: string): Observable<any> {
    return this.api.delete<ClassSession>(`/class-sessions/${id}`);
  }

  // Record attendance when student joins
  recordAttendance(classSessionId: string): Observable<any> {
    return this.api.post(`/class-sessions/${classSessionId}/attendance`, {});
  }

  // Mark attendance (instructor marks after class)
  markAttendance(classSessionId: string, studentId: string, status: 'present' | 'absent' | 'late'): Observable<any> {
    return this.api.post(
      `/class-sessions/${classSessionId}/attendance/${studentId}`,
      { status }
    );
  }

  // Upload recording
  uploadRecording(classSessionId: string, recordingUrl: string, metadata: any): Observable<any> {
    return this.api.post(
      `/class-sessions/${classSessionId}/recording`,
      { recordingUrl, ...metadata }
    );
  }

  // Get recordings for a course
  getRecordings(courseId: string): Observable<any> {
    return this.api.get(`/courses/${courseId}/recordings`);
  }
}
```

### Component: Join Class Button

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClassSession } from '../../../models';

@Component({
  selector: 'app-join-class',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold">{{ session.title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ session.startDateTime | date: 'short' }}
        </p>
      </div>

      <button
        mat-raised-button
        color="primary"
        (click)="onJoinClass()"
        [disabled]="!isLive()"
      >
        <mat-icon>videocam</mat-icon>
        {{ isLive() ? 'Join Now' : 'Not Started' }}
      </button>
    </div>
  `,
})
export class JoinClassComponent {
  @Input() session!: ClassSession;

  isLive(): boolean {
    const now = new Date();
    const start = new Date(this.session.startDateTime);
    const end = new Date(this.session.endDateTime);
    return now >= start && now < end;
  }

  onJoinClass(): void {
    if (!this.session.meetingUrl) {
      alert('Meeting URL not available');
      return;
    }

    // Open in new tab
    window.open(this.session.meetingUrl, '_blank');

    // Record attendance
    // this.classSessionService.recordAttendance(this.session.id).subscribe(...);
  }
}
```

### Component: Upcoming Classes (Student)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ClassSessionService } from '../services/class-session.service';
import { PageHeaderComponent, EmptyStateComponent } from '../../../shared/ui';
import { ClassSession } from '../../../models';

@Component({
  selector: 'app-upcoming-classes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
  template: `
    <app-page-header title="Upcoming Live Classes"></app-page-header>

    <div *ngIf="(classes$ | async)?.items as classes; else empty">
      <mat-list class="space-y-4">
        <mat-list-item *ngFor="let session of classes" class="card">
          <div class="w-full">
            <h3 class="font-semibold">{{ session.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ session.startDateTime | date: 'medium' }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ session.meetingProvider | uppercase }}
            </p>
          </div>

          <button
            mat-icon-button
            (click)="joinClass(session)"
            matTooltip="Join class"
          >
            <mat-icon>videocam</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>
    </div>

    <ng-template #empty>
      <app-empty-state
        icon="videocam"
        title="No Upcoming Classes"
        message="You have no upcoming live classes scheduled."
      ></app-empty-state>
    </ng-template>
  `,
})
export class UpcomingClassesComponent implements OnInit {
  classes$ = this.classSessionService.getUpcomingClasses('');

  constructor(
    private classSessionService: ClassSessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get courseId from route params if in course detail
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      if (courseId) {
        this.classes$ = this.classSessionService.getClassSessions(courseId);
      }
    });
  }

  joinClass(session: ClassSession): void {
    if (!session.meetingUrl) {
      alert('Meeting link not available');
      return;
    }

    window.open(session.meetingUrl, '_blank');
    // Record attendance
    this.classSessionService.recordAttendance(session.id).subscribe();
  }
}
```

### Component: Create/Edit Class Session (Instructor)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { ClassSessionService } from '../services/class-session.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PageHeaderComponent } from '../../../shared/ui';
import { ClassSession } from '../../../models';

@Component({
  selector: 'app-class-session-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    PageHeaderComponent,
  ],
  template: `
    <app-page-header title="Create Live Class"></app-page-header>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-2xl">
      <mat-form-field class="w-full mb-4">
        <mat-label>Class Title</mat-label>
        <input matInput formControlName="title" required />
      </mat-form-field>

      <mat-form-field class="w-full mb-4">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" rows="4"></textarea>
      </mat-form-field>

      <mat-form-field class="w-full mb-4">
        <mat-label>Meeting Provider</mat-label>
        <mat-select formControlName="meetingProvider">
          <mat-option value="zoom">Zoom</mat-option>
          <mat-option value="google-meet">Google Meet</mat-option>
          <mat-option value="teams">Microsoft Teams</mat-option>
          <mat-option value="other">Other</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="w-full mb-4">
        <mat-label>Meeting URL</mat-label>
        <input
          matInput
          formControlName="meetingUrl"
          type="url"
          placeholder="https://..."
          required
        />
      </mat-form-field>

      <mat-form-field class="w-full mb-4">
        <mat-label>Start Date & Time</mat-label>
        <input
          matInput
          formControlName="startDateTime"
          type="datetime-local"
          required
        />
      </mat-form-field>

      <mat-form-field class="w-full mb-4">
        <mat-label>End Date & Time</mat-label>
        <input
          matInput
          formControlName="endDateTime"
          type="datetime-local"
          required
        />
      </mat-form-field>

      <mat-form-field class="w-full mb-6">
        <mat-label>Max Attendees (Optional)</mat-label>
        <input matInput formControlName="maxAttendees" type="number" />
      </mat-form-field>

      <div class="flex gap-4">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Create Class
        </button>
        <button mat-stroked-button type="button" (click)="onCancel()">
          Cancel
        </button>
      </div>
    </form>
  `,
})
export class ClassSessionFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    meetingProvider: ['zoom', Validators.required],
    meetingUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    maxAttendees: [null],
  });

  courseId = '';

  constructor(
    private fb: FormBuilder,
    private classSessionService: ClassSessionService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();
    this.classSessionService.createClassSession(this.courseId, data).subscribe({
      next: () => {
        this.notification.success('Class session created');
        this.router.navigate([`/instructor/courses/${this.courseId}`]);
      },
      error: (err) => {
        this.notification.error(err.error?.message || 'Failed to create class');
      },
    });
  }

  onCancel(): void {
    this.router.back();
  }
}
```

## API Endpoints (Backend)

The backend should implement these endpoints:

```
GET    /api/courses/{courseId}/class-sessions           → List sessions
GET    /api/courses/{courseId}/class-sessions/upcoming   → Upcoming sessions
POST   /api/courses/{courseId}/class-sessions           → Create session
GET    /api/class-sessions/{id}                         → Get session detail
PUT    /api/class-sessions/{id}                         → Update session
PATCH  /api/class-sessions/{id}                         → Partial update
DELETE /api/class-sessions/{id}                         → Delete session

POST   /api/class-sessions/{id}/attendance              → Record attendance
POST   /api/class-sessions/{id}/attendance/{studentId}  → Mark attendance
GET    /api/class-sessions/{id}/attendance              → Get attendance

POST   /api/class-sessions/{id}/recording               → Upload recording
GET    /api/courses/{courseId}/recordings               → List recordings
```

## Key Design Points

1. **No API Calls to External Providers**: Frontend never calls Zoom/Google/Teams APIs
2. **Simple URL**: Just store and open external URL
3. **Attendance Tracking**: Backend records who joined/attended
4. **Recording Storage**: Backend handles recording upload/access
5. **Status Management**: Backend tracks class lifecycle
6. **Timezone Handling**: Use ISO 8601 strings, let backend handle conversion
7. **Future Extensions**:
   - Screen sharing tracking
   - Chat transcripts
   - Recording automatic upload from provider webhooks
   - In-app meeting capability (later)

## Testing

```typescript
describe('ClassSessionService', () => {
  it('should create class session', () => {
    const data: Partial<ClassSession> = {
      title: 'Test Class',
      meetingProvider: 'zoom',
      meetingUrl: 'https://zoom.us/j/123',
      startDateTime: '2024-01-15T10:00:00Z',
      endDateTime: '2024-01-15T11:00:00Z',
    };

    service.createClassSession('course-1', data).subscribe(result => {
      expect(result.success).toBe(true);
      expect(result.data.id).toBeDefined();
    });
  });
});
```

This design keeps the system simple, flexible, and focused on the core business: facilitating live learning sessions regardless of the external meeting provider.
