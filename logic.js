// app state contains an array of the todos to be displayed.
// schema of a todo is { id, name, completed }

// Here is a simple implementation of ngrx (to create a an app in the style of redux).
class Store {
  constructor(reducer, initialState = { todos: [] }) {
    this.state = initialState;
    this.reducer = reducer;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action); // update the state.
    this.listeners.forEach((listener) => listener()); // notifie les listeners pour mettre à jour la vue.
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener); // méthode pour désinscrire un listener.
    };
  }
}

// Actions
const addTodoAction = (name) => ({
  type: "ADD_TODO",
  payload: { name },
});
const deleteTodoAction = (id) => ({
  type: "DELETE_TODO",
  payload: { id },
});
const completeTodoAction = (id) => ({
  type: "COMPLETE_TODO",
  payload: { id },
});

// Reduceur (met à jour l'état de l'application)
function reducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "ADD_TODO":
      console.log("[reducer] add todo action");
      return addTodo(state, action.payload.name);
    case "DELETE_TODO":
      console.log("[reducer] delete todo action");
      return deleteTodo(state, action.payload.id);
    case "COMPLETE_TODO":
      console.log("[reducer] complete todo action");
      return completeTodo(state, action.payload.id);
    default:
      console.log("[redcuer] default");
      return state;
  }
}

// Implémentation de la logique.
function addTodo(state, name) {
  return {
    ...state,
    todos: [
      ...state.todos,
      { id: crypto.randomUUID(), name, completed: false },
    ],
  };
}

function deleteTodo(state, id) {
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  };
}

function completeTodo(state, id) {
  return {
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }),
  };
}
