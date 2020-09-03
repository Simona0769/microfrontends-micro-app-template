import Vue from 'vue'
import Router from 'vue-router'
import { microAppPrefix, appName } from '@/settings'
import routerMap from '@/router/router-map'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const prefix = window.__POWERED_BY_QIANKUN__ ? `/${microAppPrefix}/${appName}/` : '/'
export const constantRoutes = [
  {
    path: `${prefix}login`,
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: `${prefix}404`,
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: `${prefix === '/' ? '/' : prefix.substring(0, prefix.length - 1)}`,
    component: Layout,
    redirect: `/notification`,
    meta: { title: '门户首页设置', icon: 'smp-nav-icon smp-ni-leftbar_jcyj' },
    children: [
      {
        path: 'layout-setting',
        name: 'LayoutSetting',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '布局设置' }
      },
      {
        path: 'column-setting',
        name: 'ColumnSetting',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '栏目设置' }
      },
      {
        path: 'app-market',
        name: 'AppMarket',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '应用集市' },
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '布局设置' }
          },
          {
            path: 'menu2',
            name: 'Menu2',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '布局设置' }
          },
          {
            path: 'menu3',
            name: 'Menu3',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '布局设置' }
          }
        ]
      },
      {
        path: 'notification',
        name: 'Notification',
        component: routerMap['notification'].component,
        meta: { title: '通知管理' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: `${prefix}*`, redirect: `${prefix}404`, hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
