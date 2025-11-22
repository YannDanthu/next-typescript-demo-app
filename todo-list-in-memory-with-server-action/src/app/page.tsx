
import styles from './page.module.css'
import { addTodo, fetchTodos } from './actions';
import Todos from './todos';
import { Suspense } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const todos = fetchTodos();

  console.log("Home component start.");
  return (
    <main className={styles.main}>
      <div className={styles.todoContainer}>
      <form action={addTodo} className={styles.inputGroup}>
          <input
            type="text"
            name="text"
            placeholder="Enter a todo"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Add Todo
          </button>
        </form>

        <Suspense fallback={<div>Loading...</div>}>
          <Todos todos={todos} />
        </Suspense>
      </div>
    </main>
  );
}