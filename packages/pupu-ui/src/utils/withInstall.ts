import { App, Component } from 'vue'

type TComponent = Component & {
    name: string
    install(app: App, options: any): void
}

function withInstall(name: string, comp: Component): TComponent {
    let newComp = comp as TComponent
    newComp.name = `pu-${name}`
    newComp.install = function (app: App, options: any) {
        app.component(`pu-${name}`, comp)
    }
    return newComp
}

export { withInstall }

// import type { Plugin } from 'vue'

// export type SFCWithInstall<T> = T & Plugin
// export const withInstall = <T, E extends Record<string, any>>(
//     main: T,
//     extra?: E
// ) => {
//     ;(main as SFCWithInstall<T>).install = (app): void => {
//         for (const comp of [main, ...Object.values(extra ?? {})]) {
//             app.component(comp.name, comp)
//         }
//     }

//     if (extra) {
//         for (const [key, comp] of Object.entries(extra)) {
//             ;(main as any)[key] = comp
//         }
//     }
//     return main as SFCWithInstall<T> & E
// }
