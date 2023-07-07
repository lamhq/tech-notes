# Extracting state logic into a reducer 

## Introduction

Components with many state updates spread across many event handlers can get overwhelming.

To reduce the complexity of updating state in several places and keep all your logic in one easy-to-access place, you can move that state logic into a single function outside your component, called a “reducer”.


## reducer function 

A reducer is a function that consolidate all the state update logic.

A reducer function is where you will put your state logic. It takes two arguments, the current state and the action object, and it returns the next state.

Keep these two tips in mind when writing reducers:
- Reducers must be pure. 
- Each action describes a single user interaction, even if that leads to multiple changes in the data.

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

We recommend wrapping each case block into the `{` and `}` curly braces so that variables declared inside of different cases don’t clash with each other.

Also, a `case` should usually end with a `return`.


## action

An action object can have any shape.

By convention, it is common to give it a string `type` that describes what happened, and pass any additional information in other fields.

```js
dispatch({
  // specific to component
  type: 'what_happened',
  // other fields go here
});
```


## Example code

```jsx
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
```


## Pros and cons of `useReducer` vs `useState`

### Pros

- **Code size**: can help cut down on the code **if many event handlers modify state in a similar way**.
- **Readability**: `useReducer` lets you cleanly separate the **how of update logic** from the **what happened** of event handlers.
- **Debugging**: you can add a console log into your reducer to see every state update, and why it happened.
- **Testing**: you can export and test reducer separately in isolation

### Cons

- **Code size**: you have to write both a reducer function and dispatch actions.

We recommend using a reducer if you often encounter bugs due to incorrect state updates in some component, and want to introduce more structure to its code.