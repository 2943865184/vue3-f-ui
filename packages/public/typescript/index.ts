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

