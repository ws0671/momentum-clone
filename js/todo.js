const todoForm =document.getElementById("todo-form")
const todoInput = document.querySelector("#todo-form input")
const todoList = document.getElementById("todo-list")

const TODOS_KEY = "todos"

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

function deleteTodo(e){
  const li = e.target.parentElement;
  li.remove();
  todos = todos.filter(todo => todo.id !== parseInt(li.id))
  saveTodos()
}

function paintTodo(newTodo){
  const li = document.createElement("li")
  li.id = newTodo.id
  const span = document.createElement("span")
  span.innerText = newTodo.text
  const button = document.createElement("button")
  button.innerText = "X"
  button.addEventListener("click", deleteTodo)
  li.appendChild(span)
  li.appendChild(button)
  todoList.appendChild(li)
}

function TodoSubmit(e){
  e.preventDefault()
  const newTodo = todoInput.value
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }
  todos.push(newTodoObj)
  paintTodo(newTodoObj)
  saveTodos()
}

todoForm.addEventListener("submit", TodoSubmit)

const savedTodos = localStorage.getItem(TODOS_KEY)

if(savedTodos){
  const parsedTodos = JSON.parse(savedTodos)
  todos = parsedTodos
  parsedTodos.forEach(paintTodo)
}