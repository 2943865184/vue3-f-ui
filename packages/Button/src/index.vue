<template>
    <button class="f-button" @click="$emit('click', $event)">
        <slot></slot>
    </button>
</template>
  
<script lang="ts" setup>
import '../less/index.less'
defineEmits(['click']);
</script>
  
<style scoped lang="less">

</style>
