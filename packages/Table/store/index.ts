import { Slots } from 'vue'
import { VueDom, TableDomStore, store, TableProps } from '../src/index'
import { getColumn, getRenderData, sameIndexMerge } from './helper'



/**

 */
export function getStore(slots: Slots, props: TableProps): store {
    const store: store = {
        tableColumn: [],
        tableRow: [],
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

            if (item.props && typeof item.type == 'object') {
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
                        columnIndex: count,
                        columnWidth: 0
                    })
                }

                // 列插槽
                if (item.children) {
                    store.tableColumnSlots.push(item.children)
                } else {
                    store.tableColumnSlots.push({})
                }

                count++

            }

        })

    }
    // 处理渲染数据
    store.tableColumnData = getRenderData(store.tableColumnProp, props.data)


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
 * tableDom库
 * 存储了table的各种节点Dom
 */
export function getTableDomStore<T extends VueDom | null>(table: T): TableDomStore {
    const tableWrapper = table
    const tableInnerWrapper = table?.children[0]                              // table内部封装
    const tableHeaderWrapper = tableInnerWrapper?.children[0]                 // tableHeader封装
    const tableBodyWrapper = tableInnerWrapper?.children[1]                   // tableBody封装
    const tableHeader = tableHeaderWrapper?.children[0]                       // tableHeader
    const tableBody = tableBodyWrapper?.children[0]                           // tableBody
    const tableHeaderRows = tableHeader?.children                             // tableHeader行
    const tableBodyRows = tableBody?.children                                 // tableBody行
    const tableHeaderColumns = getColumn(tableHeader)                         // tableHeader列
    const tableBodyColumns = getColumn(tableBody)                             // tableBody列
    const tableColumns = sameIndexMerge(tableHeaderColumns, tableBodyColumns) // table列

    return {
        tableWrapper,
        tableInnerWrapper,
        tableHeaderWrapper,
        tableBodyWrapper,
        tableHeader,
        tableBody,
        tableHeaderRows,
        tableBodyRows,
        tableHeaderColumns,
        tableBodyColumns,
        tableColumns
    }

}

