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
import chokidar from 'chokidar'

// import FastGlob from 'fast-glob'

// const aa = FastGlob.sync(['**/*.md', "!node_modules"], {cwd: cwdDir})
// console.log(aa);

const config: InlineConfig = {
    root: clientDir,
    server: {
        port: 3366,
        fs: {
            allow: [cwdDir, clientDir, searchForWorkspaceRoot(cwdDir)],
        },
        watch: {
            cwd: cwdDir,
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
            resolveId(id) {
                if (id === 'collectdata') {
                    return `collectdata`
                }
            },
            load(id) {
                if (id === 'collectdata') {
                    return `export default import.meta.glob('root/**/*.md', { eager: true })`
                }
            },
            configureServer(server) {
                const { moduleGraph, watcher, ws } = server
                const reload = (path: string) => {
                    console.log(path)
                    // if (path === siteinfoPath) {
                    //     // https://github.com/hannoeru/vite-plugin-pages/blob/0057b65f3a07045bc15614ad9530e26954b3bc88/src/utils.ts#L63
                    //     const mods = moduleGraph.getModulesByFile(
                    //         resolvedDesktopInfoVirtualModuleId
                    //     )
                    //     if (mods) {
                    //         const seen = new Set<ModuleNode>()
                    //         mods.forEach((mod) => {
                    //             moduleGraph.invalidateModule(mod, seen)
                    //         })
                    //     }

                    //     ws.send({ type: 'full-reload', path: path })
                    //     // server.restart()
                    //     // console.log('full-reload: ', path)
                    // }
                }
                chokidar
                    .watch(['**/*.md', '!node_modules'], { cwd: cwdDir })
                    .on('add', reload)
                    .on('change', reload)
                    .on('unlink', reload)
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
