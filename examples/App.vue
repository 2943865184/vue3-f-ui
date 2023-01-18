<template>
  <div class="my-kit-doc">
    <aside>
      <router-link v-for="(link, index) in data.links" :key="index" :to="link.path">{{ link.name }}</router-link>
      <router-link to="/components/Button">11</router-link>
    </aside>
    <!-- <f-button>2</f-button> -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import ComponentList from '../packages/list.json';
import { reactive } from 'vue'

const data = reactive({
  links: ComponentList.map((item: any) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName
  }))
})
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}

.my-kit-doc {
  display: flex;
  min-height: 100vh;

  aside {
    width: 200px;
    padding: 15px;
    border-right: 1px solid #ccc;
  }

  main {
    width: 100%;
    flex: 1;
    padding: 15px;
  }
}
</style>
