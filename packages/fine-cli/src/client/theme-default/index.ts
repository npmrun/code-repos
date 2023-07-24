import { App } from 'vue'
import Layout from './Layout.vue'
import site from "sitedata"

export default {
    Layout,
    enhanceApp({ app }: { app: App }) {
        console.log(site);
        console.log(111);

        // app.use(FUI)
    },
}
