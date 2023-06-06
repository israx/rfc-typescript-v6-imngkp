import { AuthUserAttribute } from '../../types/models';
import {
  AuthFlowType,
  ClientMetadata,
  CognitoUserAttributeKey,
  ValidationData,
} from './models';

export type AutoSignInOptions = {
  enabled: CognitoSignInOptions;
};

export type CognitoConfirmResetPasswordOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoConfirmSignInOptions = {
  userAttributes?: AuthUserAttribute<CognitoUserAttributeKey>[];
  clientMetadata?: ClientMetadata;
};

export type CognitoConfirmSignUpOptions = {
  clientMetadata?: ClientMetadata;
  forceAliasCreation?: boolean;
};

export type CognitoResendSignUpCodeOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoResendUserAttributeConfirmationCodeOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoResetPasswordOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoSignInOptions = {
  authFlowType: AuthFlowType;
  clientMetaData?: ClientMetadata;
};

export type CognitoSignUpOptions = {
  validationData?: ValidationData;
  clientMetadata?: ClientMetadata;
  autoSignIn?: AutoSignInOptions;
};

export type CognitoUpdatePasswordOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoUpdateUserAttributeOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoUpdateUserAttributesOptions = {
  clientMetadata?: ClientMetadata;
};

export type CognitoSignInWithWebUIOptions = {
  /**
   * Android-only: The browser package name (application ID) to use to launch
   * the custom tab.
   */
  browserPackage?: string;

  /**
   *
   * iOS-only: Starts the webUI signin in a private browser session, if supported by the current browser.
   * Note that this value internally sets `prefersEphemeralWebBrowserSession` in ASWebAuthenticationSession.
   *
   *  As per Apple documentation, Whether the request is honored depends on the user’s default web browser.
   *
   * Safari always honors the request.
   */
  privateSession?: boolean;
};

export type FederateToIdentityPoolOptions = {
  developerProvidedIdentityId: string;
};
