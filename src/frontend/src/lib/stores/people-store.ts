import { get, writable } from "svelte/store";
import type { Relation } from "./relation-store";
import type { Location } from "./location-store";

export interface Interest {
  type: string;
  description: string;
}

export interface Person {
  id: number;
  firstName?: string;
  lastName?: string;
  surName?: string;
  birthday?: Date;
  phoneNumber?: string;
  description?: string;
  locations: Location[];
  relations: Relation[];
  interests: Interest[];
}

function createPeopleStore() {
  const P = writable<Person[]>([]);
  const { subscribe, set, update } = P;

  function add(person: Person) {
    console.log(get(P));

    console.log(person);
    update((x) => {
      x.push(person);
      return x;
    });
  }

  function createEmpty(): Person {
    const array = get(P);

    const id = array.length > 0 ? array[array.length - 1].id + 1 : 0;

    return {
      id: id,
      interests: [],
      locations: [],
      relations: [],
    };
  }

  function edit(func: () => Person) {
    const person = func();

    const array = get(P);

    const index = array.findIndex((x) => x.id == person.id);

    if (index == -1) {
      add(person);

      return;
    }

    array[index] = person;

    set(array);
  }

  return {
    add,
    edit,
    subscribe,
    createEmpty,
  };
}

export const peopleStore = createPeopleStore();
