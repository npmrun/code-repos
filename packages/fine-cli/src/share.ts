import path from 'node:path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import pkg from "../package.json"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const AppName = pkg.name
export const AppVersion = pkg.version
export const isDev = __DEV__

export const rootDir = path.resolve(__dirname, '../')
export const srcDir = path.resolve(rootDir, './src')
export const distDir = path.resolve(rootDir, './dist')
export const cwdDir = process.cwd()

export const clientDir = isDev
    ? path.resolve(srcDir, './client')
    : path.resolve(distDir, './client')

const DEFAULT_THEME_PATH = path.resolve(
    clientDir,
    './theme-default'
)
const CWD_THEME_PATH = path.resolve(cwdDir, `./.${AppName}/theme`)

export const themeDir = (await fs.pathExists(CWD_THEME_PATH))
    ? CWD_THEME_PATH
    : DEFAULT_THEME_PATH

export function findEntry(p: string, template: string = '@ENTRY') {
    if (p.endsWith('.ts') || p.endsWith('.js')) {
        return p
    }
    if (fs.pathExistsSync(path.resolve(p, 'index.ts'))) {
        return template.replace(/\@ENTRY/, path.resolve(p, 'index.ts'))
    }
    if (fs.pathExistsSync(path.resolve(p, 'index.js'))) {
        return template.replace(/\@ENTRY/, path.resolve(p, 'index.js'))
    }
}
