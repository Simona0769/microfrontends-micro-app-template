import { constantRoutes } from '@/router'
import routerMap from '@/router/router-map'
import Layout from '@/layout'
import SubFolder from '@/layout/sub-folder'
import { getMenu } from '@/api/sys-menu'
import { microAppPrefix, appName } from '@/settings'

const prefix = window.__POWERED_BY_QIANKUN__ ? `/${microAppPrefix}/${appName}/` : '/'
/**
 * @description 路由数据格式化
 * 1. 如果只有一层，那么套上layout
 * 2. 如果菜单有两层，子菜单只有一个，那么加入blank，
 * 3. 所有非叶子节点，加入blank
 */

export function formatRoutes(aMenu, isRoot = false, parentPath = '') {
  const aRouter = []
  for (let i = 0; i < aMenu.length; i++) {
    const oMenu = aMenu[i]
    const { menuId, icon, orderNum, name, list, perms, type } = oMenu
    if (type === 2) {
      continue
    }
    const menuUrl = oMenu.url || ''
    const isSingleMenu = isRoot && type === 1
    const _permissionsArr = []
    list.forEach(({ type, url }) => {
      if (type === 2) {
        _permissionsArr.push(url)
      }
    })
    const _permissions = _permissionsArr.join(':')
    let oRouter
    if (isSingleMenu) {
      oRouter = {
        key: menuId,
        path: `${prefix}${menuUrl}`,
        component: Layout,
        children: [
          {
            path: 'index',
            name: routerMap[menuUrl] ? routerMap[menuUrl].name : menuUrl + menuId,
            component: routerMap[menuUrl] ? routerMap[menuUrl].component : () => import('@/views/404'),
            meta: { title: name, icon: icon, perms, permissions: _permissions }
          }
        ]
      }
    } else {
      // const _name = getComponentName(menuUrl)
      oRouter = {
        key: menuId,
        path: isRoot ? `${prefix}${menuUrl}` : menuUrl,
        name: routerMap[`${parentPath}/${menuUrl}`] ? routerMap[`${parentPath}/${menuUrl}`].name : menuUrl + menuId,
        meta: { icon: icon, title: name, perms, permissions: _permissions },
        children: list && list.length > 0 ? formatRoutes(list, false, `${parentPath ? parentPath + '/' : ''}${menuUrl}`) : [],
        sort: orderNum,
        isDisabled: false
      }

      if (isRoot) {
        oRouter.component = Layout
      } else {
        if (type === 0) {
          oRouter.component = SubFolder
        } else {
          if (routerMap[`${parentPath}/${menuUrl}`]) {
            oRouter.component = routerMap[`${parentPath}/${menuUrl}`].component
          } else {
            oRouter.component = () => import('@/views/404')
          }
        }
      }
    }
    aRouter.push(oRouter)
  }
  if(!window.__POWERED_BY_QIANKUN__) {
    aRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
  }
  return aRouter
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
const state = {
  routerData: [],
  routes: [],
  addRoutes: [],
  permissions: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  generateRoutes({ commit, state }, orgId) {
    return new Promise((resolve, reject) => {
      getMenu().then(response => {
        if (response.code === 0) {
          const accessedRoutes = formatRoutes(response.data, true)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        } else {
          reject()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
