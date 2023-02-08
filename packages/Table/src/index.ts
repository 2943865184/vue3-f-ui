import { Slots, watch, ref, getCurrentInstance } from 'vue'
import { getTableDomStore } from '../store/index'


export interface indexSignatureString {
    [key: string]: string
}

export interface indexSignatureNumber {
    [key: string]: number
}

export interface TableProps {
    data: Array<indexSignatureString>
    width: string | undefined
    isHeader: boolean | undefined
}

export interface VueDomChildren {

    namedItem: (name: string) => Element | null
    item: (index: number) => Element | null

}



export interface VueDom extends HTMLInputElement {
    // value: string & VueDom
    children: Array<VueDom> & VueDomChildren

    namedItem: (name: string) => Element | null
    item: (index: number) => Element | null
}

export type VueDomArray = Array<VueDom>

export interface tableFixedColumnInfo {
    direction: string
    columnIndex: number
    columnWidth: number
}

export interface store {
    tableColumn: Array<VueDom>
    tableRow: Array<VueDom>
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

export interface TableDomStore {
    tableWrapper: VueDom | null
    tableInnerWrapper: VueDom | undefined
    tableHeaderWrapper: VueDom | undefined
    tableBodyWrapper: VueDom | undefined
    tableHeader: VueDom | undefined
    tableBody: VueDom | undefined
    tableHeaderRows: VueDom[] | undefined
    tableBodyRows: VueDom[] | undefined
    tableHeaderColumns: Array<VueDom[]> | undefined
    tableBodyColumns: Array<VueDom[]> | undefined
    tableColumns: Array<VueDom[]> | undefined
}

// export interface fixedColumnData {
//     fixedColumnArray: Array<tableFixedColumnInfo>
//     leftFixedColumnWidthSum: number,
//     rightFixedColumnWidthSum: number
// }


export interface fixedColumnDataObj {
    fixedColumnArray: Array<tableFixedColumnInfo>
    leftFixedColumnWidthSum: number,
    rightFixedColumnWidthSum: number
}


// /**
//  * header 和 body 列宽度同步
//  * @param bodyDom 
//  * @param headerDom 
//  */
// export function widthSynchronization(tableDomStore: TableDomStore): VueDom | undefined {
//     let { tableBody, tableHeader } = tableDomStore

//     if (tableBody && tableHeader) {

//         let tableHeaderCell = tableHeader.children[0].children // table头部的单元格
//         let tableFirstRowCell = tableBody.children[0].children // table第一行的单元格（横）

//         for (let i = 0; i < tableFirstRowCell.length; i++) {
//             tableHeaderCell[i].style.width = `${tableFirstRowCell[i].clientWidth}px`
//         }
//     }

//     return tableHeader
// }

/**
 * 处理列宽度
 * @message 给设定了宽度的列的单元设置宽度，同时获取该列的单元宽度进行逐一比对，返回每次比对时更大的值
 * @return width 宽度比对时更大的那个值 
 */
export function columnWidthHandle(tableColumns: Array<VueDom[]>, countColumnCellMaxWidth: number, tableColumnWidth: Array<string>, columnIndex: number, columnCellIndex: number): number {
    let width: number = countColumnCellMaxWidth

    if (tableColumns) {
        tableColumns[columnIndex][columnCellIndex].setAttribute('width', tableColumnWidth[columnIndex])

        // 当前列的单元宽度比对算法
        if (columnCellIndex == 0) {
            width = tableColumns[columnIndex][columnCellIndex].clientWidth
        }

        if (width < tableColumns[columnIndex][columnCellIndex].clientWidth) {
            width = tableColumns[columnIndex][columnCellIndex].clientWidth
        }

    }

    return width
}

/**
 * 列宽度调整
 * @message 根据列宽度最大的单元格的宽度重新设置该列的每一个单元格宽度
 */
export function columnWidthAdjust(tableColumns: Array<VueDom[]>, countColumnCellMaxWidth: number, columnIndex: number) {

    // let { tableBodyColumns } = getTableDomStore(table)
    if (tableColumns) {
        for (const key in tableColumns[columnIndex]) {

            let tableColumnCell = tableColumns[columnIndex][key]
            tableColumnCell.setAttribute('width', `${countColumnCellMaxWidth}px`)

        }
    }
}
/**
 * 判断当前列是否为固定列，如果是返回该列的索引，如果不是返回-1
 */
export function findFixedColumnIndex(queryObj: Array<tableFixedColumnInfo>, index: number) {
    let fixedColumnIndex = queryObj.findIndex((item: tableFixedColumnInfo) => {
        if (item.columnIndex == index) {
            return true
        }
    })

    return fixedColumnIndex
}


/**
 * 固定列处理
 * @message 根据table-column传入的fixed属性来给指定列加上固定列的类名
 * @return direction 返回当前的固定列的方向
 */
// export function columnFixedHandle(table: VueDom, tableColumns: Array<VueDom[]>, tableFixedColumnInfo: Array<tableFixedColumnInfo>, fixedColumnPosition: fixedColumnPosition, columnIndex: number, columnCellIndex: number): string {

//     let direction = ''
//     table.setAttribute('class', 'f-table f-table-fixed')

//     let fixedColumnIndex = findFixedColumnIndex(tableFixedColumnInfo, columnIndex) // 固定列索引，如果该列不是固定列则为-1

//     if (fixedColumnIndex != -1 && tableColumns) {

//         if (tableFixedColumnInfo[fixedColumnIndex].direction == 'right') {

//             tableColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-right')
//             tableColumns[columnIndex][columnCellIndex].style.right = `${fixedColumnPosition.right}px`
//             direction = 'right'

//         }

//         if (tableFixedColumnInfo[fixedColumnIndex].direction == 'left') {

//             tableColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-left')
//             tableColumns[columnIndex][columnCellIndex].style.left = `${fixedColumnPosition.left}px`
//             direction = 'left'
//         }
//     }
//     return direction
// }

/**
 * 判断当前列是否为固定列 如果是则返回该固定列的信息 如果不是则返回false
 * @returns 
 */
export function getFixedColumnData(fixedColumnInfo: Array<tableFixedColumnInfo>, columnIndex: number, columnWidth: number): tableFixedColumnInfo | false {

    let fixedColumnIndex = findFixedColumnIndex(fixedColumnInfo, columnIndex)
    let fixedData = {
        ...fixedColumnInfo[fixedColumnIndex],
        columnWidth
    }

    if (fixedColumnIndex != -1) {
        return fixedData
    }

    return false

}
/**
 * 封装固定列数据，并计算左和右固定列的宽度总数
 */
export function encapsulationFixedColumnData(fixedColumnDataObj: fixedColumnDataObj, fixedColumnData: tableFixedColumnInfo) {
    /**
     * 将固定列存放至数组中
     */
    fixedColumnDataObj.fixedColumnArray.push(fixedColumnData)

    /**
     * 计算左右固定列宽度总数
     */
    if (fixedColumnData.direction == 'left') {
        fixedColumnDataObj.leftFixedColumnWidthSum += fixedColumnData.columnWidth
    }
    if (fixedColumnData.direction == 'right') {
        fixedColumnDataObj.rightFixedColumnWidthSum += fixedColumnData.columnWidth
    }

    return fixedColumnDataObj
}

/**
 * 处理固定列
 */
export function fixedColumnHandle(table: VueDom, tableColumns: Array<VueDom[]>, fixedColumnDataObj: fixedColumnDataObj) {
    let positionLeft = 0
    let positionRight = fixedColumnDataObj.rightFixedColumnWidthSum
    let columnWidth = 0

    // 遍历列，判断是否为固定列，如果是则按照固定列数据给其添加对应的样式
    for (let columnIndex = 0; columnIndex < tableColumns.length; columnIndex++) {

        let isFixedColumn = findFixedColumnIndex(fixedColumnDataObj.fixedColumnArray, columnIndex)

        if (isFixedColumn != -1) {

            if (fixedColumnDataObj.fixedColumnArray[isFixedColumn].direction == 'right') {
                columnWidth = tableColumns[columnIndex][0].clientWidth
            }

            table.setAttribute('class', 'f-table f-table-fixed')

            // 给固定列添加指定的样式
            for (let columnCellIndex = 0; columnCellIndex < tableColumns[columnIndex].length; columnCellIndex++) {

                if (fixedColumnDataObj.fixedColumnArray[isFixedColumn].direction == 'left') {
                    if (columnCellIndex == 0 && columnIndex != 0) {
                        positionLeft += columnWidth
                    }
                    tableColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-left')
                    tableColumns[columnIndex][columnCellIndex].style.left = `${positionLeft}px`

                }
                if (fixedColumnDataObj.fixedColumnArray[isFixedColumn].direction == 'right') {
                    if (columnCellIndex == 0) {
                        positionRight -= columnWidth
                    }
                    tableColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-right')
                    tableColumns[columnIndex][columnCellIndex].style.right = `${positionRight}px`

                }
            }

            if (fixedColumnDataObj.fixedColumnArray[isFixedColumn].direction == 'left') {
                columnWidth = tableColumns[columnIndex][0].clientWidth
            }
        }
    }
}


/**
 * 设置列宽度，固定列
 * @return tableColumnWidthSum 列宽度总和
 */
export function columnHandle(table: VueDom, store: store): number {
    let tableColumnWidthSum: number = 0
    let { tableColumns } = getTableDomStore(table)

    let fixedColumnDataObj: fixedColumnDataObj = {
        fixedColumnArray: [],
        leftFixedColumnWidthSum: 0,
        rightFixedColumnWidthSum: 0
    }

    if (tableColumns) {
        for (let columnIndex = 0; columnIndex < tableColumns.length; columnIndex++) {
            let countColumnCellMaxWidth = 0 // 记录列的单元宽度比对时更大的那个值，最终会得到该列宽度最大的单元的宽度
            let isFixedColumn: false | tableFixedColumnInfo

            for (let columnCellIndex = 0; columnCellIndex < tableColumns[columnIndex].length; columnCellIndex++) {

                /**
                 * 设置列的单元的宽度，并对列的当前的单元和上一个单元的宽度进行比对，返回更大的值
                 */
                countColumnCellMaxWidth = columnWidthHandle(tableColumns, countColumnCellMaxWidth, store.tableColumnWidth, columnIndex, columnCellIndex)


            }
            /**
             * 根据列宽度最大的单元格的宽度重新设置该列的每一个单元格宽度
             */
            columnWidthAdjust(tableColumns, countColumnCellMaxWidth, columnIndex)


            isFixedColumn = getFixedColumnData(store.tableFixedColumnInfo, columnIndex, countColumnCellMaxWidth)

            // 如果该列是固定列则把该列的数据保存
            if (isFixedColumn) {
                fixedColumnDataObj = encapsulationFixedColumnData(fixedColumnDataObj, isFixedColumn)
            }


            tableColumnWidthSum += countColumnCellMaxWidth // 记录所有列宽度总数
        }
        /**
         * 固定列处理
         */
        fixedColumnHandle(table, tableColumns, fixedColumnDataObj)

    }

    return tableColumnWidthSum
}

/**
 * 设置table样式
 * 
 */
export function setTableStyle(tableDomStore: TableDomStore, store: store) {


    let { tableInnerWrapper, tableWrapper } = tableDomStore

    let tableColumnWidthSum: number = 0

    /**
     * 设置table宽度
     */
    if (store.tableWidth && tableWrapper) {
        // table.setAttribute('width', store.tableWidth) // 无效？？？
        tableWrapper.style.width = store.tableWidth

        /**
         * 处理固定列和列宽度
         */
        tableColumnWidthSum = columnHandle(tableWrapper, store)

        /**
         * 设置tableInnerWrapper宽度
         */
        if (tableInnerWrapper) {
            tableInnerWrapper.style.width = `${tableColumnWidthSum}px`
        }
    }
}
