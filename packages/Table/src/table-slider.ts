import { ref, watch } from 'vue'
import { VueDom, indexSignatureNumber, TableDomStore } from './index'
import { getTableDomStore } from '../store/index'

/**
 * 滚动条参数
 */
export function getSliderParameter(tableWrapper: VueDom | null): indexSignatureNumber {

    let sliderParameter = {}
    if (tableWrapper) {
        const FRAME_WIDTH = tableWrapper?.clientWidth                                   // 边框宽度
        const CONTENT_WIDTH = tableWrapper?.children[0].clientWidth                     // 内容宽度
        const multiple = Math.floor(CONTENT_WIDTH / FRAME_WIDTH)                        // 内容 / 边框宽度
        const SLIDER_BAR_WIDTH = FRAME_WIDTH                                            // sliderBar宽度
        const SLIDERBAR_WIDTH = FRAME_WIDTH - (CONTENT_WIDTH - FRAME_WIDTH) / multiple  // 滚动条宽度 = 边框宽度 - (内容宽度 - 边框宽度) / (内容宽度 / 边框宽度)
        const SLIDERBAR_MAX_MOVEDISTANCE = FRAME_WIDTH - SLIDERBAR_WIDTH                // 滚动条最大移动距离 = 边框宽度 - 滚动条宽度

        sliderParameter = {
            FRAME_WIDTH,
            CONTENT_WIDTH,
            multiple,
            SLIDER_BAR_WIDTH,
            SLIDERBAR_WIDTH,
            SLIDERBAR_MAX_MOVEDISTANCE
        }
    }
    return sliderParameter

}

/**
 * 滚动条移动逻辑
 * @return move 移动距离
 */
export function sliderEvent(sliderBarDom: VueDom) {
    let mousedownX: number = 0         // 滚动条所处的位置 = 鼠标按下时的x坐标 + 滚动条移动的距离
    let move = ref(0)                  // 鼠标移动距离 = 滚动条所处的位置 - 鼠标当前x坐标
    let sliderBarMoveDistance = ref(0) // 滚动条移动的距离（默认为0） 

    /**
     * 滑动条鼠标按下移动事件回调函数
     */
    const sliderBarMousemove = (event: any) => {

        move.value = mousedownX - event.clientX   // 鼠标移动距离

        move.value = -move.value

    }

    // 鼠标按下滚动条事件
    sliderBarDom.children[0].addEventListener('mousedown', (event) => {

        mousedownX = event.clientX - sliderBarMoveDistance.value

        onselectstart = function () { return false }         // 在移动滚动条时禁止选中文本

        addEventListener('mousemove', sliderBarMousemove)
    })

    // 鼠标抬起事件
    addEventListener('mouseup', () => {

        onselectstart = function () { return true }          // 取消在移动滚动条时禁止选中文本

        sliderBarMoveDistance.value = move.value             // 记录当前滚动条移动距离

        removeEventListener('mousemove', sliderBarMousemove) // 删除监听鼠标移动事件

    })

    return move
}

/**
 * 滑动条移动逻辑
 */
export function sliderBarHandle<T extends VueDom | null>(sliderBarDom: T, tableDomStore: TableDomStore) {

    if (sliderBarDom && tableDomStore) {

        let { tableWrapper } = tableDomStore

        let { FRAME_WIDTH,
            CONTENT_WIDTH,
            multiple,
            SLIDER_BAR_WIDTH,
            SLIDERBAR_WIDTH,
            SLIDERBAR_MAX_MOVEDISTANCE
        } = getSliderParameter(tableWrapper)




        sliderBarDom.style.width = `${SLIDER_BAR_WIDTH}px` // 设置滚动条边框长度

        if (FRAME_WIDTH < CONTENT_WIDTH) {

            sliderBarDom.children[0].style.width = `${SLIDERBAR_WIDTH}px`  // 设置滚动条长度

            let move = sliderEvent(sliderBarDom)

            /**
             * 监视滚动条移动距离，并设置边界判断防止越界
             */
            watch(move, (newValue, oldValue) => {

                if (newValue <= 0) {
                    move.value = 0

                }

                if (newValue >= SLIDERBAR_MAX_MOVEDISTANCE) {
                    move.value = SLIDERBAR_MAX_MOVEDISTANCE
                }

                sliderBarDom.children[0].style.transform = `translateX(${move.value}px)`

                tableWrapper?.scroll(move.value * multiple, 0)

            })

        }


    }
}