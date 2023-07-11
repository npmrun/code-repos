import { createServer, searchForWorkspaceRoot, build, InlineConfig } from 'vite'
import { clientDir, cwdDir, findEntry, themeDir } from './share'
import { vitePluginVirtualEntry } from './node/plugins/entry'
import { buildEntry } from './node/plugins/buildEntry'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import { createRequire } from 'module'
import { footnote } from "@mdit/plugin-footnote";
import { mathjax, createMathjaxInstance } from "@mdit/plugin-mathjax";

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
    resolve: {
        alias: {
            '@theme': themeDir,
        }
    },
    optimizeDeps: {
        exclude: ['fine-cli'],
    },
    plugins: [
        vitePluginVirtualEntry(),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            markdownItOptions: {
                breaks: true,
                html: true,
                typographer: true,
                linkify: true
            },
            markdownItSetup(md) {
                // https://mdit-plugins.github.io/zh/
                md.use(require('markdown-it-task-lists'));
                md.use(require('markdown-it-anchor'));
                md.use(require('markdown-it-prism'));
                md.use(footnote);
                const mathjaxInstance = createMathjaxInstance({});
                md.use(mathjax, mathjaxInstance);
            }
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
