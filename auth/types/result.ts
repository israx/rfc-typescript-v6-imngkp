import { AuthSignInDetails, AuthUserAttributeKey } from './models';
import {
  AuthNextResetPasswordStep,
  AuthNextSignInStep,
  AuthNextSignUpStep,
  AuthNextUpdateAttributeStep,
} from './step';

export type AuthSignInResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isSignedIn: boolean;
  nextStep: AuthNextSignInStep<UserAttributeKey>;
};

export type AuthSignUpResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isSignUpComplete: boolean;
  nextStep: AuthNextSignUpStep<UserAttributeKey>;
};

export type AuthUser<
  SignInDetails extends AuthSignInDetails = AuthSignInDetails
> = {
  username: string;
  userId: string;
  signInDetails: SignInDetails;
};

export type ResetPasswordResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isPasswordReset: boolean;
  nextStep: AuthNextResetPasswordStep<UserAttributeKey>;
};

export type SetupSoftwareTokenResult = {
  secretCode: string;
  getQRCodeLinkGenerator: (appName: string) => string;
};

export interface SignOutResult {}

export type UpdateUserAttributeResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  nextStep: AuthNextUpdateAttributeStep<UserAttributeKey>;
  isUpdated: boolean;
};

export type UpdateUserAttributesResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  [authKey in UserAttributeKey]?: UpdateUserAttributeResult<UserAttributeKey>;
};
