import component from './mask.vue'
import './style/mask.scss'
import { withInstall } from '@/utils/withInstall'

const PuMask = withInstall('mask', component)

export { PuMask }
export default PuMask
