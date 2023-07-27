import { createServer, searchForWorkspaceRoot, build, InlineConfig } from 'vite'
import { clientDir, cwdDir, findEntry, themeDir } from './share'
import { vitePluginVirtualEntry } from './node/plugins/entry'
import { buildEntry } from './node/plugins/buildEntry'
import Sitedata from './node/plugins/sitedata'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'

const config: InlineConfig = {
    root: clientDir,
    server: {
        port: 3366,
        host: '0.0.0.0',
        fs: {
            allow: [cwdDir, clientDir, searchForWorkspaceRoot(cwdDir)],
        },
    },
    define: {},
    resolve: {
        alias: {
            '@': clientDir,
            root: path.resolve(cwdDir),
            '@theme': themeDir,
        },
    },
    optimizeDeps: {
        include: ['process/browser'], // process/browser不是es模块
        exclude: ['fine-cli'],
    },
    plugins: [
        vitePluginVirtualEntry(),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Sitedata(),
        inject({
            process: 'process/browser',
        }),
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
