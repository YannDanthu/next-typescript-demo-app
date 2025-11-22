import type { Todo } from "@/app/actions";
import { EventEmitter } from "node:stream";

export const emitter = new EventEmitter();

type Event = 
  | { type: "add"; todo: Todo }
  | { type: "delete" | "toggle"; todoId: number };

// Notify about changes
export function notifyChange(change: Event) {
  console.log("[sse] notifyChange ", change);
  emitter.emit("change", change);
}
