"use server";

import { notifyChange } from "./api/sse/emitter";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let _todos: Todo[] = [];

export async function fetchTodos() {
  return _todos;
}

export async function addTodo(formData: FormData) {
  const newTodo = {
    id: Date.now(),
    text: formData.get("text") as string,
    completed: false,
  };
  setTodos([..._todos, newTodo]);
  notifyChange({ type: 'add', todo: newTodo });
  console.log("added todo", _todos);
}

export async function deleteTodo(id: number) {
  setTodos(_todos.filter((todo) => todo.id !== id));
  notifyChange({ type: 'delete', todoId: id });
}

export async function toggleTodo(id: number) {
  setTodos(
    _todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
  notifyChange({ type: 'toggle', todoId: id });
}

function setTodos(todos: Todo[]) {
  _todos = todos;
}
