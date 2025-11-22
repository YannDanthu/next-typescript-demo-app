"use client";

import {
  type MutableRefObject,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./page.module.css";
import { deleteTodo, fetchTodos, toggleTodo, type Todo } from "./actions";

function useEventSource(url: string, onMessage: (event: MessageEvent) => void) {
  const eventSourceRef = useRef<EventSource>();

  console.log("useEventSource", url);

  useEffect(() => {
    console.log("useEffect", url, onMessage);

    function connect() {
      console.log("connecting sse eventSource", url, onMessage);
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        console.log("[sse] onmessage:", event);
        onMessage(event);
      };

      eventSource.onerror = (error) => {
        console.error("[sse] onerror:", error);
        eventSource.close();
        setTimeout(connect, 1000);
      };

      eventSourceRef.current = eventSource;
    }

    connect();

    return () => {
      console.log("closing eventSource");
      eventSourceRef.current?.close();
    };
  }, [url, onMessage]);

  return eventSourceRef.current;
}

export default function Todos({
  todos: initialTodos,
}: {
  todos: Promise<Todo[]>;
}) {
  const _todos = use(initialTodos);
  console.log("Todos component start", initialTodos, _todos);
  const [todos, setTodos] = useState(_todos);

  // Fixed version using useCallback
  const onMessage = useCallback((event: MessageEvent) => {
    console.log("[sse] event", event);
    fetchTodos().then((newTodos) => setTodos(newTodos));
  }, []); // Empty deps array since callback doesn't depend on props/state

  // Call the hook directly - connection is managed internally
  useEventSource("/api/sse", onMessage);

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleToggleComplete = (id: number) => {
    toggleTodo(id);
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          <div className={styles.todoContent}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              className={styles.checkbox}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
