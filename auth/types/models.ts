import { AuthError } from '../authError';

export type AdditionalInfo = { [key: string]: string };

export type AuthAttributeType = {
  name: string;
  value: string;
};

export type AuthCodeDeliveryDetails<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  destination: string;
  deliveryMedium: DeliveryMedium;
  attributeName?: UserAttributeKey;
};

export type AuthMFAType = string;

export type CustomAuthProvider = { custom: string };

export type AuthProvider =
  | 'GOOGLE'
  | 'FACEBOOK'
  | 'AMAZON'
  | 'COGNITO'
  | CustomAuthProvider;

export type AuthSignInDetails = Record<string, unknown>;

export type AuthUserAttribute<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  [Attribute in UserAttributeKey]?: string;
};

/**
 * Attribute ref - {@link https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html}
 */
export type AuthStandardAttributeKey =
  | 'address'
  | 'birthDate'
  | 'email'
  | 'emailVerified'
  | 'familyName'
  | 'gender'
  | 'givenName'
  | 'locale'
  | 'middleName'
  | 'name'
  | 'nickname'
  | 'phoneNumber'
  | 'phoneNumberVerified'
  | 'picture'
  | 'preferredUsername'
  | 'profile'
  | 'sub'
  | 'updatedAt'
  | 'website'
  | 'zoneInfo';

type AnyAttribute = string & {};

export type AuthUserAttributeKey = AuthStandardAttributeKey | AnyAttribute;

export enum DeliveryMedium {
  /** Code was sent via email. */
  EMAIL = 'EMAIL',
  /** Code was sent via text message SMS. */
  SMS = 'SMS',
  /**Code was sent to your phone */
  PHONE = 'PHONE',
  /** Code was sent via some other method not listed here. */
  UNKNOWN = 'UNKNOWN',
}

export type ResultValue<T> = { value: T };

export type ResultError = { error: AuthError };

export type Result<T> = ResultValue<T> | ResultError;

export interface AuthSession {
  isSignedIn: boolean;
}

export interface AuthDevice {
  deviceId: string;
  deviceName: string;
}
