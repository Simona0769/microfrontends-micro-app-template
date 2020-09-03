import './public-path'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

import './components/install'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  // locale,
  size: 'mini' // element 组件都设为 mini size
})

// 指令
import DirectivePimission from '@/directive/permission'
Vue.use(DirectivePimission)

// 自定义组件引用
// 搜索区域
import ImSearchPad from '@/components/ImSearchPad/index'
Vue.use(ImSearchPad)
// 搜索区域条目
import ImSearchPadItem from '@/components/ImSearchPadItem/index'
Vue.use(ImSearchPadItem)
// 列表页的列表布局上的按钮工具栏
import ImToolBar from '@/components/ImToolBar/index'
Vue.use(ImToolBar)
// 列表页的列表布局上的表格
import ImTable from '@/components/ImTable/index'
Vue.use(ImTable)
// 分页表格
import ImTablePage from '@/components/ImTablePage/index'
Vue.use(ImTablePage)
// 列表页的列表布局上的分页组件
import ImPagination from '@/components/ImPagination/index'
Vue.use(ImPagination)

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })

// let router = null;
let instance = null

function render(props = {}) {
  const { container } = props

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

function handleStore(props) {
  // 保存app name和entry
  store.dispatch('micro-app-setting/changeMicroSetting', {name: props.name, entry: props.entry})
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  handleStore(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  // router = null
}
