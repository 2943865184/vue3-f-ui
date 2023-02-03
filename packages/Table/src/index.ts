import { Slots } from 'vue'

export interface TablePropsObject {
    [key: string]: string
}

export interface TableProps {
    data: Array<TablePropsObject>
    width: string | undefined
    isHeader: boolean | undefined
}

export interface VueDomChildren {
    namedItem: (name: string) => Element | null
    item: (index: number) => Element | null

}

// export interface VueDomValue extends Element {
//     children: Array<VueDom> & VueDomChildren
//     style: CSSStyleDeclaration
// }

export interface VueDom extends HTMLInputElement, VueDomChildren {
    value: string & VueDom
    children: Array<VueDom> & VueDomChildren

}

export type VueDomArray = Array<VueDom>

export interface tableFixedColumnInfo {
    direction: string
    columnIndex: number
}

export interface store {
    tableColumnName: Array<string>
    tableColumnData: Array<object>
    tableFixedColumnData: Array<object>
    tableColumnSlots: Array<object>
    tableColumnProp: Array<string>
    tableColumnWidth: Array<string>
    tableFixedColumnInfo: Array<tableFixedColumnInfo>
    tableWidth: string | undefined
    tableIsHeader: boolean | undefined
}

/**
 * table组件数据处理
 * @return store 处理完毕后的数据存放对象
 */
export function getTableRenderData(slots: Slots, props: TableProps): store {
    let store: store = {
        tableColumnName: [],  // 列名
        tableColumnData: [],  // 表格渲染数据
        tableFixedColumnData: [], // 固定列数据
        tableColumnSlots: [], // 表格列插槽
        tableColumnProp: [],  // 表格列传入的数据
        tableColumnWidth: [], // 表格列宽度
        tableFixedColumnInfo: [], // 固定列的索引
        tableWidth: '',         // 表宽度
        tableIsHeader: false  // 是否显示表头
    }
    // table宽度
    store.tableWidth = props.width

    // 是否隐藏头部
    store.tableIsHeader = props.isHeader

    if (slots?.default) {
        let count: number = 0
        slots.default().find((item: any) => {
            if (item.props) {
                // 列名
                if (item.props.label) {
                    store.tableColumnName.push(item.props.label)
                } else {
                    store.tableColumnName.push('')
                }

                // 列数据源的key名
                if (item.props.prop) {
                    store.tableColumnProp.push(item.props.prop)
                } else {
                    store.tableColumnProp.push('')
                }

                // 列宽度
                if (item.props.width) {
                    store.tableColumnWidth.push(item.props.width)
                } else {
                    store.tableColumnWidth.push('')
                }

                // 固定列
                if (item.props.fixed == 'left' || item.props.fixed == 'right') {
                    store.tableFixedColumnInfo.push({
                        direction: item.props.fixed,
                        columnIndex: count
                    })
                }

                // 列插槽
                if (item.children) {
                    store.tableColumnSlots.push(item.children)
                } else {
                    store.tableColumnSlots.push({})
                }

            }

            count++
        })

    }

    // 处理渲染数据
    if (store.tableColumnProp) {

        for (const key in props.data) {
            let tempArr: Array<any> = []
            for (const key2 in store.tableColumnProp) {

                if (props.data[key][store.tableColumnProp[key2]]) {
                    tempArr.push(props.data[key][store.tableColumnProp[key2]])
                } else {
                    tempArr.push('')
                }
            }
            store.tableColumnData?.push(tempArr)
        }
    }


    // // 处理渲染数据2
    // if (store.tableColumnProp) {
    //     for (const key in props.data) {
    //         let tempArr: any = []

    //         for (const key2 in props.data) {

    //             if (props.data[key2][store.tableColumnProp[key]]) {
    //                 tempArr.push(props.data[key2][store.tableColumnProp[key]])
    //             } else {
    //                 tempArr.push('')
    //             }

    //         }
    //         store.tableColumnData?.push(tempArr)
    //     }
    // }

    return store

}
/**
 * header 和 body 列宽度同步
 * @param bodyDom 
 * @param headerDom 
 */
export function widthSynchronization<T extends VueDom | undefined>(headerDom: T, bodyDom: T): T {

    if (bodyDom && headerDom) {

        let tableHeaderCell = headerDom.children // table头部的单元格
        let tableFirstRowCell = bodyDom.children[0].children // table第一行的单元格（横）

        for (let i = 0; i < tableFirstRowCell.length; i++) {
            tableHeaderCell[i].style.width = `${tableFirstRowCell[i].clientWidth}px`
        }
    }

    return headerDom
}

/**
 * 设置table样式
 * 
 */
