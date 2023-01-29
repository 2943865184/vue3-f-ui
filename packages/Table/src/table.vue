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
import { defineComponent, onMounted, ref } from 'vue'
import { store } from '../../public/typescript/index'
import { getTableRenderData, widthSynchronization, VueDom } from '../../public/typescript/index'
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
        let store: store | unknown = getTableRenderData(slots, props)

        let tableWidth = '100%'

        /**
         * 初始化方法
         */
        function initialization() {

            headerWrapper.value = widthSynchronization(headerWrapper.value, bodyWrapper.value)

            /**
             * 设置table宽度
             */
            if (props.width && typeof props.width == 'string' && tableWrapper.value) {

                tableWrapper.value.style.width = props.width

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
    }


})



</script>

<style scoped lang="less">
// .f-table {
//     .headerWrapper {}

//     .bodyWrapper {
//         .f-table-body {
//             .f-table-column {
//                 .f-table-cell {
//                     // background: red;
//                 }
//             }
//         }

//     }
// }
</style>