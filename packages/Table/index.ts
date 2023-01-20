import { App, Plugin } from 'vue';
import Table from './src/table.vue';
import TableColumn from './src/table-column'
export const TablePlugin: Plugin = {
    install(app: App) {
        app.component('f-table', Table)
        app.component('f-table-column', TableColumn)
    },
};

export { Table, TableColumn };
