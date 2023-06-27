import { withInstall } from "@/hooks"
import SendCode from "./send-code.vue"

const PuSendCode = withInstall("send-code", SendCode)

export default PuSendCode
export { PuSendCode }