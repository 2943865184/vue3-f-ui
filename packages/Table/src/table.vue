<template>
    <div class="f-table" ref="tableWrapper">
        <!-- 头部 -->
        <div class="headerWrapper" ref="headerWrapper">
            <TableHeader :store="store" ref="tableHeader" />
        </div>
        <!-- 身体 -->
        <div class="bodyWrapper" ref="bodyWrapper">
            <TableBody :store="store" />
        </div>

        <!-- 底部 -->
        <div class="footWrapper"></div>

    </div>


</template>
<script lang="ts" >
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { store } from '../../public/typescript/index'
import { getTableRenderData, widthSynchronization, VueDom, VueDomValue, setTableStyle } from '../../public/typescript/index'
import TableColumn from './table-column'
import TableHeader from './table-header'
import TableBody from './table-body'



export default defineComponent({
    props: ['data', 'width'],
    components: {
        TableColumn,
        TableHeader,
        TableBody
    },

    setup(props, { slots }) {
        const tableWrapper = ref()
        const headerWrapper = ref<VueDom | null>(null)
        const bodyWrapper = ref<VueDom | null>(null)

        let store: store = getTableRenderData(slots, props)
        let tableWidth = '100%'

        /**
         * 初始化方法
         */
        function initialization() {

            let tableHeader = headerWrapper.value?.children[0]
            let tableBody = bodyWrapper.value?.children[0]

            /**
            * 设置table样式
            */
            if (tableHeader && tableBody) {
                setTableStyle(tableWrapper.value, store)

                nextTick(() => {

                    widthSynchronization(tableHeader, tableBody)

                })
            }


        }

        onMounted(() => {
            initialization()

        })

        return {
            store,
            tableWidth,
            tableWrapper,
            bodyWrapper,
            headerWrapper,
        }

    },





})



</script>
