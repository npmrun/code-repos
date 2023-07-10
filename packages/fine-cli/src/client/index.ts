import { createApp } from "vue";
import HelloWorld from './readme.md'
import "./style.scss"

console.log(11)
console.log(HelloWorld)

const app = createApp(HelloWorld)

app.mount("#app")