
import RawTheme from '@theme/index'
import { defineComponent, h, createApp } from 'vue'

function resolveThemeExtends(theme: typeof RawTheme): typeof RawTheme {
    if (theme.extends) {
        const base = resolveThemeExtends(theme.extends)
        return {
            ...base,
            ...theme,
            async enhanceApp(app) {
                if (base.enhanceApp) await base.enhanceApp(app)
                if (theme.enhanceApp) await theme.enhanceApp(app)
            },
        }
    }
    return theme
}

const Theme = resolveThemeExtends(RawTheme)

const BaseApp = defineComponent({
    // name: 'VitePressApp',
    setup() {
        if (Theme.setup) Theme.setup()
        return () => h(Theme.Layout)
    },
})

function createClientApp() {
    let app = createApp(BaseApp);
    (async () => {
        if (Theme.enhanceApp) {
            await Theme.enhanceApp({
                app
            })
        }
    })()
    app.mount('#app')
}

if (!import.meta.env.SSR) {
    createClientApp()
}
