import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ApiPaginatedResponse, PaginatedResponse } from '../../models';

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams | Record<string, string | number | boolean>): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body);
  }

  patch<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.apiUrl}${endpoint}`);
  }

  getPaginated<T>(
    endpoint: string,
    pagination?: PaginationParams
  ): Observable<ApiPaginatedResponse<T>> {
    let params = new HttpParams();

    if (pagination) {
      if (pagination.page !== undefined) params = params.set('page', pagination.page);
      if (pagination.pageSize !== undefined) params = params.set('pageSize', pagination.pageSize);
      if (pagination.sortBy) params = params.set('sortBy', pagination.sortBy);
      if (pagination.sortOrder) params = params.set('sortOrder', pagination.sortOrder);
    }

    return this.http.get<ApiPaginatedResponse<T>>(`${this.apiUrl}${endpoint}`, { params });
  }

  buildParams(obj: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null && obj[key] !== undefined) {
        params = params.set(key, obj[key]);
      }
    });
    return params;
  }
}
