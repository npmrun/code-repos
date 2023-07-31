import {
    App,
    Plugin,
    h,
    Component,
    ref,
    shallowRef,
    reactive,
    computed,
    watch,
    watchEffect,
} from 'vue'
import sitedata from 'sitedata'
import path from 'path-browserify'

export interface Route {
    path: string
    component: Component | null
}

const currentPath = ref<string>()

const basicdata = import.meta.glob('root/**/*.md', { eager: true })
console.log(basicdata); 

const realdata = computed<Record<string, any>>(() => {
    const result: Record<string, any> = {}
    Object.keys(basicdata).forEach((v) => {
        // https://github.com/browserify/path-browserify/issues/29#issuecomment-1600002373
        // @ts-ignore
        path.cwd = () => {
            return sitedata.cwdDir
        }
        const relativePath = path
            .resolve(sitedata.clientDir, v.slice(1))
            .replace(sitedata.cwdDir, '')
            .slice(1)
            .replace(/\\/g, '/')
            .replace(/\.md/g, '')
            .replace(/\.mdx/g, '')
        result[
            relativePath.startsWith('/') ? relativePath : '/' + relativePath
        ] = basicdata[v]
    })
    console.log(result);
    
    return result
})

export default {
    install(app: App, opts?: any) {
        mountRouterView(app)
        listenRouteChange()
    },
} as Plugin

function listenRouteChange() {
    const initial = window.location.hash.slice(1) || '/'
    currentPath.value = initial
    window.addEventListener('hashchange', () => {
        currentPath.value = window.location.hash.slice(1)
    })
}

function mountRouterView(app: App) {
    // 注册全局组件 router-view
    app.component('router-view', {
        render() {
            let component = null
            if (currentPath.value) {
                let cur = realdata.value[currentPath.value]
                component = cur?.default
                console.log(cur)
            }
            return component && h(component)
        },
    })
}
