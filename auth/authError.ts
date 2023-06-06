/**
 * Creates an Auth error
 *
 * @param message text that describes the main problem.
 * @param underlyingException the underlying cause of the error.
 * @param recoverySuggestion suggestion to recover from the error.
 */
export class AuthError extends Error {
  underlyingException?: Error | unknown;
  recoverySuggestion?: string;
}
