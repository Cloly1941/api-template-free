export const IMAGE_MESSAGES = {
  // --- GET ---
  NOT_FOUND: 'Image not found',
  ACCESS_FORBIDDEN: 'You do not have permission to access this image',

  // --- CREATE ---
  CREATE_SUCCESS: 'Image uploaded successfully',
  SLUG_EXISTS: 'Image slug already exists',
  NO_FIELDS_PROVIDED: 'No data provided to create the image',

  // --- DELETE ---
  DELETE_SUCCESS: 'Image deleted successfully',
  DELETE_MANY_SUCCESS: 'Multiple images deleted successfully',
  NO_SLUGS_PROVIDED: 'No slugs were provided',
  NO_IMAGES_FOUND_FOR_SLUGS:
    'No images found for the provided slugs',
  NO_IMAGES_FOUND_FOR_IDS:
    'No images found for the provided IDs',

  // --- UPLOAD ---
  FETCH_SUCCESS: 'Image fetched successfully',
  FETCH_FAILED: 'Failed to fetch image from the server',
} as const;
