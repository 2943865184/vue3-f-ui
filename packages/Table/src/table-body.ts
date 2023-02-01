import { defineComponent, h, onMounted, render, ref, onUpdated } from 'vue'
export default defineComponent({
    name: 'f-table-body',
    props: ['store'],
    setup(props) {

        return {
            props
        }

    },
    /**
     * 渲染table身体
     */
    render() {
        let { props } = this
        let count: number

        
        
        return h(
            'div',
            {
                class: 'f-table-body',
                
            },
            [
                props.store.tableColumnData.map((column: any) => {

                    count = -1
                    return h(
                        'tr',
                        {
                            class: 'f-table-row',
                        },
                        [
                            column.map((cell: any) => {
                                count++
                                return h(
                                    'td',
                                    {
                                        class: 'f-table-cell',
                                    },
                                    [
                                        /**
                                        * 渲染插槽
                                        * slots:f-table-column
                                        */
                                        h(
                                            'div',
                                            {
                                                style: {
                                                    display: 'inline-block',
                                                }
                                            },
                                            props.store.tableColumnSlots[count]?.default()
                                        ),
                                        cell
                                    ]
                                )
                            })
                        ]
                    )

                })
            ]
        )
        // return h(
        //     'div',
        //     {
        //         class: 'f-table-body',
        //         style: {
        //             display: 'flex',
        //         }
        //     },
        //     [
        //         props.store.tableColumnData.map((columnData: any) => {
        //             count++

        //             return h(
        //                 'div',
        //                 {
        //                     class: 'f-table-column',
        //                     style: {
        //                         display: 'inline-block',
        //                         width: props.store.tableColumnWidth[count],
        //                         overflow:'hidden'
        //                     }
        //                 },
        //                 [
        //                     columnData.map((cell: any) => {

        //                         return h(
        //                             'div',
        //                             {
        //                                 class: 'f-table-cell',
        //                                 style: {
        //                                     'white-space': 'nowrap'
        //                                 }
        //                             },
        //                             [
        //                                 /**
        //                                 * 渲染插槽
        //                                 * slots:f-table-column
        //                                 */
        //                                 h(
        //                                     'div',
        //                                     {
        //                                         style: {
        //                                             display: 'inline-block',

        //                                         }
        //                                     },
        //                                     props.store.tableColumnSlots[count]?.default()
        //                                 ),
        //                                 cell
        //                             ]
        //                         )

        //                     })

        //                 ]

        //             )

        //         })

        //     ]
        // )

        // return h('div',
        //     {
        //         ref: 'tableBody',
        //         class: 'f-table-body'
        //     },
        //     [
        //         this.props.store.tableData.map((item: any) => {
        //             let count: number = 0
        //             // 遍历行数据
        //             let tableLineData = Object.values(item)
        //             return h('div',
        //                 {
        //                     class: 'f-table-line',
        //                     style: {
        //                         display: 'flex'
        //                     }
        //                 },
        //                 [
        //                     tableLineData.map((item2: any) => {

        //                         return h('div',
        //                             {
        //                                 class: 'f-table-cell',
        //                                 style: {
        //                                     display: 'flex',
        //                                     // width: props.store.tableColumnWidth[count],
        //                                 }
        //                             },
        //                             [
        //                                 /**
        //                                  * 渲染插槽
        //                                  * slots:f-table-column
        //                                  */
        //                                 h('div', this.props.store.tableColumnSlots[count++].default()),
        //                                 item2
        //                             ]
        //                         )
        //                     })
        //                 ]
        //             )
        //         })
        //     ]
        // )

    }
})