<template>
    <div class="f-table">
        <slot></slot>
        <tableColumn></tableColumn>
    </div>
</template>
<script lang="ts" >
import { onBeforeMount, defineComponent } from 'vue'
import { typeJudge, typeClass } from '../../public/typescript/index'
import { underlineClass } from '../../public/typescript/index'
import tableColumn from './table-column'

export default defineComponent({
    props: ['data'],
    setup(props) {

        function initialization() { }
        return {
            initialization
        }
    },
    onBeforeMount() {
        this.initialization()
    }
})



</script>

<style>
.f-table {
    display: flex;
}
</style>