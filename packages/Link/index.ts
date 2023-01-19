import { App, Plugin } from 'vue';
import Link from './src/index.vue';

export const LinkPlugin: Plugin = {
    install(app: App) {
        app.component('f-link', Link);
    },
    
};

export { Link };
