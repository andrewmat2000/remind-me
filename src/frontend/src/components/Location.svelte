<script lang="ts">
  import type { Person } from "$lib/stores/people-store";
  import type { Location } from "$lib/stores/location-store";
  import L from "leaflet";
  import { onMount } from "svelte";

  export let person: Person;
  export let map: L.Map;
  export let location: Location;

  const markerSize = 80;

  const marker = L.marker(location.position, {
    icon: L.icon({
      iconUrl: "/img/location-icon.svg",
      iconSize: [markerSize, markerSize],
      iconAnchor: [markerSize / 2, markerSize],
    }),
  }).addTo(map);

  function generateContent() {
    function createElement<T extends "div" | "input" | "button" | "select">(
      type: T,
      content?: string
    ): T extends "div"
      ? HTMLDivElement
      : T extends "input"
        ? HTMLInputElement
        : T extends "button"
          ? HTMLButtonElement
          : T extends "select"
            ? HTMLSelectElement
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

    nameDiv.innerHTML = `<span>Имя: </span><span>${person.firstName ?? ""} ${person.surName ?? ""} ${person.lastName ?? ""}`;

    mainDiv.appendChild(nameDiv);

    const typeDiv = createElement("div");

    typeDiv.innerHTML = "<span>Тип места: </span>";

    const typeSelect = document.createElement("select");

    typeSelect.onchange = () => {};

    typeDiv.appendChild(typeSelect);

    mainDiv.appendChild(typeDiv);

    const descriptioDiv = createElement("div");

    const descriptionInput = createElement("input");

    descriptionInput.value = location.description ?? "";

    descriptionInput.onchange = () => {
      location.description = descriptionInput.value;
    };

    descriptioDiv.innerHTML = `<span>Описание: </span>`;
    descriptioDiv.appendChild(descriptionInput);

    mainDiv.appendChild(descriptioDiv);

    const positionDiv = createElement("div", "<span>Место: </span>");
    const positionButton = createElement("button", "редактировать");

    positionButton.onclick = () => {
      marker.closePopup();
      dragging = true;
      map.dragging.disable();
    };

    positionDiv.appendChild(positionButton);

    mainDiv.appendChild(positionDiv);

    const saveButton = createElement("button", "×");
    const removeButton = createElement("button", "✓");

    mainDiv.appendChild(saveButton);
    mainDiv.appendChild(removeButton);

    return mainDiv;
  }

  let dragging = false;

  function handleMouseClick(e: L.LeafletMouseEvent) {
    if (!dragging) {
      return;
    }

    dragging = false;
    map.dragging.enable();
    marker.openPopup();
  }

  function handleMouseMove(e: L.LeafletMouseEvent) {
    if (!dragging) {
      return;
    }

    marker.setLatLng(e.latlng);
  }

  const popup = L.popup({
    content: generateContent(),
    offset: [0, -0.9 * markerSize],
  });

  marker.bindPopup(popup);

  onMount(() => {
    marker.openPopup();

    return () => {
      marker.remove();
    };
  });

  map.addEventListener("click", handleMouseClick);
  //   marker.addEventListener("mousedown", handleMouseDown);
  //   marker.addEventListener("mouseup", handleMouseUp);
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
