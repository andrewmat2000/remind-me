import { writable } from "svelte/store";

export interface Location {
  type: string;
  position: L.LatLng;
  description?: string;
}

function createLocationStore() {
  const P = writable<Location[]>();
  const { subscribe } = P;

  return {
    subscribe,
  };
}

export const locationStore = createLocationStore();
