<template>
  <div class="root" id="app">
    <div id="map" style="width: 100%; height: 89vh"></div>

    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

<script>
import MindElixir, { E } from "mind-elixir";

export default {
  name: "App",
  data() {
    return {
      ME: null,
    };
  },
  mounted() {
    this.ME = new MindElixir({
      el: "#map",
      direction: MindElixir.LEFT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true, // default true
      locale: "zh_CN", // [zh_CN,zh_TW,en,ja,pt] waiting for PRs
      allowUndo: true,
    });
    this.ME.init(MindElixir.new("new topic"));
  },
};
</script>

<style scoped lang="scss">
#app {
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
