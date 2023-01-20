

import { onBeforeMount, defineComponent } from 'vue'
import { typeJudge, typeClass } from '../../public/typescript/index'
import { underlineClass } from '../../public/typescript/index'

export default defineComponent({
    name: "FTableColumn",
    props: ['prop', 'label'],
    setup(props) {



        function initialization() {

        }

        onBeforeMount(() => {
            initialization()
        })

    }

})




