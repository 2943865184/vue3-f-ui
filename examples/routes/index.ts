import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes = [
    {
        title: '按钮',
        name: 'Button',
        path: '/components/Button',
        component: () => import(`../../packages/Button/docs/README.md`)
    },
    {
        title: '链接',
        name: 'Link',
        path: '/components/Link',
        component: () => import(`../../packages/Link/docs/README.md`)
    },
    {
        title: '列表',
        name: 'Table',
        path: '/components/Table',
        component: () => import(`../../packages/Table/docs/README.md`)
    }
];

const routerConfig = {
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to: any, from: any) {
        if (to.path !== from.path) {
            return { top: 0 };
        }
    },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;
