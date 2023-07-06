import { App, ref } from 'vue'
import CodeEditor from './index.vue'
import params from './params'

CodeEditor.name = params.name
CodeEditor.install = function (app: App, option = {}) {
    app.component(params.name, CodeEditor)
}

export { CodeEditor }
export default CodeEditor
