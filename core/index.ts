import { AuthError } from '../auth';

export type AuthSignInResult = {}
export type AuthSignUpResult = {}

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

export type AmplifyConfigure = {
  Auth?: AuthConfig;
  Storage?: StorageConfig;
  API?: APIConfig;
};

export type StorageConfig = {
  bucket: string;
  region: string; // or scope it down to actual regions
};

export type APIConfig = {};
export type AuthConfig = StrictUnion<
  UserPoolConfig | IdentityPoolConfig | UserPoolAndIdentityPoolConfig
>;

export type UserPoolConfig = {
  userPoolId: string;
  userPoolClientId: string;
  signUpVerificationMethod?: "code" | "link";
  oauth?: {
    domain: string;
    scope: UserPoolScopes;
    redirectSignIn: string;
    redirectSignOut: string;
    responseType: "code" | "token";
  };
};

export type UserPoolScope =
  | "phone"
  | "email"
  | "profile"
  | "openid"
  | "aws.cognito.signin.user.admin";
export type UserPoolScopes = UserPoolScope[];

export type IdentityPoolConfig = {
  identityPoolId: string;
};

export type UserPoolAndIdentityPoolConfig = UserPoolConfig & IdentityPoolConfig;

export type AmplifyChannel =
  | "auth"
  | "storage"
  | "core"
  | "api"
  | "analytics"
  | "interactions"
  | "pubsub"
  | "datastore";

export type AmplifyEventDataMap = { event: string; data?: unknown };

export type AuthHubEventData =
  | { event: "signIn"; data: AuthSignInResult }
  | { event: "signUp"; data: AuthSignUpResult }
  | { event: "signUpFailure"; data: AuthError };

export type HubCapsule<
  Channel extends string | RegExp,
  EventDataMap extends AmplifyEventDataMap
> = {
  channel: Channel;
  payload: HubPayload<EventDataMap>;
  source: string;
  patternInfo?: string[];
};

export type HubCallback<
  Channel extends string | RegExp,
  EventData extends AmplifyEventDataMap = AmplifyEventDataMap
> = (capsule: HubCapsule<Channel, EventData>) => void;

export type HubPayload<
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = EventDataMap & {
  message?: string;
};

export type AmplifyHubCallbackMap<Channel extends AmplifyChannel> = {
  auth: HubCallback<Channel, AuthHubEventData>;
  storage: HubCallback<Channel>;
  core: HubCallback<Channel>;
  analytics: HubCallback<Channel>;
  api: HubCallback<Channel>;
  interactions: HubCallback<Channel>;
  pubsub: HubCallback<Channel>;
  datastore: HubCallback<Channel>;
};

export type GetHubCallBack<
  Channel extends string | RegExp,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = Channel extends AmplifyChannel
  ? AmplifyHubCallbackMap<Channel>[Channel]
  : HubCallback<Channel, EventDataMap>;

export type AnyChannel = string & {};

export type PayloadFromCallback<T> = T extends (
  arg: infer A extends Record<string, any>
) => void
  ? A["payload"]
  : never;

export type AmplifyChannelMap<
  Channel extends AmplifyChannel | AnyChannel = AmplifyChannel | AnyChannel,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = {
  channel: Channel | RegExp;
  eventData: EventDataMap;
};

// Hub
declare class HubClass {
  listen<
    ChannelMap extends AmplifyChannelMap,
    Channel extends ChannelMap["channel"] = ChannelMap["channel"]
  >(
    channel: Channel,
    callback: GetHubCallBack<Channel, ChannelMap["eventData"]>,
    listenerName?: string
  ): void;

  dispatch<
    ChannelMap extends AmplifyChannelMap,
    Channel extends ChannelMap["channel"] = ChannelMap["channel"]
  >(
    channel: Channel,
    payload: PayloadFromCallback<
      GetHubCallBack<Channel, ChannelMap["eventData"]>
    >,
    source?: string,
    ampSymbol?: Symbol
  ): void;
}

export const Hub = new HubClass();

// Amplify
declare class AmplifyClass {
  configure<AmplifyConf extends AmplifyConfigure>(
    config: AmplifyConfigure
  ): void;
}

export const Amplify = new AmplifyClass();
