import { SignOutResult } from '../../types/result';

export declare class CompleteSignOut implements SignOutResult {
  signedOutLocally: true;
}
export declare class FailedSignOut implements SignOutResult {
  signedOutLocally: false;
  error: Error;
}

export declare class PartialSignOut implements SignOutResult {
  signedOutLocally: true;
  revokeTokenError?: AWSCognitoRevokeTokenError;
  globalSignOutError?: AWSCognitoGlobalSignOutError;
  hostedUIError?: AWSCognitoHostedUIError;
}

export type AWSCognitoRevokeTokenError = {
  refreshToken: string;
  error: Error;
};

export type AWSCognitoGlobalSignOutError = {
  accessToken: string;
  error: Error;
};

export type AWSCognitoHostedUIError = {
  error: Error;
};
