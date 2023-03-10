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
//  * header ??? body ???????????????
//  * @param bodyDom 
//  * @param headerDom 
//  */
// export function widthSynchronization(tableDomStore: TableDomStore): VueDom | undefined {
//     let { tableBody, tableHeader } = tableDomStore

//     if (tableBody && tableHeader) {

//         let tableHeaderCell = tableHeader.children[0].children // table??????????????????
//         let tableFirstRowCell = tableBody.children[0].children // table??????????????????????????????

//         for (let i = 0; i < tableFirstRowCell.length; i++) {
//             tableHeaderCell[i].style.width = `${tableFirstRowCell[i].clientWidth}px`
//         }
//     }

//     return tableHeader
// }

/**
 * ???????????????
 * @message ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @return width ????????????????????????????????? 
 */
export function columnWidthHandle(tableColumns: Array<VueDom[]>, countColumnCellMaxWidth: number, tableColumnWidth: Array<string>, columnIndex: number, columnCellIndex: number): number {
    let width: number = countColumnCellMaxWidth

    if (tableColumns) {
        tableColumns[columnIndex][columnCellIndex].setAttribute('width', tableColumnWidth[columnIndex])

        // ????????????????????????????????????
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
 * ???????????????
 * @message ???????????????????????????????????????????????????????????????????????????????????????
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
 * ???????????????????????????????????????????????????????????????????????????????????????-1
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
 * ???????????????
 * @message ??????table-column?????????fixed?????????????????????????????????????????????
 * @return direction ?????????????????????????????????
 */
// export function columnFixedHandle(table: VueDom, tableColumns: Array<VueDom[]>, tableFixedColumnInfo: Array<tableFixedColumnInfo>, fixedColumnPosition: fixedColumnPosition, columnIndex: number, columnCellIndex: number): string {

//     let direction = ''
//     table.setAttribute('class', 'f-table f-table-fixed')

//     let fixedColumnIndex = findFixedColumnIndex(tableFixedColumnInfo, columnIndex) // ???????????????????????????????????????????????????-1

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
 * ????????????????????????????????? ??????????????????????????????????????? ?????????????????????false
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
 * ??????????????????????????????????????????????????????????????????
 */
export function encapsulationFixedColumnData(fixedColumnDataObj: fixedColumnDataObj, fixedColumnData: tableFixedColumnInfo) {
    /**
     * ??????????????????????????????
     */
    fixedColumnDataObj.fixedColumnArray.push(fixedColumnData)

    /**
     * ?????????????????????????????????
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
 * ???????????????
 */
export function fixedColumnHandle(table: VueDom, tableColumns: Array<VueDom[]>, fixedColumnDataObj: fixedColumnDataObj) {
    let positionLeft = 0
    let positionRight = fixedColumnDataObj.rightFixedColumnWidthSum
    let columnWidth = 0

    // ???????????????????????????????????????????????????????????????????????????????????????????????????
    for (let columnIndex = 0; columnIndex < tableColumns.length; columnIndex++) {

        let isFixedColumn = findFixedColumnIndex(fixedColumnDataObj.fixedColumnArray, columnIndex)

        if (isFixedColumn != -1) {

            if (fixedColumnDataObj.fixedColumnArray[isFixedColumn].direction == 'right') {
                columnWidth = tableColumns[columnIndex][0].clientWidth
            }

            table.setAttribute('class', 'f-table f-table-fixed')

            // ?????????????????????????????????
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
 * ???????????????????????????
 * @return tableColumnWidthSum ???????????????
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
            let countColumnCellMaxWidth = 0 // ?????????????????????????????????????????????????????????????????????????????????????????????????????????
            let isFixedColumn: false | tableFixedColumnInfo

            for (let columnCellIndex = 0; columnCellIndex < tableColumns[columnIndex].length; columnCellIndex++) {

                /**
                 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                 */
                countColumnCellMaxWidth = columnWidthHandle(tableColumns, countColumnCellMaxWidth, store.tableColumnWidth, columnIndex, columnCellIndex)


            }
            /**
             * ???????????????????????????????????????????????????????????????????????????????????????
             */
            columnWidthAdjust(tableColumns, countColumnCellMaxWidth, columnIndex)


            isFixedColumn = getFixedColumnData(store.tableFixedColumnInfo, columnIndex, countColumnCellMaxWidth)

            // ???????????????????????????????????????????????????
            if (isFixedColumn) {
                fixedColumnDataObj = encapsulationFixedColumnData(fixedColumnDataObj, isFixedColumn)
            }


            tableColumnWidthSum += countColumnCellMaxWidth // ???????????????????????????
        }
        /**
         * ???????????????
         */
        fixedColumnHandle(table, tableColumns, fixedColumnDataObj)

    }

    return tableColumnWidthSum
}

/**
 * ??????table??????
 * 
 */
export function setTableStyle(tableDomStore: TableDomStore, store: store) {


    let { tableInnerWrapper, tableWrapper } = tableDomStore

    let tableColumnWidthSum: number = 0

    /**
     * ??????table??????
     */
    if (store.tableWidth && tableWrapper) {
        // table.setAttribute('width', store.tableWidth) // ???????????????
        tableWrapper.style.width = store.tableWidth

        /**
         * ???????????????????????????
         */
        tableColumnWidthSum = columnHandle(tableWrapper, store)

        /**
         * ??????tableInnerWrapper??????
         */
        if (tableInnerWrapper) {
            tableInnerWrapper.style.width = `${tableColumnWidthSum}px`
        }
    }
}
