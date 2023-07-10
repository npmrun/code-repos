// https://github.com/Fi2zz/vite-plugin-virtual-entry/blob/master/README.md
import { normalizePath, Plugin, ResolvedConfig } from 'vite'
import fs from 'fs-extra'
import path from 'node:path'
import { clientDir, findEntry } from '@/share'

const cleanUrl = (url: string): string =>
    url.replace(/#.*$/s, '').replace(/\?.*$/s, '')

export async function vitePluginVirtualEntry(): Promise<Plugin> {
    return {
        name: 'vite-plugin-entry',
        configureServer(server) {
            // serve our index.html after vite history fallback
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    const url = req.url && cleanUrl(req.url)
                    if (url?.endsWith('.html')) {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'text/html')
                        let html = `<!DOCTYPE html>
      <html>
        <head>
          <title></title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="description" content="">
        </head>
        <body>
          <div id="app"></div>
          ${findEntry(
              clientDir,
              '<script type="module" src="/@fs/@ENTRY"></script>'
          )}
        </body>
      </html>`
                        html = await server.transformIndexHtml(
                            url,
                            html,
                            req.originalUrl
                        )
                        res.end(html)
                        return
                    }
                    next()
                })
            }
        },
    }
}
