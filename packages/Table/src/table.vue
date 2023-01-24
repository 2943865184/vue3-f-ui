<template>
    <div class="f-table">
        <!-- 头部 -->
        <div class="headerWrapper">
            <TableHeader :store="store" />
        </div>
        <!-- 身体 -->
        <div class="bodyWrapper">
            <TableBody :store="store" />
        </div>

        <!-- 底部 -->
        <div class="footWrapper"></div>
    </div>
</template>
<script lang="ts" >
import { defineComponent, render, } from 'vue'
import { typeJudge, typeClass } from '../../public/typescript/index'
import { underlineClass, store } from '../../public/typescript/index'
import { getTableRenderData } from '../../public/typescript/index'
import TableColumn from './table-column'
import TableHeader from './table-header'
import TableBody from './table-body'

export default defineComponent({
    props: ['data'],
    components: {
        TableColumn,
        TableHeader,
        TableBody
    },
    setup(props, { slots }) {

        let store: store | unknown

        /**
         * 初始化方法
         */
        function initialization() {
            store = getTableRenderData(slots, props)

        }

        initialization()

        return {
            initialization,
            store,
            render

        }
    },

})



</script>

<style scoped lang="less">

</style>