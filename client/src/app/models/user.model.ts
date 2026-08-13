export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile extends User {
  enrolledCourses?: string[];
  totalAttendance?: number;
}

export interface InstructorProfile extends User {
  bio?: string;
  qualifications?: string[];
  coursesTaught?: string[];
}

export interface AdminUser extends User {
  permissions: AdminPermission[];
}

export type AdminPermission =
  | 'manage-users'
  | 'manage-courses'
  | 'manage-enrollments'
  | 'view-reports'
  | 'manage-settings';
