import component from './<%= componentName %>.vue'
import './style/<%= componentName %>.scss'
import { withInstall } from '@/hooks'

const <%= componentVar %> = withInstall('<%= componentName %>', component)

export { <%= componentVar %> }
export default <%= componentVar %>
