import { useMainStore } from "@/store";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  
  return {
    provide: {
      store: useMainStore(pinia),
    },
  };
});
