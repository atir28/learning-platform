export type NotificationType =
  | 'class-reminder'
  | 'enrollment-confirmation'
  | 'material-added'
  | 'attendance-marked'
  | 'grade-posted'
  | 'assignment-due'
  | 'system-announcement'
  | 'course-update';

export type NotificationChannel = 'in-app' | 'email' | 'push';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channels: NotificationChannel[];
  title: string;
  message: string;
  courseId?: string;
  classSessionId?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
}

export interface NotificationPreferences {
  userId: string;
  channels: {
    inApp: boolean;
    email: boolean;
    push: boolean;
  };
  types: Record<NotificationType, boolean>;
  updatedAt: string;
}
