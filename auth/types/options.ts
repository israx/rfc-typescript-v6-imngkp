import { AuthUserAttribute, AuthUserAttributeKey } from './models';

export type AuthServiceOptions = any;

export type AuthSignUpOptions<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributes: AuthUserAttribute<UserAttributeKey>;
  serviceOptions?: ServiceOptions;
};

export type SignInWithWebUIOptions<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  customState?: string;
  serviceOptions?: ServiceOptions;
};
