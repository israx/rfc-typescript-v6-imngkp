type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;

export type httpStatusSuccessful =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;
export type httpStatusClientError =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;
export type httpStatusServerError =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export type APIResponse<T extends unknown = unknown> = {
  httpStatusCode: httpStatusSuccessful;
  body: T;
  headers: Record<string, string>;
};

export class HTTPError extends Error {
  httpStatusCode: httpStatusClientError | httpStatusServerError;
  body: unknown;
  headers: Record<string, string>;
  constructor({
    name,
    message,
    code,
    headers,
    body,
  }: {
    name?: string;
    message?: string;
    code: httpStatusClientError | httpStatusServerError;
    headers: Record<string, string>;
    body: unknown;
  }) {
    super();
    if (name) {
      this.name = name;
    }
    if (message) {
      this.message = message;
    }
    this.httpStatusCode = code;
    this.headers = headers;
    this.body = body;
  }
}

export class NetworkError extends Error {
  name = 'Network error';
  constructor() {
    super();
  }
}

export class BlockedError extends Error {
  name = 'Network error';
  constructor() {
    super();
  }
}

export class CancelledError extends Error {
  name = 'Request cancelled';
  constructor() {
    super();
  }
}

export type FetchOptions = {
  signerServiceInfo?: string;
  timeout?: number;
};

export type GetFetchOptions =
  | {
      headers: Record<string, string>;
    }
  | FetchOptions;

export type JSONArray = Array<JSONValue>;

export type JSONObject = {
  [x: string]: JSONValue;
};
export type JSONValue =
  | boolean
  | number
  | null
  | string
  | JSONArray
  | JSONObject;

export type UpdateOptionsJSON<BodyType extends JSONValue = JSONValue> =
  | FetchOptions
  | {
      body: BodyType;
      headers: {
        'Content-type': 'application/json';
        [x: string]: string;
      };
    };

export type UpdateOptionsString<BodyType extends string = string> =
  | FetchOptions
  | {
      body: BodyType;
      headers: {
        'Content-type': 'text/plain';
        [x: string]: string;
      };
    };

export type APIParam = {
  apiName: string;
  path: string;
} & AuthMode;

export type Location = {
  line: number;
  column: number;
};

export type GraphQLError = {
  message: string;
  path: Array<string>;
  locations: Array<Location>;
  extensions?: { [key: string]: string };
}; // this will be from `graphql` package only the type

export type RawGraphqlResult<T> = {
  data?: T;
  errors?: Array<GraphQLError>;
  extensions?: { [key: string]: unknown };
};

export type GraphqlResult<T> = T extends {} ? T : any;

export type Observable<T = object> = {
  on: (observer: Observer<T>) => {
    unsubscribe: () => void;
  };
};

export type Observer<T = object> = {
  next?: (data: T) => void;
  error?: (err: Error) => void;
  done?: () => void;
};

export type CANCEL_STATUS = 'CANCELLED' | 'ALREADY_RESOLVED';

/** HTTP GET METHOD */
export declare function get<ResponseBody extends unknown>(
  params: APIParam,
  init?: GetFetchOptions
): Promise<APIResponse<ResponseBody>>;
/** HTTP HEAD METHOD */
export declare function head<ResponseBody extends unknown>(
  params: APIParam,
  init?: GetFetchOptions
): Promise<APIResponse<ResponseBody>>;
/** HTTP DELETE METHOD */
export declare function del<ResponseBody extends unknown>(
  params: APIParam,
  init?: GetFetchOptions
): Promise<APIResponse<ResponseBody>>;
/** HTTP OPTIONS METHOD */
export declare function options<ResponseBody extends unknown>(
  params: APIParam,
  init?: GetFetchOptions
): Promise<APIResponse<ResponseBody>>;

/** HTTP PUT METHOD */
export declare function put<
  RequestBody extends JSONValue = JSONValue,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsJSON<RequestBody>
): Promise<APIResponse<ResponseBody>>;
export declare function put<
  RequestBody extends string = string,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsString<RequestBody>
): Promise<APIResponse<ResponseBody>>;

/** HTTP POST METHOD */
export declare function post<
  RequestBody extends JSONValue = JSONValue,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsJSON<RequestBody>
): Promise<APIResponse<ResponseBody>>;
export declare function post<
  RequestBody extends string = string,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsString<RequestBody>
): Promise<APIResponse<ResponseBody>>;

/** HTTP PATCH METHOD */
export declare function patch<
  RequestBody extends JSONValue = JSONValue,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsJSON<RequestBody>
): Promise<APIResponse<ResponseBody>>;
export declare function patch<
  RequestBody extends string = string,
  ResponseBody extends unknown = unknown
>(
  params: APIParam,
  init: UpdateOptionsString<RequestBody>
): Promise<APIResponse<ResponseBody>>;

/** Cancel HTTP Request */
export declare function cancel(request: Promise<unknown>): CANCEL_STATUS;

/** GraphQL utility types */

// export type GraphQLData = {
//   variables?: JSONObject;
//   result: JSONObject;
// };

export type SimpleAuthMode = {
  authMode?: 'AMAZON_COGNITO_USERPOOLS' | 'API_KEY' | 'AWS_IAM';
};

export type LambdaAuthMode = {
  authMode: 'AWS_LAMBDA';
  authToken: string;
};

export type AuthMode = StrictUnion<SimpleAuthMode | LambdaAuthMode>;

/** GraphQL query */

export type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

// export type GraphqlQueryParams<T extends string, S extends {}> = {
//   input?: T extends GeneratedQuery<infer IN, infer OUT> ? IN : S;
// } & AuthMode;

export type GraphqlQueryOverrides<IN, OUT> = {
  variables: IN;
  result: OUT;
};

export type GraphqlQueryParams<T extends string, S> = (T extends GeneratedQuery<
  infer IN,
  infer OUT
>
  ? IN
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? IN
  : any) &
  AuthMode;

export type GraphqlQueryResult<T extends string, S> = T extends GeneratedQuery<
  infer IN,
  infer OUT
>
  ? GraphqlResult<OUT>
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? GraphqlResult<OUT>
  : any;

export declare function query<S = never, T extends string = string>(
  document: T,
  queryParams: GraphqlQueryParams<T, S>
): Promise<GraphqlQueryResult<T, S>>;

/** GraphQL mutate */

export type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export type GraphqlMutationParams<
  T extends string,
  S
> = (T extends GeneratedMutation<infer IN, infer OUT>
  ? IN
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? IN
  : any) &
  AuthMode;

export type GraphqlMutationResult<
  T extends string,
  S
> = T extends GeneratedMutation<infer IN, infer OUT>
  ? GraphqlResult<OUT>
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? GraphqlResult<OUT>
  : any;

export declare function mutate<S = never, T extends string = string>(
  document: T,
  queryParams: GraphqlMutationParams<T, S>
): Promise<GraphqlMutationResult<T, S>>;

/** GraphQL subscribe */

export type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export type GraphqlSubscriptionParams<
  T extends string,
  S
> = (T extends GeneratedSubscription<infer IN, infer OUT>
  ? IN
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? IN
  : any) &
  AuthMode;

export type GraphqlSubscriptionResult<
  T extends string,
  S
> = T extends GeneratedSubscription<infer IN, infer OUT>
  ? OUT
  : S extends GraphqlQueryOverrides<infer IN, infer OUT>
  ? OUT
  : any;

export declare function subscribe<S = never, T extends string = string>(
  document: T,
  queryParams?: GraphqlSubscriptionParams<T, S>
): Observable<GraphqlSubscriptionResult<T, S>>;
