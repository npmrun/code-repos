import { App, Plugin, h, Component, ref, computed } from 'vue'

export interface Route {
    path: string
    component: Component | null
}

export function createRouter() {
    const currentPath = ref<string>()

    const basicdata = import.meta.glob('__DATA__', { eager: true })

    const realdata = computed<Record<string, any>>(() => {
        const result: Record<string, any> = {}
        Object.keys(basicdata).forEach((v) => {
            const relativePath = v
                .replace(/\\/g, '/')
                .replace(/\.md/g, '')
                .replace(/\.mdx/g, '')
            result[
                relativePath.startsWith('/') ? relativePath : '/' + relativePath
            ] = basicdata[v]
        })
        return result
    })

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
