import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { microAppPrefix, appName } from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
const comparePath = (path1, path2) => {
  if (window.__POWERED_BY_QIANKUN__) {
    return path1 === `/${microAppPrefix}/${appName}${path2}`
  } else {
    return path1 === path2
  }
}
const handleNext = (to, next, replace = false, path) => {
  if (window.__POWERED_BY_QIANKUN__) {
    if (path) {
      if (!path.includes(`/${microAppPrefix}`)) {
        next(`/${microAppPrefix}/${appName}${path}`)
      } else {
        replace ? next({ ...to, replace }) : next()
      }
      return
    }
    if(!to.path.includes(`/${microAppPrefix}`)) {
      next({
        path: `/${microAppPrefix}/${appName}${to.path}`,
      })
    } else {
      replace ? next({ ...to, replace }) : next()
    }
    return
  }
  if (replace) {
    path ? next({path, replace: true}) : next({...to, replace: true})
  } else {
    path ? next(path) : next()
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (comparePath(to.path, '/login')) {
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      handleNext(to, next, false, '/')
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // next()
        handleNext(to, next, false)
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes')

          // dynamically add accessible routes
          console.log(accessRoutes)
          router.addRoutes(accessRoutes)
          // next({ ...to, replace: true })
          handleNext(to, next, true)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          if (window.__POWERED_BY_QIANKUN__) {
            // todo 主平台登录页
            next(`/login`)
          } else {
            next(`/login?redirect=${to.path}`)
          }
          // next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
