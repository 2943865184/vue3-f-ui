import { Slots, ref, Ref, UnwrapRef } from 'vue'
type sizeClassKeys = 'defaultSize' | 'largeSize' | 'smallSize'
type typeClassKeys = 'defaultType' | 'primaryType' | 'successType' | 'infoType' | 'warningType' | 'dangerType'
type underlineClassKeys = 'deleteUnderline'
export type sizeClass = { [key in sizeClassKeys]?: boolean }
export type typeClass = { [key in typeClassKeys]?: boolean }
export type underlineClass = { [key in underlineClassKeys]: boolean }

export interface buttonProps {
    size?: 'default' | 'large' | 'small'
    type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
}
export interface TablePropsObject {
    [key: string]: string
}

export interface TableProps {
    data: Array<TablePropsObject>
    width: string | undefined
}

export interface VueDomChildren {
    namedItem: (name: string) => Element | null
    item: (index: number) => Element | null

}

export interface VueDomValue extends Element {
    children: Array<VueDom> & VueDomChildren
    style: CSSStyleDeclaration
}

export interface VueDom extends HTMLInputElement {
    value: string & VueDomValue
    children: Array<VueDomValue> & VueDomChildren

}

export interface store {
    tableColumnName: Array<string>
    tableColumnData: Array<object>
    tableColumnSlots: Array<object>
    tableColumnProp: Array<string>
    tableColumnWidth: Array<string>
    tableWidth: string | undefined
}



/**
 * 组件类型判断api
 * @param props 
 * @returns 
 */
export function typeJudge(props: buttonProps): typeClass {

    let typeClass: typeClass = {}

    switch (true) {
        case props.type == 'primary':
            typeClass.primaryType = true
            break;
        case props.type == 'success':
            typeClass.successType = true
            break;
        case props.type == 'info':
            typeClass.infoType = true
            break;
        case props.type == 'warning':
            typeClass.warningType = true
            break;
        case props.type == 'danger':
            typeClass.dangerType = true
            break;
        default:
            typeClass.defaultType = true
            break
    }
    return typeClass
}
/**
 * 组件大小判断api
 * @param props 
 * @returns 
 */
export function sizeJudge(props: buttonProps): sizeClass {
    let buttonSizeClass: sizeClass = {}

    if (props.size == 'large') {
        buttonSizeClass.largeSize = true
    } else if (props.size == 'small') {
        buttonSizeClass.smallSize = true
    } else {
        buttonSizeClass.defaultSize = true
    }

    return buttonSizeClass
}
/**
 * table组件数据处理
 * @return store 处理完毕后的数据存放对象
 */
export function getTableRenderData(slots: Slots, props: TableProps): store {
    let store: store = {
        tableColumnName: [],  // 列名
        tableColumnData: [],  // 表格渲染数据
        tableColumnSlots: [], // 表格列插槽
        tableColumnProp: [],  // 表格列传入的数据
        tableColumnWidth: [], // 表格列宽度
        tableWidth: ''
    }
    // table宽度
    store.tableWidth = props.width

    if (slots?.default) {
        slots.default().find((item: any) => {

            // 列名
            if (item.props.label) {
                store.tableColumnName?.push(item.props.label)
            } else {
                store.tableColumnName?.push('')
            }

            // 列数据源的key名
            if (item.props.prop) {
                store.tableColumnProp?.push(item.props.prop)
            } else {
                store.tableColumnProp?.push('')
            }

            // 列宽度
            if (item.props.width) {
                store.tableColumnWidth?.push(item.props.width)
            } else {
                store.tableColumnWidth?.push('')
            }


            // 列插槽
            store.tableColumnSlots?.push(item.children)

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
export function widthSynchronization<T extends VueDomValue | undefined>(headerDom: T, bodyDom: T): T {

    if (bodyDom && headerDom) {

        let tableHeaderCell = headerDom.children // table头部的单元格
        let tableFirstRowCell = bodyDom.children[0].children // table第一行的单元格（横）

        for (let i = 0; i < tableFirstRowCell.length; i++) {
            tableHeaderCell[i].style.width = `${tableFirstRowCell[i].scrollWidth}px`
        }
    }

    return headerDom
}

/**
 * 作用：当列未设置宽度时，列的宽度会被设置为该列中宽度最大的单元格的宽度
 */
// export function columnWidthAdaptive<T extends VueDom | null>(bodyDom: T, store: store) {

//     if (bodyDom) {

//         const TABLE_BODY = bodyDom.children[0] // table主体

//         // 遍历出未设置宽度的列
//         for (const key in store.tableColumnWidth) {
//             const TABLE_COLUMN = TABLE_BODY.children // table的列（竖）
//             let tempWidth: number = 0

//             // 处理未设置宽度的列
//             if (!store.tableColumnWidth[parseInt(key)]) {

//                 // 遍历指定列中宽度最大的单元格，并保存其宽度
//                 for (let i = 0; i < TABLE_COLUMN.length; i++) {

//                     const TABLE_COLUMN_CELL = TABLE_BODY.children[i].children[parseInt(key)] // table列中的单元格

//                     if (i == 0) {
//                         tempWidth = TABLE_COLUMN_CELL.clientWidth

//                     } else {
//                         if (TABLE_COLUMN_CELL.clientWidth > tempWidth) {
//                             tempWidth = TABLE_COLUMN_CELL.clientWidth
//                         }
//                     }

//                 }
//                 // 将指定列的宽度和该列中宽度最大的单元格宽度进行同步
//                 for (let i = 0; i < TABLE_BODY.children.length; i++) {
//                     const TABLE_COLUMN_CELL = TABLE_BODY.children[i].children[parseInt(key)] // 列的单元格

//                     TABLE_COLUMN_CELL.style.width = `${tempWidth}px`

//                 }
//             }
//         }
//     }
// }

/**
 * 设置table样式
 * 
 */
export function setTableStyle<T extends VueDomValue>(tableWrapper: T, store: store) {


    let tableHeader = tableWrapper.children[0].children
    let tableBody = tableWrapper.children[1].children[0].children
    /**
     * 设置table宽度
     */
    if (tableWrapper && store.tableWidth) {
        tableWrapper.style.width = store.tableWidth
    }

    /**
     * 设置table列宽度
     */
    for (let index = 0; index < tableBody.length; index++) {
        let tableRow = tableBody[index].children
    
        for (let index2 = 0; index2 < tableRow.length; index2++) {
            let tableCell = tableRow[index2]

            tableCell.style.width = store.tableColumnWidth[index2]
            
        }

    }



}