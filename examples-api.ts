import * as API from './api';
import {
  CreateTodoInput,
  createTodo,
  onCreateTodo,
  updateTodo,
  listTodos,
} from './api/mock-types';

/*
EXAMPLE: First param is an object with named parameters
*/
const getUnknownResponse = async () => {
  const result = await API.get(
    {
      apiName: 'MyApi',
      path: '/items',
      authMode: 'AWS_IAM',
    },
    {
      headers: {
        'custom-header': 'x',
      },
    }
  );
};

/*
EXAMPLE: Adding TypeScript generics to request body and response
*/
type MyApiResponse = { firstName: string; lastName: string };

const getCustomResponse = async () => {
  const result = await API.get<MyApiResponse>({
    apiName: 'MyApi',
    path: '/getName',
  });

  console.log(`The name is ${result.body.firstName} ${result.body.lastName}`);
};

const putCustomRequest = async () => {
  const result = await API.put<string, { data: Array<number> }>(
    {
      apiName: '',
      path: '/',
      authMode: 'API_KEY',
    },
    {
      headers: {
        'Content-type': 'text/plain',
      },
      body: 'this is my content',
    }
  );

  result.body.data.forEach((value) => console.log(value));
};

/*
EXAMPLE: Introduce dedicated, type-safe `query()`, `mutation()`, and `subscription()` GraphQL operation APIs
*/
type MyQueryType = {
  variables: {
    filter: {
      id: number;
    };
  };
  result: {
    listTodos: {
      items: {
        id: number;
        name: string;
        description: string;
      }[];
    };
  };
};

const queryGraphQL = async () => {
  const result = await API.query<MyQueryType>('query lisTodos...', {
    filter: { id: 123 },
  });

  console.log(`Todo : ${result.listTodos[0].name})`);
};

type MyMutationType = {
  variables: {
    input: {
      id: number;
      name: string;
      description: string;
    };
  };
  result: {
    createTodo: {
      id: number;
      name: string;
      description: string;
    };
  };
};

const mutateGraphQL = async () => {
  const result = await API.mutate<MyMutationType>('mutation createTodo....', {
    input: {
      id: 123,
      name: 'My Todo',
      description: 'This is a todo',
    },
  });

  console.log(`Todo : ${result.createTodo.description})`);
};

type MySubscriptionType = {
  variables: {
    filter: {
      name: {
        eq: string;
      };
    };
  };
  result: {
    createTodo: {
      id: number;
      name: string;
      description: string;
    };
  };
};

API.subscribe<MySubscriptionType>('subscription OnCreateTodo...', {
  filter: {
    name: { eq: 'awesome things' },
  },
}).on({
  next: (result) => console.log(`Todo info: ${result.createTodo.name})`),
});

/*
EXAMPLE: Less verbose type definitions for generated queries, mutations, and subscriptions
*/

const listTodosQuery = async () => {
  const res = await API.query(listTodos, {
    filter: {
      description: { contains: 'spellling mis-steaks' },
    },
  });

  console.log(res.listTodos.items);
};

const createTodoMutation = async () => {
  const createInput: CreateTodoInput = {
    name: 'Improve API TS support ',
  };

  const res = await API.mutate(createTodo, {
    input: createInput,
  });

  // The returned data is the result of the request. If there are more than one queries/mutations in a request,
  // then the return value stays the same as v5. i.e. res.createTodo.data
  const newTodo = res.createTodo;
};

const subscribeToCreate = async () => {
  const sub = API.subscribe(onCreateTodo, {
    filter: {
      name: { contains: 'cool things' },
    },
  }).on({
    // Return value shortened from `value?.data?.onCreateTodo`.
    // For generated queries, this could conceivably be further shortened.
    next: (message) => {
      console.log(message.onCreateTodo.name);
    },
  });
};

/*
EXAMPLE: Proposed behavior for multiple queries/mutations in the response
*/
type MyMultiQueryType = {
  variables: {
    input: {
      todoId: string;
      fooId: string;
    };
  };
  result: {
    getTodo: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    getFoo: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

const multiGraphQL = async () => {
  const result = await API.query<MyMultiQueryType>(
    'query getTodo + getFoo ....',
    {
      input: {
        todoId: 'abc',
        fooId: 'xyz',
      },
    }
  );

  console.log(`Todo : ${result.getTodo.name})`);
  console.log(`Foo : ${result.getFoo.name})`);
};

/*
EXAMPLE: Type safety for GraphQL query, mutation, subscription inputs
*/
const createInput: CreateTodoInput = {
  name: 'todoName',
  description: 'My task',
};

const mutateTodo = async () => {
  const res = await API.mutate(updateTodo, {
    // @ts-expect-error
    input: createInput, // `input` must be of type `UpdateTodoInput`
  });
};

/*
EXAMPLE: Type narrowing on runtime errors
*/
const getResponseWithErrors = async () => {
  try {
    await API.get({
      apiName: 'myApi',
      path: '/',
    });
  } catch (err: unknown) {
    if (err instanceof API.NetworkError) {
      // Consider retrying
    } else if (err instanceof API.HTTPError) {
      // Check request parameters for mistakes
    } else if (err instanceof API.CancelledError) {
      // Request was cancelled
    } else if (err instanceof API.BlockedError) {
      // CORS related error
    } else {
      // Other error
    }
  }
};
