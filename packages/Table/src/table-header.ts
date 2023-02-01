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
        return h(
            'tr',
            { 
                class: 'f-table-header' 
            },
            [
                this.props.store.tableColumnName.map((cell: any) => {
                    return h(
                        'th',
                        {
                            class: 'f-table-cell'
                        },
                        cell
                    )
                })
            ]
        )
    }
})