import { TextFileView } from "obsidian";
import App1 from "./App.vue";
import { createApp } from "vue";

export const VIEW_TYPE_CSV = "csv-view";

export class CSVView extends TextFileView {
  tableData: string[][] = [];
  // @ts-ignore
  tableEl: HTMLElement;

  getViewData() {
    console.log("table", this.tableData);

    return this.tableData.map((row) => row.join(",")).join("\n");
  }

  // If clear is set, then it means we're opening a completely different file.
  setViewData(data: string, clear: boolean) {
    console.log("data111", data);

    this.tableData = data.split("\n").map((line) => line.split(","));
    console.log("aa", this.tableData);

    this.refresh();
  }

  refresh() {
    this.tableEl.empty();

    createApp(App1).mount(this.tableEl);
  }

  clear() {
    this.tableData = [];
    console.log("clear", this.tableData);
  }

  getViewType() {
    return VIEW_TYPE_CSV;
  }

  async onOpen() {
    console.log("open", this.tableData);

    this.tableEl = this.contentEl.createEl("div");
  }

  async onClose() {
    this.contentEl.empty();
    console.log("close", this.tableData);
  }
}
