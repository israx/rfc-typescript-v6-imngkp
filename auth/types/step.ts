import {
  AdditionalInfo,
  AuthCodeDeliveryDetails,
  AuthUserAttributeKey,
} from './models';

export type AuthNextResetPasswordStep<
  UserAttributeKey extends AuthUserAttributeKey
> = {
  resetPasswordStep: AuthResetPasswordStep;
  additionalInfo: AdditionalInfo;
  codeDeliveryDetails: AuthCodeDeliveryDetails<UserAttributeKey>;
};

export type AuthNextSignInStep<UserAttributeKey extends AuthUserAttributeKey> =
  {
    signInStep: AuthSignInStep;
    codeDeliveryDetails?: AuthCodeDeliveryDetails;
    additionalInfo?: AdditionalInfo;
    confirmationCode?: string;
    missingAttributes?: UserAttributeKey[];
  };

export type AuthNextSignUpStep<UserAttributeKey extends AuthUserAttributeKey> =
  {
    signUpStep?: AuthSignUpStep;
    additionalInfo?: AdditionalInfo;
    codeDeliveryDetails?: AuthCodeDeliveryDetails<UserAttributeKey>;
  };

export type AuthNextUpdateAttributeStep<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  updateAttributeStep: AuthUpdateAttributeStep;
  additionalInfo: AdditionalInfo;
  codeDeliveryDetails: AuthCodeDeliveryDetails<UserAttributeKey>;
};

export enum AuthResetPasswordStep {
  CONFIRM_RESET_PASSWORD_WITH_CODE = 'CONFIRM_RESET_PASSWORD_WITH_CODE',
  DONE = 'DONE',
}

export enum AuthSignInStep {
  CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE = 'CONFIRM_SIGN_IN_SMS_MFA_CODE',

  CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE = 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE',

  CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',

  CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE = 'CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE',

  SELECT_MFA_TYPE = 'SELECT_MFA_TYPE',

  CONFIRM_SIGN_UP = 'CONFIRM_SIGN_UP',

  RESET_PASSWORD = 'RESET_PASSWORD',

  DONE = 'DONE',
}

export enum AuthSignUpStep {
  CONFIRM_SIGN_UP = 'CONFIRM_SIGN_UP',
  DONE = 'DONE',
}

export enum AuthUpdateAttributeStep {
  CONFIRM_ATTRIBUTE_WITH_CODE = 'CONFIRM_ATTRIBUTE_WITH_CODE',
  DONE = 'DONE',
}
