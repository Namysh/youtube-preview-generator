import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import fr from "dayjs/locale/fr";

dayjs.locale("fr");

dayjs.extend(duration);
dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(updateLocale);

dayjs.updateLocale("fr", {
  relativeTime: {
    ...fr.relativeTime,
    y: "%d an",
  },
});

createApp(App).mount("#app");
