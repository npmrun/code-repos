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
