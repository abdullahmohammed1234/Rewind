import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// Supported file types
export type FileType = 'image' | 'video' | 'audio' | 'document';

// File type configurations
export const FILE_TYPES: Record<FileType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/quicktime', 'video/AVI'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'],
  document: ['application/pdf', 'text/plain', 'application/msword'],
};

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES: Record<FileType, number> = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  audio: 50 * 1024 * 1024, // 50MB
  document: 10 * 1024 * 1024, // 10MB
};

// Upload progress callback type
export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

// Upload result type
export interface UploadResult {
  url: string;
  path: string;
  fileType: FileType;
  fileName: string;
  fileSize: number;
  contentType: string;
}

// Detect file type from MIME type
export const detectFileType = (mimeType: string): FileType => {
  for (const [type, mimeTypes] of Object.entries(FILE_TYPES)) {
    if (mimeTypes.includes(mimeType)) {
      return type as FileType;
    }
  }
  return 'document';
};

// Validate file
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateFile = (file: File, maxSize?: number): ValidationResult => {
  const fileType = detectFileType(file.type);
  const allowedTypes = FILE_TYPES[fileType];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }
  
  const maxFileSize = maxSize || MAX_FILE_SIZES[fileType];
  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${formatFileSize(maxFileSize)}`,
    };
  }
  
  return { valid: true };
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

// Generate unique file path
export const generateFilePath = (userId: string, folder: string, fileName: string): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `users/${userId}/${folder}/${timestamp}-${randomSuffix}-${sanitizedFileName}`;
};

// Upload file with progress tracking
export const uploadFile = (
  file: File,
  userId: string,
  folder: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      reject(new Error(validation.error));
      return;
    }

    const path = generateFilePath(userId, folder, file.name);
    const storageRef = ref(storage, path);
    
    // Use uploadBytesResumable for large files (supports pause/resume)
    const uploadTask = uploadBytesResumable(storageRef, file, {
      // Custom metadata for better caching
      customMetadata: {
        'Cache-Control': 'public, max-age=31536000',
      },
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          onProgress({
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
          });
        }
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileType = detectFileType(file.type);
          
          resolve({
            url: downloadURL,
            path: path,
            fileType: fileType,
            fileName: file.name,
            fileSize: file.size,
            contentType: file.type,
          });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  userId: string,
  folder: string,
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile(files[i], userId, folder, (progress) => {
      if (onProgress) {
        onProgress(i, progress);
      }
    });
    results.push(result);
  }
  
  return results;
};

// Delete file from storage
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

// Get file URL from path
export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

// Upload capsule media (images and videos)
export const uploadCapsuleMedia = async (
  files: File[],
  userId: string,
  capsuleId: string,
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<UploadResult[]> => {
  return uploadMultipleFiles(files, userId, `capsules/${capsuleId}`, onProgress);
};

// Upload profile picture
export const uploadProfilePicture = async (
  file: File,
  userId: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  return uploadFile(file, userId, 'profile', onProgress);
};
