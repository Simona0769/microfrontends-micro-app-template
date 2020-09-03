# 社管平台 - 统一门户

## Build Setup

```bash
# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## 项目说明
### 微应用配置说明
1. 系统基础配置（在src/settings.js）
* 微应用前缀 microAppPrefix = 'micro-app'
* 微应用名称 appName = 'tymh', 与主应用注册的一致

2. vue.confing 配置
* dev下，devServer允许跨域: disableHostCheck设为true， headers: {'Access-Control-Allow-Origin': '*'}
* webpack自定义output配置: 
    ```
    output: {
      // 把子应用打包成 umd 库格式
      library: `${defaultSettings.appName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${defaultSettings.appName}`
    }
    ```
3. 入口文件 main.js配置
   1. vue实例化封装成render方法
        ```
        function render(props = {}) {
            const { container } = props

            instance = new Vue({
                router,
                store,
                render: h => h(App)
            }).$mount(container ? container.querySelector('#app') : '#app')
        }
        ```
   2. export钩子函数
        ```
        export async function bootstrap() {
            console.log('[vue] vue app bootstraped')
        }

        export async function mount(props) {
            console.log('[vue] props from main framework', props)
            storeTest(props)
            render(props)
        }

        export async function unmount() {
            instance.$destroy()
            instance.$el.innerHTML = ''
            instance = null
            // router = null
        }
        ```
   
### 微应用环境判断
*全局变量 window.__POWERED_BY_QIANKUN__* 不为空，那么表明通过主平台访问，处理主平台逻辑，否则独立处理逻辑

### 项目开发注意事项
1. 新建页面
   1. 后台增加菜单数据
   2. @/views 新增页面
   3. @/router/router-map新增映射，映射规范如下
    ```
    export default {
        'notification/index': { // key为页面的hash值
            name: 'Notification', // vue文件中的组件name
            component: () => import('@/views/notification/index') // 对应的vue文件的路径
        }
    }

    ``` 
2. 按钮权限指令 -- 暂定，代码后续优化，按钮code不确定
   - 按钮code 
      - 新增：add
      - 编辑：edit
      - 删除：del
      - 查看：view
      - 作废：cancel
      - 启用：using
   - 权限指令使用 v-permission="权限数组"。例如：新增 v-permission="['add']"
  
3. ajax请求注意事项
   1. .env.XXX对应不同生产环境，修改对应的base_api，并且对应vue-config上的代理配置；带有*/vue-admin-template*认为是mock接口
   2. 原则上对应后端controller在@/src/api下简历对应的api.js，
   3. 默认不带加载效果，自己处理加载效果
   4. 若要带loading加载效果，请求request 设置 loadingText参数, 参照@/src/api/user.js的login请求接口
    ```
    export function login(data) {
        return request({
            url: '/vue-admin-template/user/login',
            method: 'post',
            data,
            loadingText: '正在登录中...'
        })
    }
    ```

4. 接口返回数据结构
```
{code:0,message:"操作成功"，data:{}}
{
    code:0,
    message:"操作成功",
    data:{
        dataList:[],
        currentPage:1,      // 当前页
        totalPage:10,       // 总页数
        totalCount:100000   // 总记录    
    }
}
```

4. 响应code
* 0:成功
* 1:失败 
* 401:登录过期 
* 403:没有权限

5. 样式规范
   1. 屏幕宽度最小1280 设计稿 1920 X 1080
   2. 左侧菜单栏以及头部面包屑导航保持一致
   3. 右边部分，响应式布局
      1. 基础单位rem。使用方式：引入func.scss， 设计稿量到n个px，那么使用 px2rem(n),就能获取对应的rem，若要保持px，直接用npx
      2. 若要转换其他单位，请参考func.scss提供的函数
        ```
        @function pxToVw($px, $px2: 1920) {
            @return $px / $px2 * 100vw;
        }
        @function pxToVh($px, $px2: 1080) {
            @return $px / $px2 * 100vh;
        }
        @function percentWidth($px, $px2: 1920) {
            @return $px / $px2 * 100%;
        }
        @function percentHeight($px, $px2: 1080) {
            @return $px / $px2 * 100%;
        }
        ```
6. 