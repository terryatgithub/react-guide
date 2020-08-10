// @ts-nocheck
import { Plugin } from '/Users/gaoshaoyun/workspace/kkb-react/lesson6-umi/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['modifyClientRenderOpts','patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','layout','request',],
});
plugin.register({
  apply: require('/Users/gaoshaoyun/workspace/kkb-react/lesson6-umi/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/gaoshaoyun/workspace/kkb-react/lesson6-umi/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('@@/plugin-layout/runtime.tsx'),
  path: '@@/plugin-layout/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
