import { App, Plugin } from 'vue';

import { ButtonPlugin } from './Button';

const KitPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
  },
};

export default KitPlugin;

export * from './Button';
