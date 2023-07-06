import component from './dialog.vue'
import './style/dialog.scss'
import { withInstall } from '@/hooks'

const PuDialog = withInstall('dialog', component)

export { PuDialog }
export default PuDialog
