<template>
  <div class="content">
    <aside>
      <router-link class="options" v-for="(link, index) in data.links" :key="index" :to="link.path">{{
        link.name
      }}</router-link>
      <router-link class="options" to="/components/Button">11</router-link>
    </aside>
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
h1{
  font-size: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}

.content {
  display: flex;
  // min-height: 100vh;

  aside {

    width: 200px;
    // padding: 15px;
    border-right: 1px solid #ccc;

    .options {
      cursor: pointer;
      display: block;
      margin-bottom: 10px;
      height: 50px;
      text-align: center;
      line-height: 45px;
      font-size: 24px;

      &:hover {
        background: #ddd;
      }
    }
  }

  main {
    width: 100%;
    flex: 1;
    padding: 15px;
  }
}
</style>
