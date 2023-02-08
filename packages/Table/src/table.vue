<template>
    <div class="f-table" ref="tableWrapper">

        <table class="table-inner-wrapper" ref="innerWrapper">
            <!-- 头部 -->
            <div class="header-wrapper" ref="headerWrapper">
                <TableHeader :store="store" />
            </div>

            <!-- 身体 -->
            <div class="body-wrapper" ref="bodyWrapper">
                <TableBody :store="store" />
            </div>

            <!-- 底部 -->
            <div class="foot-wrapper"></div>

        </table>

    </div>
    <div class="slider-bar" v-if="store.tableFixedColumnInfo.length > 0" ref="sliderBar">
        <div></div>
    </div>

</template>
<script lang="ts" >
import { defineComponent,  onMounted, ref } from 'vue'
import { VueDom, setTableStyle, store } from './index'
import { getStore, getTableDomStore } from '../store/index'
import { sliderBarHandle } from './table-slider'
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
        const sliderBar = ref<VueDom | null>(null)

        let store: store = getStore(slots, props)
        /**
         * 初始化方法
         */
        function initialization() {
            let tableDomStore = getTableDomStore(tableWrapper.value)

            /**
            * 设置table样式
            */
            setTableStyle(tableDomStore, store)
            /**
             * 滚动条逻辑
             */
            sliderBarHandle(sliderBar.value, tableDomStore)


        }

        onMounted(() => {
            initialization()

        })

        return {
            store,
            tableWrapper,
            bodyWrapper,
            headerWrapper,
            sliderBar,
        }

    }

})



</script>
