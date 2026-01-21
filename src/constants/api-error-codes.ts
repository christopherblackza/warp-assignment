/**
 * API Error Codes
 * 
 * Defines standardized numeric error codes for API interactions.
 * Used to map HTTP status codes to user-friendly messages.
 */
export enum ApiErrorCode {
  UNKNOWN_ERROR = 1000,
  CITY_NOT_FOUND = 1001,
  SERVER_ERROR = 1002,
}

/**
 * API Error Messages
 * 
 * Maps error codes to user-friendly error messages.
 */
export const ApiErrorMessages: Record<ApiErrorCode, string> = {
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong fetching weather, please try again.',
  [ApiErrorCode.CITY_NOT_FOUND]: 'City not found, please check spelling and try again.',
  [ApiErrorCode.SERVER_ERROR]: 'Something went wrong fetching weather, please try again.',
};
