export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  thumbnailUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  maxStudents?: number;
  enrolledCount: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetails extends Course {
  syllabus?: string;
  outcomes?: string[];
  requirements?: string[];
  duration?: number;
  tags?: string[];
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrollmentDate: string;
  completionDate?: string;
  status: 'enrolled' | 'completed' | 'dropped';
  progress: number;
}
