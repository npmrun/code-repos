import { App, Plugin, h, Component, ref, computed } from 'vue'
import collectdata from 'collectdata'

export interface Route {
    path: string
    component: Component | null
}

export function createRouter() {
    const currentPath = ref<string>()

    const realdata = computed<Record<string, any>>(() => {
        const result: Record<string, any> = {}
        Object.keys(collectdata).forEach((v) => {
            const relativePath = v
                .replace(/\\/g, '/')
                .replace(/\.md/g, '')
                .replace(/\.mdx/g, '')
            result[
                relativePath.startsWith('/') ? relativePath : '/' + relativePath
            ] = collectdata[v]
        })
        return result
    })
    console.log(realdata.value);
    
    return {
        install(app: App, opts?: any) {
            mountRouterView(app)
            listenRouteChange((path: string) => {
                console.log(path)
            })
        },
    } as Plugin

    function listenRouteChange(fn?: Function) {
        const initial = window.location.hash.slice(1) || '/'
        currentPath.value = initial
        fn && fn(currentPath.value)
        window.addEventListener('hashchange', () => {
            currentPath.value = window.location.hash.slice(1)
            fn && fn(currentPath.value)
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
                }
                return component && h(component)
            },
        })
    }
}
