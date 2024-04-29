import { writable } from "svelte/store";

export interface LocationType {
  name: string;
  description: string;
}

export interface Location {
  type: LocationType;
  position: L.LatLng;
  description?: string;
}

function createLocationStore() {
  const P = writable<Location[]>();
  const { subscribe } = P;

  function add(location: Location) {
    
  }

  return {
    add,
    subscribe,
  };
}

export const locationStore = createLocationStore();
