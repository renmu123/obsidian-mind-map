import "./style.scss";

import {
  App,
  Modal,
  Notice,
  Plugin,
  WorkspaceLeaf,
  TFolder,
  TFile,
  Menu,
} from "obsidian";
import { OMMView, VIEW_TYPE_OMM } from "./view";
import SampleSettingTab from "./setting";
const { join } = require("path");

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
      VIEW_TYPE_OMM,
      (leaf: WorkspaceLeaf) => new OMMView(leaf)
    );
    this.registerExtensions(["omm"], VIEW_TYPE_OMM);

    this.addSettingTab(new SampleSettingTab(this.app, this));

    this.registerEvent(
      this.app.workspace.on(
        // @ts-ignore
        "file-menu",
        (menu: Menu, file: TFile, source: string, leaf?: WorkspaceLeaf) => {
          // Add a menu item to the folder context menu to create a board
          if (file instanceof TFolder) {
            menu.addItem((item) => {
              item
                .setTitle(`新建思维导图`)
                .setIcon("document")
                .onClick(() => this.newMindMap(file));
            });
          }
        }
      )
    );
    // await this.app.fileManager.createNewMarkdownFile;
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async newMindMap(folder?: TFolder) {
    const targetFolder = folder
      ? folder
      : this.app.fileManager.getNewFileParent(
          this.app.workspace.getActiveFile()?.path || ""
        );
    console.log(
      "targetFolder",
      // targetFolder,
      join(targetFolder.path, "Untitled mindmap.omm")
    );

    try {
      // @ts-ignore
      const mindmap: TFile = await this.create(targetFolder);

      await this.app.vault.modify(mindmap, "");
      setTimeout(async () => {
        await this.app.workspace.getLeaf().setViewState({
          type: VIEW_TYPE_OMM,
          state: { file: mindmap.path },
        });
      }, 100);
    } catch (e) {
      console.error("Error creating mindmap board:", e);
    }
  }
  async create(targetFolder: TFolder) {
    const path = await this.getAvailablePath(targetFolder);
    console.log("path", path);

    const mindmap: TFile = await this.app.vault.create(path, "");
    return mindmap;
  }
  async getAvailablePath(targetFolder: TFolder) {
    let path = join(targetFolder.path, "Untitled mindmap.omm");

    if (!(await this.app.vault.adapter.exists(path))) {
      return path;
    } else {
      let i = 1;
      while (true) {
        let path = join(targetFolder.path, `Untitled mindmap(${i}).omm`);
        if (!(await this.app.vault.adapter.exists(path))) {
          return path;
        } else {
          i += 1;
        }
      }
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
