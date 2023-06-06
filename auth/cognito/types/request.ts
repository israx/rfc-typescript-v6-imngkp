import { AuthProvider } from '../../types/models';
import { FederateToIdentityPoolOptions } from './options';

export type FederateToIdentityPoolRequest = {
  providerToken: string;
  authProvider: AuthProvider;
  options?: FederateToIdentityPoolOptions;
};
