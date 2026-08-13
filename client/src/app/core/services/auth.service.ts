import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';
import { User, AuthResponse } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = '/api/auth';

  private userSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);
  private isLoadingSignal = signal(false);

  private authSubject = new BehaviorSubject<User | null>(null);
  public auth$ = this.authSubject.asObservable();

  get user() {
    return this.userSignal.asReadonly();
  }

  get token() {
    return this.tokenSignal.asReadonly();
  }

  get isLoading() {
    return this.isLoadingSignal.asReadonly();
  }

  get isAuthenticated(): boolean {
    return !!this.userSignal() && !!this.tokenSignal();
  }

  constructor(private http: HttpClient, private router: Router) {
    this.loadStoredAuth();
  }

  login(email: string, password: string): Observable<User> {
    this.isLoadingSignal.set(true);

    // Mock authentication for demo
    const mockUsers: Record<string, User> = {
      'student@example.com': {
        id: '1',
        email: 'student@example.com',
        firstName: 'John',
        lastName: 'Student',
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'instructor@example.com': {
        id: '2',
        email: 'instructor@example.com',
        firstName: 'Jane',
        lastName: 'Instructor',
        role: 'instructor',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'admin@example.com': {
        id: '3',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    // Simulate API call delay
    return new Observable<User>((observer) => {
      setTimeout(() => {
        const user = mockUsers[email];
        if (user && password === 'password123') {
          const mockResponse: AuthResponse = {
            accessToken: 'mock-jwt-token-' + Date.now(),
            user: user,
          };
          this.setAuth(mockResponse.accessToken, mockResponse.user as User);
          observer.next(mockResponse.user as User);
          observer.complete();
        } else {
          this.isLoadingSignal.set(false);
          observer.error({
            error: {
              message: 'Invalid email or password',
            },
          });
        }
      }, 800); // 800ms delay to simulate network
    });
  }

  register(userData: Partial<User> & { password: string }): Observable<User> {
    this.isLoadingSignal.set(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        this.setAuth(response.accessToken, response.user as User);
      }),
      map((response) => response.user as User),
      catchError((error) => {
        this.isLoadingSignal.set(false);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    this.authSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<string> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}).pipe(
      tap((response) => {
        this.setAuth(response.accessToken, response.user as User);
      }),
      map((response) => response.accessToken),
      catchError(() => {
        this.logout();
        return of('');
      })
    );
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    this.authSubject.next(user);
    this.isLoadingSignal.set(false);
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.tokenSignal.set(token);
      // Verify token is still valid by fetching current user
      this.http.get<{ user: User }>(`${this.apiUrl}/me`).subscribe({
        next: (response) => {
          this.userSignal.set(response.user);
          this.authSubject.next(response.user);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }
}
