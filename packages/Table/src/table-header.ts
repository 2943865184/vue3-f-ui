import { defineComponent, h, onMounted ,ref} from 'vue'

export default defineComponent({
    name: 'f-table-header',
    props: ['store'],
    setup(props) {

        onMounted(() => {
          
            
            
        })
        return {
            props
        }
    },
    /**
     * 渲染table头部
     */
    render() {
        let count: number = 0
        return h(
            'div',
            {
                class: 'f-table-header',

                style: {
                    display: 'flex',
                    fontWeight: '700',
                    background: '#eee',
                    width: '100%'
                }
            },
            [
                this.props.store.tableColumnName.map((item: any) => {
                    return h(
                        'div',
                        {
                            style: {

                                display: 'inline-block',

                            }
                        },
                        item
                    )
                })
            ]
        )
    }
})