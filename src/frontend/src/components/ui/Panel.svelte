<script lang="ts">
  import { peopleStore } from "$lib/stores/people-store";
  import { createEventDispatcher } from "svelte";
  import type { Location } from "$lib/stores/location-store";
  import type { Relation } from "$lib/stores/relation-store";
  import type { Person } from "$lib/stores/people-store";

  let showPanel = true;

  let showAdd: "none" | "person" | "location" | "location-type" | "relation" =
    "none";

  const dispatch = createEventDispatcher<{ addClicked: void }>();
</script>

<div id="map-panel" class={`${showPanel ? "showed" : "collapsed"}`}>
  {#if showPanel}
    <div>
      <br />
      <br />
      <br />
      <hr />
      {#if showAdd == "none"}
        <h2>Управление</h2>
        <div>
          Добавить контакт
          <button on:click={() => showAdd = "person"}>+</button>
        </div>
        <div>
          Добавить место
          <button on:click={() => showAdd = "person"} disabled={$peopleStore.length <= 0}>+</button>
        </div>
        <div>
          Добавить категорию места
          <button on:click={() => showAdd = "person"}>+</button>
        </div>
        <div>
          Добавить категорию связи
          <button on:click={() => showAdd = "person"}>+</button>
        </div>
        <hr />
        <h2>Фильтры</h2>
        <hr />
        <h2>Поиск</h2>
      {:else}
        {#each Object.keys(Location) as key}
          <span>
            
          </span>
        {/each}
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
</style>
