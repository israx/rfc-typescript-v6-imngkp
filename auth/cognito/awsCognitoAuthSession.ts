import { AuthSession, Result } from '../types/models';
import { AWSCredentials } from './types/credentials';
import { CognitoUserPoolTokens } from './types/models';

export type CognitoAuthSessionConfig = {
  isSignedIn: boolean;
  credentials: Result<AWSCredentials>;
  userPoolTokens: Result<CognitoUserPoolTokens>;
  userSub: Result<string>;
  identityId: Result<string>;
};

export declare class AWSCognitoAuthSession implements AuthSession {
  isSignedIn: boolean;
  credentials: Result<AWSCredentials>;
  userPoolTokens: Result<CognitoUserPoolTokens>;
  userSub: Result<string>;
  identityId: Result<string>;
}
