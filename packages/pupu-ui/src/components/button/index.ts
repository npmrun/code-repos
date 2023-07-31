import component from './button.vue'
import './style/button.scss'
import { withInstall } from '@/utils/withInstall'

const PuButton = withInstall('button', component)

export { PuButton }
export default PuButton
