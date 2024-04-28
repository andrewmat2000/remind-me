<script lang="ts">
  import type { Person } from "$lib/stores/people-store";
  import L from "leaflet";
  import { onMount } from "svelte";

  export let person: Person;
  export let map: L.Map;
  export let position: L.LatLng;

  const circle = L.circle(position, {
    radius: 3,
  }).addTo(map);

  function generateContent() {
    function createElement<T extends "div" | "input" | "button">(
      type: T,
      content?: string
    ): T extends "div"
      ? HTMLDivElement
      : T extends "input"
        ? HTMLInputElement
        : T extends "button"
          ? HTMLButtonElement
          : never {
      const element = document.createElement(type);
      if (content != undefined) {
        element.innerHTML = content;
      }
      return element as any;
    }

    const mainDiv = createElement("div");

    mainDiv.classList.add("location-popup");

    const nameDiv = createElement("div");

    nameDiv.innerHTML = `<span>Имя: </span><span>${person.firstName ?? ""} ${person.surName ?? ""} ${person.lastName ?? ""}</span>`;
    mainDiv.appendChild(nameDiv);

    const typeDiv = createElement("div");

    typeDiv.innerHTML = "<span>Тип места: </span><span></span>";

    mainDiv.appendChild(typeDiv);

    const saveButton = createElement("button", "×");
    const removeButton = createElement("button", "✓");

    mainDiv.appendChild(saveButton);
    mainDiv.appendChild(removeButton);

    return mainDiv;
  }

  let dragging = false;

  function handleMouseDown(e: L.LeafletMouseEvent) {
    dragging = true;
    map.dragging.disable();
  }

  function handleMouseUp(e: L.LeafletMouseEvent) {
    if (dragging) {
      dragging = false;
      map.dragging.enable();
    }
  }

  function handleMouseMove(e: L.LeafletMouseEvent) {
    if (!dragging) {
      return;
    }

    circle.setLatLng(e.latlng);
  }

  const popup = L.popup({
    content: generateContent(),
  });

  circle.bindPopup(popup);

  onMount(() => {
    circle.openPopup();

    return () => {
      circle.remove();
    };
  });

  circle.addEventListener("mousedown", handleMouseDown);
  circle.addEventListener("mouseup", handleMouseUp);
  map.addEventListener("mousemove", handleMouseMove);
</script>

<style lang="scss">
  :global() {
    .location-popup > div {
      display: grid;
      grid-template-rows: 1fr 1fr;
    }
  }
</style>
