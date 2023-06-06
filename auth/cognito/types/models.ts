import {
  AuthAttributeType,
  AuthDevice,
  AuthProvider,
  AuthSignInDetails,
  AuthStandardAttributeKey,
} from '../../types/models';

export type AuthFlowType =
  | 'USER_SRP_AUTH'
  | 'CUSTOM_WITH_SRP'
  | 'CUSTOM_WITHOUT_SRP'
  | 'USER_PASSWORD_AUTH';

export interface AWSAuthDevice extends AuthDevice {
  attributes: AuthAttributeType;
  createDate?: Date;
  lastAuthenticatedDate?: Date;
  lastModifiedDate?: Date;
}

export type ClientMetadata = {
  [key: string]: string;
};

export type ValidationData = { [key: string]: string };

export type CognitoMFAType = 'SMS' | 'NOMFA' | 'TOTP';

export type CustomAttribute = `custom:${string}`;

export type CognitoUserAttributeKey =
  | AuthStandardAttributeKey
  | CustomAttribute;

export type CognitoUserPoolTokens = {
  refreshToken: string;
  accessToken: string;
  idToken: string;
  expiration: Date;
};

export type CognitoSignInDetails =
  | CognitoSignInDetailsApiBased
  | CognitoSignInDetailsHostedUi;

export interface CognitoSignInDetailsApiBased extends AuthSignInDetails {
  username: String;
  authFlowType: AuthFlowType;
}
export interface CognitoSignInDetailsHostedUi extends AuthSignInDetails {
  provider?: AuthProvider;
}
