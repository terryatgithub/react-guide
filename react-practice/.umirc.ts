import { defineConfig } from 'umi';

//所有关于umi的配置项都会在这里使用
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    //配置路由
    {
      path: '/',
      component: '@/layouts/BasicLayout',      
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/cart', component: '@/pages/cart/index' },
        { path: '/olist', component: '@/pages/olist/index' },
        { path: '/user', component: '@/pages/user/index' },
        { path: '/login', component: '@/pages/login/index' },
      ],
    },
  ],
});
