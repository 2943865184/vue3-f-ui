import { Slots, watch, ref, getCurrentInstance } from 'vue'
import { getTableDomStore } from '../store/index'


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
    tableInnerWrapper: VueDom | undefined
    tableHeaderWrapper: VueDom | undefined
    tableBodyWrapper: VueDom | undefined
    tableHeader: VueDom | undefined
    tableBody: VueDom | undefined
    tableHeaderRows: VueDom[] | undefined
    tableBodyRows: VueDom[] | undefined
    tableHeaderColumns: Array<VueDom[]> | undefined
    tableBodyColumns: Array<VueDom[]> | undefined
}


/**
 * header 和 body 列宽度同步
 * @param bodyDom 
 * @param headerDom 
 */
export function widthSynchronization<T extends VueDom | undefined>(headerDom: T, bodyDom: T): T {

    if (bodyDom && headerDom) {

        let tableHeaderCell = headerDom.children[0].children // table头部的单元格
        let tableFirstRowCell = bodyDom.children[0].children // table第一行的单元格（横）

        for (let i = 0; i < tableFirstRowCell.length; i++) {
            tableHeaderCell[i].style.width = `${tableFirstRowCell[i].clientWidth}px`
        }
    }

    return headerDom
}

/**
 * 处理列宽度
 * @message 给设定了宽度的列的单元设置宽度，同时获取该列的单元宽度进行逐一比对，返回每次比对时更大的值
 * @return width 宽度比对时更大的那个值 
 */
export function columnWidthHandle(table: VueDom, countColumnCellMaxWidth: number, tableColumnWidth: Array<string>, columnIndex: number, columnCellIndex: number): number {
    let { tableBodyColumns } = getTableDomStore(table)
    let width: number = countColumnCellMaxWidth

    if (tableBodyColumns) {
        tableBodyColumns[columnIndex][columnCellIndex].setAttribute('width', tableColumnWidth[columnIndex])

        // 当前列的单元宽度比对算法
        if (columnCellIndex == 0) {
            width = tableBodyColumns[columnIndex][columnCellIndex].clientWidth
        } else if (width < tableBodyColumns[columnIndex][columnCellIndex].clientWidth) {
            width = tableBodyColumns[columnIndex][columnCellIndex].clientWidth
        }

    }

    return width
}

/**
 * 列宽度调整
 * @message 根据列宽度最大的单元格的宽度重新设置该列的每一个单元格宽度
 */
export function columnWidthAdjust(table: VueDom, countColumnCellMaxWidth: number, columnIndex: number) {

    let { tableBodyColumns } = getTableDomStore(table)
    if (tableBodyColumns) {
        for (const key in tableBodyColumns[columnIndex]) {

            let tableColumnCell = tableBodyColumns[columnIndex][key]
            tableColumnCell.setAttribute('width', `${countColumnCellMaxWidth}px`)
        }
    }
}

/**
 * 固定列处理
 * @message 根据table-column传入的fixed属性来给指定列加上固定列的类名
 */
export function columnFixedHandle(table: VueDom, tableFixedColumnInfo: Array<tableFixedColumnInfo>, columnIndex: number, columnCellIndex: number) {
    let { tableBodyColumns, tableHeaderColumns } = getTableDomStore(table)

    if (tableFixedColumnInfo.length > 0) {

        table.setAttribute('class', 'f-table f-table-fixed')
        tableFixedColumnInfo.find((item: tableFixedColumnInfo) => {
            if (columnIndex == item.columnIndex && tableBodyColumns && tableHeaderColumns) {

                if (item.direction == 'right') {
                    tableBodyColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-right')
                    tableHeaderColumns[columnIndex][0].setAttribute('class', 'f-table-cell f-table-cell-fixed-right')
                }

                if (item.direction == 'left') {
                    tableBodyColumns[columnIndex][columnCellIndex].setAttribute('class', 'f-table-cell f-table-cell-fixed-left')
                    tableHeaderColumns[columnIndex][0].setAttribute('class', 'f-table-cell f-table-cell-fixed-left')
                }
            }

        })
    }
}

/**
 * 设置列宽度，固定列
 * @return tableColumnWidthSum 列宽度总和
 */
export function columnHandle(table: VueDom, store: store): number {
    let tableColumnWidthSum: number = 0
    let { tableBodyColumns, tableHeaderColumns } = getTableDomStore(table)


    if (tableBodyColumns && tableHeaderColumns) {
        for (let columnIndex = 0; columnIndex < tableBodyColumns?.length; columnIndex++) {
            let countColumnCellMaxWidth = 0 // 记录列的单元宽度比对时更大的那个值，最终会得到该列宽度最大的单元的宽度

            for (let columnCellIndex = 0; columnCellIndex < tableBodyColumns[columnIndex].length; columnCellIndex++) {

                /**
                 * 设置列的单元的宽度，并对列的当前的单元和上一个单元的宽度进行比对，返回更大的值
                 */
                countColumnCellMaxWidth = columnWidthHandle(table, countColumnCellMaxWidth, store.tableColumnWidth, columnIndex, columnCellIndex)

                /**
                 * 根据table-column传入的属性设置固定列
                 */
                columnFixedHandle(table, store.tableFixedColumnInfo, columnIndex, columnCellIndex)

            }
            /**
             * 根据列宽度最大的单元格的宽度重新设置该列的每一个单元格宽度
             */
            columnWidthAdjust(table, countColumnCellMaxWidth, columnIndex)

            tableColumnWidthSum += tableBodyColumns[columnIndex][0].clientWidth // 计算列宽度总和

        }
    }
    return tableColumnWidthSum
}


/**
 * 设置table样式
 * 
 */
export function setTableStyle(table: VueDom | null, store: store) {

    if (table) {

        let { tableInnerWrapper } = getTableDomStore(table)

        let tableColumnWidthSum: number = 0

        /**
         * 设置table宽度
         */
        if (store.tableWidth) {
            // table.setAttribute('width', store.tableWidth) // 无效？？？
            table.style.width = store.tableWidth
        }

        /**
         * 处理固定列和列宽度
         */
        tableColumnWidthSum = columnHandle(table, store)

        /**
         * 设置tableInnerWrapper宽度
         */
        if (tableInnerWrapper) {
            tableInnerWrapper.style.width = `${tableColumnWidthSum}px`
        }
    }
}
