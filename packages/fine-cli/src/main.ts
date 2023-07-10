import { createServer, searchForWorkspaceRoot, build, InlineConfig } from 'vite'
import { clientDir, cwdDir, findEntry } from './share'
import { vitePluginVirtualEntry } from './node/plugins/entry'
import { buildEntry } from './node/plugins/buildEntry'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const config: InlineConfig = {
    root: clientDir,
    server: {
        port: 3366,
        host: '0.0.0.0',
        fs: {
            allow: [cwdDir, clientDir, searchForWorkspaceRoot(cwdDir)],
        },
    },
    optimizeDeps: {
        exclude: ['fine-cli'],
    },
    plugins: [
        vitePluginVirtualEntry(),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown(),
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
