export const USERS_MESSAGES = {
  // --- COMMON ---
  DELETED_OR_BANNED:
    'This account has been locked. Please contact the administrator for more details.',
  NO_IDS_PROVIDED: 'No user ID list was provided!',
  NO_ELIGIBLE: 'You are not eligible to perform this action!',

  // --- CREATE / UPDATE ---
  EMAIL_EXISTED: 'This email is already used by another user!',
  CREATE_SUCCESS: 'User created successfully!',
  UPDATE_SUCCESS: 'User updated successfully!',
  UPDATE_PROFILE_SUCCESS: 'Profile updated successfully!',
  DELETE_SUCCESS: 'User deleted successfully!',
  DELETE_MULTI_SUCCESS: 'Multiple users deleted successfully!',
  RESTORE_SUCCESS: 'User restored successfully!',
  RESTORE_MULTI_SUCCESS: 'Multiple users restored successfully!',

  // --- GET ---
  GET_ALL_SUCCESS: 'User list retrieved successfully!',
  GET_DETAIL_SUCCESS: 'User details retrieved successfully!',
  GET_PROFILE_SUCCESS: 'Profile retrieved successfully!',
  GET_TRASH_SUCCESS: 'Deleted users retrieved successfully!',
  GET_TRASH_DETAIL_SUCCESS: 'Deleted user details retrieved successfully!',

  // --- AUTH / PASSWORD ---
  INVALID_OR_EXPIRED_TOKEN: 'The password reset token is invalid or has expired!',
  USER_NOT_FOUND: 'No user found with the provided email!',
} as const;
