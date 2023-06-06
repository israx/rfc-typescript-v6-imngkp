import {
  AuthDevice,
  AuthMFAType,
  AuthProvider,
  AuthUserAttribute,
  AuthUserAttributeKey,
} from './models';
import {
  AuthServiceOptions,
  AuthSignUpOptions,
  SignInWithWebUIOptions,
} from './options';
import { AuthSignInStep } from './step';

export type ConfirmResetPasswordRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  newPassword: string;
  confirmationCode: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type SoftwareTokenChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  confirmationCode: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type CustomChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  challengeResponse: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type SMSChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  smsCode: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type NewPasswordRequiredChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  newPassword: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type SelectMFAChallengeRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  mfaType: MFAType;
  options?: { serviceOptions?: ServiceOptions };
};

export type DefaultConfirmSignInRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> =
  | SoftwareTokenChallengeRequest<ServiceOptions>
  | CustomChallengeRequest<ServiceOptions>
  | SMSChallengeRequest<ServiceOptions>
  | NewPasswordRequiredChallengeRequest<ServiceOptions>
  | SelectMFAChallengeRequest<MFAType, ServiceOptions>;

export type ConfirmSignInRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE]: SoftwareTokenChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE]: CustomChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE]: SMSChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED]: NewPasswordRequiredChallengeRequest<ServiceOptions>;
  [AuthSignInStep.SELECT_MFA_TYPE]: SelectMFAChallengeRequest<
    MFAType,
    ServiceOptions
  >;
  [defaultStep: string]: DefaultConfirmSignInRequest<MFAType, ServiceOptions>;
};

export type ConfirmSignUpRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  confirmationCode: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type ConfirmSoftwareTokenRequest = {
  confirmationCode: string;
};

export type ConfirmUserAttributeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  userAttributeKey: UserAttributeKey;
  confirmationCode: string;
};

export type FetchAuthSessionRequest = {
  options?: {
    forceRefresh?: boolean;
  };
};

export type FetchUserAttributesRequest = {
  recache?: boolean;
};

export type ForgetDeviceRequest = {
  device?: AuthDevice;
};

export type GetCurrentUserRequest = {
  recache?: boolean;
};

export type ResendConfirmationCodeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  attributeName: UserAttributeKey;
};

export type ResendSignUpCodeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type ResendUserAttributeConfirmationCodeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributeKey: UserAttributeKey;
  options?: { serviceOptions?: ServiceOptions };
};

export type ResetPasswordRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type SetPreferredMFARequest<MFAType extends AuthMFAType = AuthMFAType> =
  {
    mfaType: MFAType;
  };

export type SignInRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  password?: string;
  options?: { serviceOptions?: ServiceOptions };
};

export type SignInWithWebUIRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  provider: AuthProvider;
  options?: SignInWithWebUIOptions<ServiceOptions>;
};

export type SignOutRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  options?: {
    globalSignOut?: boolean;
    serviceOptions?: ServiceOptions;
  };
};

export type SignUpRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  password: string;
  userId?: string;
  options?: AuthSignUpOptions<UserAttributeKey, ServiceOptions>;
};

export type UpdatePasswordRequest = {
  newPassword: string;
  oldPassword: string;
};

export type UpdateUserAttributeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  options?: { serviceOptions?: ServiceOptions };
} & AuthUserAttribute<UserAttributeKey>;

export type UpdateUserAttributesRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributes: AuthUserAttribute<UserAttributeKey>[];
  options?: { serviceOptions?: ServiceOptions };
};
