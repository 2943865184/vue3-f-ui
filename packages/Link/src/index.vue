<template>
    <a class="f-link" :class="[linkTypeClass, linkUnderlineClass]">
        <slot></slot>
    </a>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { typeJudge, typeClass } from '../../public/typescript/index'
import { underlineClass } from '../../public/typescript/index'

let props = defineProps(['type', 'isUnderline'])

let linkTypeClass: typeClass
let linkUnderlineClass: underlineClass = { deleteUnderline: false }

function initialization() {

    linkTypeClass = typeJudge(props)

    if (props.isUnderline == false) {
        linkUnderlineClass.deleteUnderline = true
    }
}

onBeforeMount(() => {
    initialization()
})
</script>

<style scoped lang="less">
.f-link {
    display: inline-block;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    padding: 2px 0 1px 0;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}

.deleteUnderline {
    border: 0 !important;
}


.defaultType {
    color: black;

    &:hover {
        color: @primaryColor;
        border-bottom: 1px solid @primaryColor;
    }
}

.primaryType {
    color: @primaryColor;

    &:hover {
        border-bottom: 1px solid @primaryColor;
    }
}

.successType {
    color: @successColor;

    &:hover {
        border-bottom: 1px solid @successColor;
    }
}

.infoType {
    color: @infoColor;

    &:hover {
        border-bottom: 1px solid @infoColor;
    }

}

.warningType {
    color: @warningColor;

    &:hover {
        border-bottom: 1px solid @warningColor;
    }
}

.dangerType {
    color: @dangerColor;

    &:hover {
        border-bottom: 1px solid @dangerColor;
    }
}
</style>