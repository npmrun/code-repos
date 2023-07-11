/// <reference types="vite/client" />

declare module '*.vue' {
    import type { Component, ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}

declare module '*.md' {
    import type { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}

declare module '@theme/index' {
    import { App, Component } from "vue"
    interface Theme {
        extends?: Theme,
        setup(): void,
        Layout: Component,
        enhanceApp?: (ctx: {
            app: App,
        }) => any
    }
    const theme: Theme
    export default theme
}
