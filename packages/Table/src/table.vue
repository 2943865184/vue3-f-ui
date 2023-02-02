<template>
    <div class="f-table" ref="tableWrapper">

        <div class="table-inner-wrapper" ref="innerWrapper">
            <!-- 头部 -->
            <div class="header-wrapper" ref="headerWrapper">
                <TableHeader :store="store" />
            </div>

            <!-- 身体 -->
            <div class="body-wrapper" ref="bodyWrapper">
                <TableBody :store="store" />
            </div>

            <!-- 底部 -->
            <div class="foot-wrapper">
                <div class="dragBar" v-if="store.tableFixedColumnInfo.length > 0">123</div>
            </div>
        </div>




    </div>


</template>
<script lang="ts" >
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { getTableRenderData, widthSynchronization, VueDom, setTableStyle, store } from './index'
import TableColumn from './table-column'
import TableHeader from './table-header'
import TableBody from './table-body'


export default defineComponent({
    props: ['data', 'width', 'isHeader'],
    components: {
        TableColumn,
        TableHeader,
        TableBody
    },

    setup(props, { slots }) {
        const tableWrapper = ref<VueDom | null>(null)
        const innerWrapper = ref<VueDom | null>(null)
        const headerWrapper = ref<VueDom | null>(null)
        const bodyWrapper = ref<VueDom | null>(null)

        let store: store = getTableRenderData(slots, props)

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
            tableWrapper,
            bodyWrapper,
            headerWrapper,
        }

    },





})



</script>
