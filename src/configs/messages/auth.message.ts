export const AUTH_MESSAGES = {
  UNAUTHORIZED: 'You need to be logged in to access this resource',
  PERMISSION_DENIED: 'You do not have permission to perform this action',

  // --- LOGIN ---
  INVALID_CREDENTIALS: 'Invalid email or password',
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Incorrect email or password',
  LOGOUT_SUCCESS: 'Logged out successfully',
  SOCIAL_LOGIN_SUCCESS: 'Login successful',
  SOCIAL_LOGIN_FAILED: 'Login failed, please try again',

  // --- REGISTER ---
  REGISTRATION_SUCCESS: 'Registration successful',
  REGISTRATION_FAILED: 'Registration failed, please try again',

  // --- REFRESH TOKEN ---
  REFRESH_TOKEN_SUCCESS: 'New access token generated successfully',
  REFRESH_TOKEN_FAILED: 'Refresh token is invalid or has expired',
  REFRESH_TOKEN_MISSING: 'Refresh token was not provided',

  // --- PASSWORD ---
  FORGOT_PASSWORD: 'Please check your email to reset your password',
  FORGOT_PASSWORD_FAILED: 'This email does not exist in the system',
  RESET_PASSWORD_SUCCESS: 'Password reset successfully',
  TOKEN_INVALID_OR_EXPIRED: 'Token is invalid or has expired',
} as const;
