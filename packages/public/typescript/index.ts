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
}

export interface VueDomValue extends Element {
    children: Array<VueDom> & VueDomChildren
    
}
export interface VueDomChildren {
    namedItem: (name: string) => Element | null
    item: (index: number) => Element | null

}

export interface VueDom extends HTMLInputElement {
    value: string & VueDomValue
    children: Array<VueDomValue> & VueDomChildren

}




interface columnData {
    title: string
    data: Array<string | number | boolean>,
    children: []
}


export interface store {
    tableColumnName?: Array<string>
    tableColumnData?: Array<object>
    tableColumnSlots?: Array<object>
    tableColumnProp?: Array<string>
    tableColumnWidth?: Array<string>
    testData?: Array<TablePropsObject>
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
        tableColumnName: [],      // 列名
        tableColumnData: [],  // 表格渲染数据
        tableColumnSlots: [], // 表格列插槽
        tableColumnProp: [],  // 表格列传入的数据
        tableColumnWidth: [],  // 表格列宽度
        testData: []
    }


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
            let tempArr: any = []

            for (const key2 in props.data) {

                if (props.data[key2][store.tableColumnProp[key]]) {
                    tempArr.push(props.data[key2][store.tableColumnProp[key]])
                } else {
                    tempArr.push('')
                }

            }
            store.tableColumnData?.push(tempArr)
        }
    }

    return store

}
/**
 * header 和 body 列宽度同步
 * @param bodyDom 
 * @param headerDom 
 */
export function widthSynchronization<T extends VueDom | null>(headerDom: T, bodyDom: T): T {

    if (bodyDom && headerDom) {
        for (let i = 0; i < bodyDom.children[0].children.length; i++) {

            headerDom.children[0].children[i].style.width = `${bodyDom?.children[0].children[i].clientWidth}px`

        }
    }

    return headerDom
}