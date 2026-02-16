export const UPLOAD_MESSAGES = {
  // --- SUCCESS ---
  UPLOAD_SINGLE_SUCCESS: 'Image uploaded successfully',
  UPLOAD_MULTIPLE_SUCCESS: 'Images uploaded successfully',

  // --- VALIDATION / ERROR ---
  ONLY_IMAGES_ALLOWED: 'Only image files are allowed',
  FILE_TOO_LARGE: 'File size exceeds the allowed limit (10MB)',
  NO_FILE_UPLOADED: 'No file was uploaded',
  NO_FILES_UPLOADED: 'No image files were uploaded',

  CAPTION_REQUIRED: 'Please provide a caption for the image.',
  FILE_NOT_FOUND: 'File not found.',
  FETCH_FILE_ERROR: 'Failed to retrieve file information.',
  STREAM_FILE_ERROR: 'Failed to stream image data.',
  UPLOAD_FAILED: 'Image upload failed.',
} as const;
