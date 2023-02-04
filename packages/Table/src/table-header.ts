import { defineComponent, h, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'f-table-header',
    props: ['store'],
    setup(props) {

        return {
            props
        }
    },
    /**
     * 渲染table头部
     */
    render() {
        let { props } = this
        if (props.store.tableIsHeader == undefined || props.store.tableIsHeader == false) {
            return h(
                'div',
                {
                    class: 'f-table-header'
                },
                h(
                    'tr',
                    {
                        class: 'f-table-row'
                    },
                    [
                        this.props.store.tableColumnName.map((cell: any) => {
                            return h(
                                'th',
                                {
                                    class: 'f-table-cell'
                                },
                                [
                                    h(
                                        'div',
                                        {
                                            class: 'cell'
                                        },
                                        cell

                                    )
                                ]
                            )
                        })
                    ]
                )
            )

        }
    }
})