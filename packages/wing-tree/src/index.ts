import { App, ref } from 'vue'
import WingTree from './tree.vue'
import params from './params'
import "./style.scss"

export * from "./util"
export * from "./type"

WingTree.name = params.name
WingTree.install = function (app: App, option = {}) {
    app.component(params.name, WingTree)
}

export { WingTree }
export default WingTree
