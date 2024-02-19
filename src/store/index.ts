import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    assistantID: "",
    threadID: "",
    runID: "",
  }),
  actions: {
    setAssitantID(value: string) {
      this.assistantID = value;
    },
    setThreadID(value: string) {
      this.threadID = value;
    },
    setRunID(value: string) {
      this.runID = value;
    },
  },
});
