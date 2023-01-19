import { App, Plugin } from 'vue';

import { ButtonPlugin } from './Button';
import { LinkPlugin } from './Link';

const KitPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
    LinkPlugin.install?.(app);
  },
};

export default KitPlugin;

export * from './Button';
export * from './Link'