export function setTableStyle<T extends VueDom | null>(tableWrapper: T, store: store) {

    if (tableWrapper) {

        let tableInnerWrapper = tableWrapper.children[0]

        let tableHeader = tableWrapper.children[0].children[0].children[0]
        let tableBody = tableWrapper.children[0].children[1].children[0]

        let tableRow: Array<VueDom> = []
        let tableColumn: Array<VueDomArray> = []
        let tableColumnWidthSum: number = 0

        /**
         * 获取table行DOM
         */
        for (let index = 0; index < tableBody.children.length; index++) {
            // 获取行数据
            tableRow.push(tableBody.children[index])

        }
        /**
         * 获取table列DOM
         */
        if (tableRow.length > 0) {
            const TABLE_ROW_LENGTH = tableRow[0].children.length
            for (let index = 0; index < TABLE_ROW_LENGTH; index++) {
                let tempArr = []

                for (let index2 = 0; index2 < tableBody.children.length; index2++) {
                    tempArr.push(tableBody.children[index2].children[index])
                }
                tableColumn.push(tempArr)

            }
        }

        /**
         * 设置table宽度
         */
        if (store.tableWidth) {
            // tableWrapper.setAttribute('width', store.tableWidth) // 无效？？？
            tableWrapper.style.width = store.tableWidth
        }

        /**
         * 设置列宽度 / 固定列
         */
        for (const key in tableColumn) {
            let tableHeaderCell = tableHeader.children[key]  // 当前列的头部
            let columnWidth = 0

            for (const key2 in tableColumn[key]) {

                let tableColumnCell = tableColumn[key][key2]    // 当前列的单元

                // 设置列宽度
                tableColumnCell.setAttribute('width', store.tableColumnWidth[key])

                // 获取当前列宽度最大的单元格的宽度
                if (key2 == '0') {
                    columnWidth = tableColumnCell.clientWidth
                } else if (columnWidth < tableColumnCell.clientWidth) {
                    columnWidth = tableColumnCell.clientWidth
                }

                // 固定列处理
                if (store.tableFixedColumnInfo.length > 0) {

                    tableWrapper.setAttribute('class', 'f-table f-table-fixed')
                    store.tableFixedColumnInfo.find((item: tableFixedColumnInfo) => {

                        if (parseInt(key) == item.columnIndex) {
                            tableColumnCell.setAttribute('class', 'f-table-cell f-table-cell-fixed')
                            tableHeaderCell.setAttribute('class', 'f-table-cell f-table-cell-fixed')
                        }

                    })
                }

            }
            // 列宽度 == 当前列宽度最大的单元格的宽度
            for (const key2 in tableColumn[key]) {

                let tableColumnCell = tableColumn[key][key2]
                tableColumnCell.setAttribute('width', `${columnWidth}px`)
            }
            tableColumnWidthSum += tableColumn[key][0].clientWidth

        }


        /**
          * 设置tableHeader / tableBody 宽度
          */
        // tableInnerWrapper.setAttribute('width', `${tableColumnWidthSum}px`) // 无效？？？
        tableInnerWrapper.style.width = `${tableColumnWidthSum}px`
    }

}
/**
 * 滑动条移动逻辑
 */
export function sliderBarHandle<T extends VueDom | null>(sliderBarDom: T, tableWrapper: T) {

    if (sliderBarDom && tableWrapper) {

        let tableInnerWrapper = tableWrapper.children[0]

        let frameWidth = tableWrapper?.clientWidth                  // 边框宽度
        let contentWidth = tableWrapper?.children[0].clientWidth    // 内容宽度

        if (frameWidth < contentWidth) {
            let sliderBarWidth = frameWidth - (contentWidth - frameWidth) // 滚动条宽度 = 边框宽度 - (内容宽度 - 边框宽度) 

            let sliderBarMaxMoveDistance = frameWidth - sliderBarWidth // 滚动条最大移动距离 = 边框宽度 - 滚动条宽度

            sliderBarDom.children[0].style.width = `${sliderBarWidth}px`

            let mousedownX: number = 0            // 滚动条所处的位置 = 鼠标按下时的x坐标 + 滚动条移动的距离
            let move: number = 0                  // 鼠标移动距离 = 滚动条所处的位置 - 鼠标当前x坐标
            let sliderBarMoveDistance: number = 0 // 滚动条移动的距离（默认为0） 
            /**
             * 滑动条鼠标按下移动事件回调函数
             */
            const sliderBarMousemove = (event: any) => {

                move = mousedownX - event.clientX   // 鼠标移动距离

                move = -move

                if (move < 0) {
                    sliderBarDom.children[0].style.transform = `translateX(0px)`
                    tableInnerWrapper.style.transform = `translateX(0px)`
                }

                if (move > sliderBarMaxMoveDistance) {
                    sliderBarDom.children[0].style.transform = `translateX(${sliderBarMaxMoveDistance}px)`
                    tableInnerWrapper.style.transform = `translateX(${-sliderBarMaxMoveDistance}px)`
                }

                if (move > 0 && move < sliderBarMaxMoveDistance) {
                    sliderBarDom.children[0].style.transform = `translateX(${move}px)`
                    tableInnerWrapper.style.transform = `translateX(${-move}px)`
                }

            }
            // 鼠标按下滚动条事件
            sliderBarDom.children[0].addEventListener('mousedown', (event) => {

                mousedownX = event.clientX - sliderBarMoveDistance
                window.onselectstart = function () { return false } // 在移动滚动条时禁止选择文本

                window.addEventListener('mousemove', sliderBarMousemove)
            })
            // 鼠标抬起事件
            addEventListener('mouseup', () => {

                window.onselectstart = function () { return true } // 取消在移动滚动条时禁止选择文本

                // 记录滚动条移动距离

                if (move < 0) {
                    sliderBarMoveDistance = 0
                } else if (move > sliderBarMaxMoveDistance) {
                    sliderBarMoveDistance = sliderBarMaxMoveDistance
                } else {
                    sliderBarMoveDistance = move
                }

                removeEventListener('mousemove', sliderBarMousemove) // 删除监听鼠标移动事件

            })
        }


    }
}