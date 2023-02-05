import { ref, watch } from 'vue'
import { VueDom } from './index'

/**
 * 滑动条移动逻辑
 */
export function sliderBarHandle<T extends VueDom | null>(sliderBarDom: T, tableWrapper: T) {

    if (sliderBarDom && tableWrapper) {

        const FRAME_WIDTH = tableWrapper?.clientWidth               // 边框宽度
        const CONTENT_WIDTH = tableWrapper?.children[0].clientWidth // 内容宽度

        sliderBarDom.style.width = `${tableWrapper?.clientWidth}px` // 设置sliderBar宽度
        console.log(FRAME_WIDTH,CONTENT_WIDTH);
        
        if (FRAME_WIDTH < CONTENT_WIDTH) {
            const SLIDERBAR_WIDTH = FRAME_WIDTH - (CONTENT_WIDTH - FRAME_WIDTH) // 滚动条宽度 = 边框宽度 - (内容宽度 - 边框宽度) 
            const SLIDERBAR_MAX_MOVEDISTANCE = FRAME_WIDTH - SLIDERBAR_WIDTH    // 滚动条最大移动距离 = 边框宽度 - 滚动条宽度

            sliderBarDom.children[0].style.width = `${SLIDERBAR_WIDTH}px`

            let mousedownX: number = 0         // 滚动条所处的位置 = 鼠标按下时的x坐标 + 滚动条移动的距离
            let move = ref(0)                  // 鼠标移动距离 = 滚动条所处的位置 - 鼠标当前x坐标
            let sliderBarMoveDistance = ref(0) // 滚动条移动的距离（默认为0） 
            console.log(1);

            /**
             * 滑动条鼠标按下移动事件回调函数
             */
            const sliderBarMousemove = (event: any) => {

                move.value = mousedownX - event.clientX   // 鼠标移动距离

                move.value = -move.value

            }
            
            // 鼠标按下滚动条事件
            sliderBarDom.children[0].addEventListener('mousedown', (event) => {
                console.log(1);

                mousedownX = event.clientX - sliderBarMoveDistance.value
                onselectstart = function () { return false } // 在移动滚动条时禁止选中文本

                addEventListener('mousemove', sliderBarMousemove)
            })

            // 鼠标抬起事件
            addEventListener('mouseup', () => {

                onselectstart = function () { return true } // 取消在移动滚动条时禁止选中文本

                // 记录滚动条移动距离
                sliderBarMoveDistance.value = move.value

                removeEventListener('mousemove', sliderBarMousemove) // 删除监听鼠标移动事件

            })

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
                tableWrapper.scroll(move.value, 0)

            })

        }


    }
}