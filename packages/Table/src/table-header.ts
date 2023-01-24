import { defineComponent, h } from 'vue'

export default defineComponent({
    name: 'f-table-header',
    props: ['store'],
    setup(props) {
        // 渲染table标题
        return () => h(
            'div',
            {
                class: 'f-table-header',

                style: {
                    display: 'flex'
                }
            },
            [
                props.store.tableHeader.map((item: any) => {
                    return h('div', {}, item)
                })
            ]
        )
    }
})