import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: 5000,
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, config?: Partial<MatSnackBarConfig>): void {
    this.show(message, 'success', { ...this.defaultConfig, ...config });
  }

  error(message: string, config?: Partial<MatSnackBarConfig>): void {
    this.show(message, 'error', {
      ...this.defaultConfig,
      duration: 7000,
      ...config,
    });
  }

  info(message: string, config?: Partial<MatSnackBarConfig>): void {
    this.show(message, 'info', { ...this.defaultConfig, ...config });
  }

  warning(message: string, config?: Partial<MatSnackBarConfig>): void {
    this.show(message, 'warning', { ...this.defaultConfig, ...config });
  }

  private show(message: string, type: ToastType, config: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      ...config,
      panelClass: [`snackbar-${type}`],
    });
  }
}
