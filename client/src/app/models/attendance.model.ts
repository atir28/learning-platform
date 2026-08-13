export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Attendance {
  id: string;
  classSessionId: string;
  studentId: string;
  status: AttendanceStatus;
  joinedAt?: string;
  leftAt?: string;
  durationMinutes?: number;
  markedByInstructorId?: string;
  notes?: string;
  recordedAt: string;
}

export interface AttendanceRecord {
  classSessionId: string;
  courseId: string;
  attendances: Attendance[];
  recordedDate: string;
}
