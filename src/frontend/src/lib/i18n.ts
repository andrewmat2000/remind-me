import { register, init } from "svelte-i18n";

register("ru", () => import("./i18n/ru-RU.json"));

let locale = "ru";

let param = {
  fallbackLocale: "ru",
  initialLocale: locale,
};

init(param);
