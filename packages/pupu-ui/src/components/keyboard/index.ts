import Keyboard from './keyboard.vue'
import './style/keyboard.scss'
import { withInstall } from '@/hooks'

const PuKeyboard = withInstall("keyboard", Keyboard)

export default PuKeyboard
export { PuKeyboard }