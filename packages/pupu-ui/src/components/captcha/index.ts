import Captcha from './captcha.vue'
import './style/captcha.scss'
import { withInstall } from '@/utils/withInstall'

const PuCaptcha = withInstall("captcha", Captcha)

export default PuCaptcha
export { PuCaptcha }