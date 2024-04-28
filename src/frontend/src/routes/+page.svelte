<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";
  import "leaflet/dist/leaflet.css";
  import Panel from "../components/ui/Panel.svelte";
  import Point from "../components/Person.svelte";
  import { peopleStore } from "$lib/stores/people-store";

  let map: L.Map;

  onMount(() => {
    map = L.map("map");
    L.tileLayer("http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}").addTo(
      map
    );
    map.setView([56.83056, 60.606783], 13);
    for (let div of document.getElementsByClassName(
      "leaflet-control-attribution"
    )) {
      (div as HTMLDivElement).style.display = "none";
    }
  });
</script>

{#each $peopleStore as person}
  <Point {person} {map}></Point>
{/each}

<Panel
  on:addClicked={() =>
    peopleStore.add({
      id: peopleStore.createEmpty().id,
      interest: [],
      locations: [
        {
          type: "init",
          position: map.getCenter(),
        },
      ],
      relations: [],
    })}
></Panel>
<div id="map"></div>
<div id="center-point"></div>

<style lang="scss">
  #map {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  #center-point {
    --width: 9px;
    border-radius: 100%;
    border: solid black 1px;
    z-index: 2;
    background-color: white;
    position: fixed;
    top: calc(50vh - (var(--width) / 2));
    bottom: calc(50vh - (var(--width) / 2));
    right: calc(50vw - (var(--width) / 2));
    left: calc(50vw - (var(--width) / 2));
  }
</style>
