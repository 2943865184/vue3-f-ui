<template>
    <button class="f-button" :class="[buttonSizeClass, buttonTypeClass]">
        <div class="f-button-mask" v-if="!buttonTypeClass.defaultType">
        </div>
        <slot></slot>
    </button>
</template>
  
<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue'
import { buttonSizeJudge, buttonTypeJudge, buttonSizeClass, buttonTypeClass } from './index'
const props = defineProps(['size', 'type'])

let buttonSizeClass: buttonSizeClass
let buttonTypeClass: buttonTypeClass

// 初始化方法 
function initialization() {

    buttonSizeClass = buttonSizeJudge(props)

    buttonTypeClass = buttonTypeJudge(props)

}

onBeforeMount(() => {
    initialization()
})

</script>
  
<style scoped lang="less">
.f-button {
    position: relative;
    color: #fff;
    border-radius: 3px;
    overflow: hidden;

    .f-button-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        &:active {
            background: rgba(0, 0, 0, 0.2);
        }
    }
    &:hover {
        opacity: 0.8;
    }
}

.defaultSize {
    padding: 0 12px;
    font-size: 14px;
    height: 32px;
}

.largeSize {
    padding: 0 16px;
    font-size: 16px;
    height: 40px;
}

.smallSize {
    padding: 0 8px;
    font-size: 12px;
    height: 24px;
}

.defaultType {
    background: #fff;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:hover {
        color: #409eff;
        background: #ECF5FF;
        border :1px solid #a0cfff;
    }
    &:active{
        border: 1px solid #409eff;
    }
}

.primaryType {
    background: #409eff;
}

.successType {
    background: #67c23a;
}

.infoType {
    background: #909399;
}

.warningType {
    background: #E6A23C;
}

.dangerType {
    background: #F56C6C;
}
</style>
