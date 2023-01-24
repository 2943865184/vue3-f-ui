import { Slots } from 'vue'
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

interface columnData {
    title: string
    data: Array<string | number | boolean>,
    children: []
}


export interface store {
    tableHeader?: Array<string>
    tableData?: Array<object>
    tableColumnSlots?: Array<object>
    tableColumnProp?: Array<string>
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
 * 获取表格渲染数据
 * @return tableList 表格数据
 */
export function getTableRenderData(slots: Slots, props: TableProps): store {
    let tableList: store = {
        tableHeader: [],
        tableData: [],
        tableColumnSlots: [],
        tableColumnProp: []
    }
    if (slots?.default) {
        slots.default().find((item: any) => {
            // console.log(item.props?.label);

            if (item.props?.label && item.props?.prop) {
                console.log(1);

                // 获取列标题
                if (item.props?.label) {
                    tableList.tableHeader?.push(item.props.label)
                }
                // 获取列prop
                if (item.props?.prop) {
                    tableList.tableColumnProp?.push(item.props.prop)
                }

                // 获取插槽
                tableList.tableColumnSlots?.push(item.children)

            }


        })

        // 处理表格数据
        let arr = []
        for (const key in props.data) {
            let tempArr = []

            for (const key2 in tableList.tableColumnProp) {

                if (props.data[key][tableList.tableColumnProp[parseInt(key2)]]) {

                    tempArr.push(props.data[key][tableList.tableColumnProp[parseInt(key2)]])
                } else {
                    tempArr.push('')
                }
            }
            arr.push(tempArr)
            tempArr = []
        }
        tableList.tableData = arr
    }

    return tableList

}
