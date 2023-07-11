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
    import { App, Component } from 'vue'
    interface Theme {
        extends?: Theme
        setup(): void
        Layout: Component
        enhanceApp?: (ctx: { app: App }) => any
    }
    const theme: Theme
    export default theme
}

declare module 'markdown-it-task-lists' {
    const taskLists: any
    export default taskLists
}
declare module 'markdown-it-meta' {
    const MarkdownIt: any
    export default MarkdownIt
}
declare module 'markdown-it-footnote' {
    const MarkdownIt: any
    export default MarkdownIt
}

declare module 'markdown-it' {
    const MarkdownIt: any
    export default MarkdownIt
}
