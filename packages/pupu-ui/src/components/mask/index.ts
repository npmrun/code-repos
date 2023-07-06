import component from './mask.vue'
import './style/mask.scss'
import { withInstall } from '@/hooks'

const PuMask = withInstall('mask', component)

export { PuMask }
export default PuMask
