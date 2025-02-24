// Create a global store for the app.
const store = new Store(reducer);

// Mettre à jour l'interface utilisateur lorsqu'il y a un changement d'état
const todoList = document.getElementById("todo-list");
store.subscribe(() => {
  console.log("update view.");

  todoList.innerHTML = "";
  for ({ id, name, completed } of store.getState().todos) {
    const listItem = document.createElement("li");
    const status = completed ? "completed" : "";
    listItem.innerHTML = `
            <span class="${status}">${name}</span>
            <div>
                <button class="complete" data-id="${id}">✔</button>
                <button class="delete" data-id="${id}">✖</button>
            </div>
        `;
    todoList.appendChild(listItem);
  }
});

// Selectors
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");

// Event Listeners
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  store.dispatch(addTodoAction(todoInput.value));
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete")) {
    store.dispatch(completeTodoAction(event.target.dataset.id));
  }
  if (event.target.classList.contains("delete")) {
    store.dispatch(deleteTodoAction(event.target.dataset.id));
  }
});
