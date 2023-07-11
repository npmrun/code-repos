import { createServer, searchForWorkspaceRoot, build, InlineConfig } from 'vite'
import { clientDir, cwdDir, findEntry, themeDir } from './share'
import { vitePluginVirtualEntry } from './node/plugins/entry'
import { buildEntry } from './node/plugins/buildEntry'
import path from 'path'
import Vue from '@vitejs/plugin-vue'

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
            '@theme': themeDir,
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
