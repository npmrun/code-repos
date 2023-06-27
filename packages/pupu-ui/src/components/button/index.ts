import component from './button.vue'
import './style/button.scss'
import { withInstall } from '@/hooks'

const PuButton = withInstall('button', component)

export { PuButton }
export default PuButton
