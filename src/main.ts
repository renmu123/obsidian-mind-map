import "./style.scss";

import { App, Modal, Notice, Plugin, WorkspaceLeaf } from "obsidian";
import { CSVView, VIEW_TYPE_CSV } from "./view";
import SampleSettingTab from "./setting";

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
};

export default class MyPlugin extends Plugin {
  // @ts-ignore
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerView(
      VIEW_TYPE_CSV,
      (leaf: WorkspaceLeaf) => new CSVView(leaf)
    );
    this.registerExtensions(["csv"], VIEW_TYPE_CSV);

    this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
