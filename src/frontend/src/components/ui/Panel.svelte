<script lang="ts">
  import L from "leaflet";
  import { peopleStore } from "$lib/stores/people-store";
  import { createEventDispatcher } from "svelte";
  import type { Location } from "$lib/stores/location-store";
  import type { Relation } from "$lib/stores/relation-store";
  import type { Person } from "$lib/stores/people-store";
  import { _ } from "svelte-i18n";

  const locationType = {
    description: "",
    name: "",
  };

  const location: any = {
    position: L.latLng(0, 0),
    type: locationType,
    description: "",
  };

  const relation: any = {
    color: "",
    type: "",
    importance: 0,
  };

  const person: any = {
    firstName: "",
    lastName: "",
    surName: "",
    phoneNumber: "",
    birthday: new Date(),
    description: "",
    id: 0,
    interests: [],
    locations: [],
    relations: [],
  };

  let showPanel = true;

  let creationMode: {
    type: "none" | "person" | "location" | "location-type" | "relation";
    object: any;
  } = { type: "none", object: {} };

  function setPerson(e: Event) {
    const select = e.target as HTMLSelectElement;

    const index = select.selectedIndex ?? 0;

    creationMode.object = $peopleStore.find(
      (x) => x.id == Number(select.options[index].value)
    );
  }

  function setProperty(key: string, e: Event) {
    creationMode.object[key] = (e.target as HTMLInputElement).value;
  }

  function save() {
    if (creationMode.type == "person") {
      const person = creationMode.object as Person;
      person.id = peopleStore.createEmpty().id;

      dispatch("addPerson", { person: person });
    } else if (creationMode.type == "location") {
      dispatch("addLocation", { person: creationMode.object });
    }

    creationMode = { object: {}, type: "none" };
  }

  const dispatch = createEventDispatcher<{
    addPerson: { person: Person };
    addLocation: { person: Person };
  }>();
</script>

<div id="map-panel" class={`${showPanel ? "showed" : "collapsed"}`}>
  {#if showPanel}
    <div>
      <br />
      <br />
      <br />
      <hr />
      {#if creationMode.type == "none"}
        <h2>Управление</h2>
        <div>
          Добавить контакт
          <button
            on:click={() => (creationMode = { object: person, type: "person" })}
          >
            +
          </button>
        </div>
        <div>
          Добавить место
          <button
            on:click={() =>
              (creationMode = { type: "location", object: location })}>+</button
          >
        </div>
        <div>
          Добавить категорию места
          <button on:click={() => (creationMode.type = "none")}>+</button>
        </div>
        <div>
          Добавить категорию связи
          <button on:click={() => (creationMode.type = "none")}>+</button>
        </div>
        <hr />
        <h2>Фильтры</h2>
        <hr />
        <h2>Поиск</h2>
      {:else if creationMode.type == "person"}
        <!-- {#each Object.keys(showAdd == "location" ? location : showAdd == "location-type" ? locationType : showAdd == "person" ? person : showAdd == "relation" ? relation : {}) as key} -->
        {#each Object.keys(person) as key}
          <div class="object-creation-form">
            {#if key != "id"}
              <span>{$_(`object-creation-form-${key}`)}</span>
              {#if typeof person[key] == "string"}
                <input on:input={(e) => setProperty(key, e)} />
              {:else}
                <span>- - - - - - - </span>
              {/if}
            {/if}
          </div>
        {/each}
        <button on:click={save}>Сохранить</button>
        <button on:click={() => (creationMode = { object: {}, type: "none" })}>
          Назад
        </button>
      {:else if creationMode.type == "location"}
        <select on:change={(e) => setPerson(e)}>
          {#each $peopleStore as p}
            <option value={p.id}>
              {`${p.firstName ?? ""} ${p.lastName ?? "\b"} ${p.surName ?? "\b"}`}
            </option>
          {/each}
        </select>
        <button on:click={save}>Сохранить</button>
      {/if}
    </div>
  {/if}
  <button on:click={() => (showPanel = !showPanel)}>
    {showPanel ? "Скрыть" : "Показать"}
  </button>
</div>

<style lang="scss">
  #map-panel {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #eaeaea;
    z-index: 1;
    display: flex;
    flex-direction: column;

    button:last-child {
      margin-top: auto;
      width: 100%;
    }
    * {
      text-align: center;
    }
  }
  .showed {
    width: 250px;
  }
  .collapsed {
    // width: 350px;
  }
  .object-creation-form {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
</style>
