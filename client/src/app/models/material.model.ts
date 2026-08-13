export type MaterialType = 'document' | 'video' | 'link' | 'file' | 'presentation';

export interface Material {
  id: string;
  courseId: string;
  classSessionId?: string;
  title: string;
  description?: string;
  type: MaterialType;
  contentUrl: string;
  fileSize?: number;
  uploadedBy: string; // instructorId
  uploadedAt: string;
  updatedAt: string;
  isPublished: boolean;
  accessibleToStudents: boolean;
  order?: number;
}

export interface Recording {
  id: string;
  classSessionId: string;
  courseId: string;
  title: string;
  url: string;
  duration: number; // seconds
  fileSize: number; // bytes
  uploadedAt: string;
  uploadedBy: string; // instructorId
  isPublished: boolean;
  accessibleToStudents: boolean;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  metadata?: {
    format?: string;
    resolution?: string;
    bitrate?: string;
  };
}
