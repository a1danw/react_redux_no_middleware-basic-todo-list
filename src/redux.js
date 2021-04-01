import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [
    {
      id: uuidv4(),
      name: "Go to the gym",
      complete: false,
    },
    {
      id: uuidv4(),
      name: "Do the laundry",
      complete: false,
    },
  ],
};

export const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);

// we can destructure the type and payload if you dont want to write action.payload and action.type
function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    // if its complete it will make it incomplete - toggle
    case "TOGGLE_TODO":
      return {
        ...state,
        // find todo which has the same id that was passed in the payload and change that todo
        todos: state.todos.map((todo) =>
          todo.id === payload ? { ...todo, complete: !todo.complete } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        //removes elements that meet the condition - if it does equal it gets removed
        // if it is equal to payload.id that item will be removed
        todos: state.todos.filter((todo) => todo.id !== payload),
      };

    default:
      return state;
  }
}

// when this type is received in the reducer it adds the payload in to the array for each case
export const addTodoAction = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const toggleTodoAction = (todoId) => ({
  type: "TOGGLE_TODO",
  payload: todoId,
});

export const deleteTodoAction = (todoId) => ({
  type: "DELETE_TODO",
  payload: todoId,
});
