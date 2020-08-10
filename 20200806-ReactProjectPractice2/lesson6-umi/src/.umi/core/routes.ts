// @ts-nocheck
import { ApplyPluginsType } from '/Users/gaoshaoyun/workspace/kkb-react/lesson6-umi/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('/Users/gaoshaoyun/workspace/kkb-react/lesson6-umi/src/.umi/plugin-layout/Layout.tsx').default,
    "routes": [
      {
        "path": "/",
        "component": require('@/pages/layout/index').default,
        "routes": [
          {
            "path": "/",
            "component": require('@/pages/index').default,
            "exact": true
          },
          {
            "path": "/about",
            "component": require('@/pages/about').default,
            "exact": true
          },
          {
            "path": "/more",
            "component": require('@/pages/more/index').default,
            "exact": true
          },
          {
            "path": "/product/:id",
            "component": require('@/pages/product/_layout').default,
            "routes": [
              {
                "path": "/product/:id",
                "component": require('@/pages/product/[id]').default,
                "exact": true
              }
            ]
          },
          {
            "component": require('@/pages/404').default,
            "exact": true
          }
        ]
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
