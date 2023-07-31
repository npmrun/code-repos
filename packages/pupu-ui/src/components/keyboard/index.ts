import Keyboard from './keyboard.vue'
import './style/keyboard.scss'
import { withInstall } from '@/utils/withInstall'

const PuKeyboard = withInstall("keyboard", Keyboard)

export default PuKeyboard
export { PuKeyboard }