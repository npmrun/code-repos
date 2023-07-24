import { clientDir, cwdDir } from '@/share'
import { Plugin } from 'vite'

const SITEDATA_ID = 'SITEDATA_ID'
const BASICDATA_ID = 'BASICDATA_ID'

export default function (): Plugin {
    return {
        name: 'vite-plugin-sitedata',
        resolveId(id) {
            if (id && id === 'sitedata') return SITEDATA_ID
            if (id && id === 'basicdata') return BASICDATA_ID
            return null
        },
        load(id) {
            if (id === SITEDATA_ID) {
                return {
                    code: `export default ${JSON.stringify({
                        sitename: 'YSir',
                        clientDir: clientDir,
                        cwdDir: cwdDir,
                    })}`,
                }
            }
            if (id === BASICDATA_ID) {
                return {
                    code: `export default import.meta.glob('root/**/*.md', { eager: true, as: 'raw' })`,
                }
            }
        },
    }
}
