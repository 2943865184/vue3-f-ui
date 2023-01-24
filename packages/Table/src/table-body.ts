import { defineComponent, h } from 'vue'
export default defineComponent({
    name: 'f-table-body',
    props: ['store'],
    setup(props) {

        // 渲染table行数据
        return () => [
            h('div',
                {
                    class: 'f-table-body'
                },
                [
                    props.store.tableData.map((item: any) => {
                        let count: number = 0
                        // 遍历行数据
                        let tableLineData = Object.values(item)
                        return h('div',
                            {
                                class: 'f-table-line',
                                style: {
                                    display: 'flex'
                                }
                            },
                            [
                                tableLineData.map((item2: any) => {

                                    return h('div',
                                        {
                                            class: 'f-table-cell',
                                            style: {
                                                display: 'flex'
                                            }
                                        },
                                        [
                                            /**
                                             * 渲染插槽
                                             * slots:f-table-column
                                             */
                                            h('div', props.store.tableColumnSlots[count++].default()),
                                            item2
                                        ]
                                    )
                                })
                            ])
                    })
                ]),

        ]
    }
})