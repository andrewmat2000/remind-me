<script lang="ts">
  import L from "leaflet";
  import type { Person } from "$lib/stores/people-store";
  import Location from "./Location.svelte";

  export let map: L.Map;
  export let person: Person;
</script>

{#each person.locations as location}
  <Location position={location.position} {map}></Location>
{/each}
