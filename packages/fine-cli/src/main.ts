import {
    createServer,
    searchForWorkspaceRoot,
    build,
    InlineConfig,
    normalizePath,
} from 'vite'
import { clientDir, cwdDir, findEntry, themeDir } from './share'
import { vitePluginVirtualEntry } from './node/plugins/entry'
import { buildEntry } from './node/plugins/buildEntry'
import Sitedata from './node/plugins/sitedata'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'

const config: InlineConfig = {
    root: clientDir,
    server: {
        port: 3366,
        fs: {
            allow: [cwdDir, clientDir, searchForWorkspaceRoot(cwdDir)],
        },
    },
    resolve: {
        alias: {
            '@': clientDir,
            root: path.resolve(cwdDir),
            '@theme': themeDir,
        },
    },
    optimizeDeps: {
        exclude: ['fine-cli'],
    },
    plugins: [
        {
            name: 'replace-data-plugin',
            enforce: 'pre',
            transform(code, id, options?) {
                if (
                    id.includes(normalizePath(cwdDir)) ||
                    id.includes(normalizePath(clientDir)) // && !id.includes('node_modules')//TOOD 打包后这里肯定是在node_modules中
                ) {
                    code = code.replace(
                        new RegExp('__DATA__', 'g'),
                        'root/**/*.md'
                    )
                }
                return code
            },
        },
        vitePluginVirtualEntry(),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown(),
        Sitedata(),
    ],
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                app: findEntry(clientDir),
            },
            output: {
                dir: path.resolve(cwdDir, '.output'),
            },
            plugins: [buildEntry()],
        },
    },
}

const server = await createServer(config)
await server.listen()
server.printUrls()

// build(config)
