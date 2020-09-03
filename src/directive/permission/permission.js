
/**
 * 按钮权限指令
 * 获取当前路由的meta中的permissions与传入的权限做对比，如果无权限，则不append到dom上。
 */
// import store from '@/store'
import router from '@/router'

export default {
  inserted(el, binding, vnode) {
    // console.log(router.history.current)
    const { value } = binding
    // const permissions = store.getters && store.getters.permissions
    // 当前页面所有按钮权限
    const permissions = router.history.current.meta.permissions
    if (value && value instanceof Array && value.length > 0) {
      // 当前按钮所需权限
      const pm = value

      const hasPermission = permissions.some(role => {
        return pm.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need page rescode! Like v-permission="$route.meta.permissionResCode"`)
    }
  }
}
