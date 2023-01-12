import { TextFileView } from "obsidian";
import App1 from "./App.vue";
import { createApp } from "vue";

export const VIEW_TYPE_OMM = "omm-view";

export class OMMView extends TextFileView {
  interval: any;
  // @ts-ignore
  tableEl: HTMLElement;
  // @ts-ignore
  vueApp: any;

  getViewData() {
    return JSON.stringify(this.vueApp.ME.getAllData());
  }

  // If clear is set, then it means we're opening a completely different file.
  setViewData(data: string, clear: boolean) {
    if (data) {
      const newData = JSON.parse(data);
      this.refresh(newData);
    } else {
      const newData = {
        nodeData: {
          id: "30c309b205bb7f8a",
          topic: "new topic",
          root: true,
        },
        linkData: {},
      };
      this.refresh(newData);
    }
  }

  refresh(newData: any) {
    this.tableEl.empty();

    const app = createApp(App1).mount(this.tableEl);
    this.vueApp = app;
    this.vueApp.ME.nodeData = newData.nodeData;
    this.vueApp.ME.linkData = newData.linkData;
    this.vueApp.ME.refresh();

    this.interval = setInterval(() => {
      console.log("save");

      this.requestSave();
    }, 10000);
  }

  clear() {
    console.log("clear");
    this.vueApp.unmount();

    clearInterval(this.interval);
    this.interval = null;
  }

  getViewType() {
    return VIEW_TYPE_OMM;
  }

  async onOpen() {
    console.log("open");

    this.tableEl = this.contentEl.createEl("div");
  }

  async onClose() {
    this.requestSave();
    console.log("close");

    this.contentEl.empty();
    clearInterval(this.interval);
    this.interval = null;
  }
}
