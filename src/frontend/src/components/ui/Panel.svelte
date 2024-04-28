<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let show = true;

  const dispatch = createEventDispatcher<{ addClicked: void }>();
</script>

<div id="map-panel" class={`${show ? "showed" : "collapsed"}`}>
  {#if show}
    <div>
      <br />
      <br />
      <br />
      <h2>Упрвление</h2>
      <hr />
      <button on:click={() => dispatch("addClicked")}>+</button>
      <hr />
      <h2>Фильтры</h2>
      <hr />
      <h2>Поиск</h2>
    </div>
  {/if}
  <button on:click={() => (show = !show)}>
    {show ? "Скрыть" : "Показать"}
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
    width: 350px;
  }
  .collapsed {
    // width: 350px;
  }
</style>
