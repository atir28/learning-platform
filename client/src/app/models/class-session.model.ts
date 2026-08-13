export type MeetingProvider = 'zoom' | 'google-meet' | 'teams' | 'other';
export type ClassSessionStatus = 'scheduled' | 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  description?: string;

  startDateTime: string; // ISO 8601
  endDateTime: string;   // ISO 8601

  meetingProvider: MeetingProvider;
  meetingUrl: string;

  status: ClassSessionStatus;
  recordingUrl?: string;
  recordingStatus?: 'pending' | 'processing' | 'available' | 'failed';

  instructorId: string;
  maxAttendees?: number;

  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  pattern: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  dayOfWeek?: number; // 0 = Sunday, 6 = Saturday
  startTime: string;  // HH:mm
  endTime: string;
  timezone: string;
  startDate: string;
  endDate?: string;
  occurrences?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSessionWithRecording extends ClassSession {
  recording?: {
    id: string;
    url: string;
    duration: number;
    size: number;
    uploadedAt: string;
  };
}
