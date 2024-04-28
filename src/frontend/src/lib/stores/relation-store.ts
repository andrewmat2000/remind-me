import { writable } from "svelte/store";

export interface Relation {
  type: string;
  color: string;
  importance: number;
}

function createRelationStore() {
  const P = writable<Relation[]>();
  const { subscribe } = P;

  return {
    subscribe,
  };
}

export const relationStore = createRelationStore();
