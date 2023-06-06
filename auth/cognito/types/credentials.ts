export type AWSCognitoAuthSession = {
  isSignedIn: boolean;
  pluginData: {
    awsCredentials?: AWSCredentials;
    identityId?: string;
    userPoolTokens?: AWSCognitoUserPoolTokens;
    userSub?: string;
  };
};

export type AWSCognitoUserPoolTokens = {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  expiration: Date;
};

export type AWSCredentials = {
  accessKeyId: string;
  secretKey: string;
  sessionToken: string;
  expiration: Date;
};
