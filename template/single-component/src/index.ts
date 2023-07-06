import { App, ref } from 'vue'
import <%= componentVar %> from './index.vue'
import params from './params'

<%= componentVar %>.name = params.name
<%= componentVar %>.install = function (app: App, option = {}) {
    app.component(params.name, <%= componentVar %>)
}

export { <%= componentVar %> }
export default <%= componentVar %>
