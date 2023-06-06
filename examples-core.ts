import { Hub, Amplify, AuthConfig } from './core';
import { AuthError } from './auth';

/*
EXAMPLE: TypeScript support for Amplify Hub channels
*/
Hub.dispatch('auth', {
  event: 'signUpFailure',
  data: new AuthError('Sign-up failed'),
});

// Events and payload data are not inferred.
Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signUpFailure':
      const data = payload.data;
      break;
  }
});

/*
EXAMPLE: TypeScript support for custom Hub channels
*/
type CustomEventData =
  | { event: 'A'; data: number }
  | { event: 'B'; data: string }
  | { event: 'C' }
  | { event: 'D'; data: object };

type CustomChannelMap = {
  channel: 'custom_channel';
  eventData: CustomEventData;
};

Hub.dispatch<CustomChannelMap>('custom_channel', { event: 'A', data: 1 });

Hub.listen<CustomChannelMap>('custom_channel', ({ payload }) => {
  switch (payload.event) {
    case 'A':
      payload.data;
      break;
    case 'B':
      payload.data;
      break;
    case 'C':
      // Type C doesn't have any associated event data
      // @ts-expect-error
      data = payload.data;
      break;
    case 'D':
      payload.data;
      break;
  }
});

/*
EXAMPLE: TypeScript support for Amplify Configuration
*/
const authConfig: AuthConfig = {
  userPoolId: 'us-east-1_0yqxxHm5q',
  userPoolClientId: '3keodiqtm52nhh2ls0vQfs5v1q',
  signUpVerificationMethod: 'code',
};

Amplify.configure({
  Auth: authConfig,
});
