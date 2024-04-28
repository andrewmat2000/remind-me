<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";

  export let map: L.Map;
  export let position: L.LatLng;

  const circle = L.circle(position, {
    radius: 3,
  }).addTo(map);

  onMount(() => {
    return () => {
      circle.remove();
    };
  });
</script>
