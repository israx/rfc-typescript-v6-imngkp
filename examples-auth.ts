import * as Auth from './auth';

/*
EXAMPLE: TypeScript support for user attributes
*/
const signUp = async () => {
  const result = await Auth.signUp({
    username: 'username',
    password: '********',
    options: {
      userAttributes: {
        email: 'email@domain.com',
      },
    },
  });
};

/*
EXAMPLE: Predictable API responses
*/
const confirmSignUp = async () => {
  const resp = await Auth.confirmSignUp({
    username: 'username',
    confirmationCode: '112233',
  });

  if (resp.isSignUpComplete) {
    // Show login component
  }
};
