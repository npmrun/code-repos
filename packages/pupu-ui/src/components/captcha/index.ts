import Captcha from './captcha.vue'
import './style/captcha.scss'
import { withInstall } from '@/hooks'

const PuCaptcha = withInstall("captcha", Captcha)

export default PuCaptcha
export { PuCaptcha }