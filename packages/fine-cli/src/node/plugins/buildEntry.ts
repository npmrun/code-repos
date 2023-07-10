import path from 'node:path'
import { clientDir, findEntry } from '@/share'
export async function buildEntry(): Promise<any> {
    return {
        resolveId(id) {
            if (id && id === "index.html") return path.resolve(clientDir, id)
            return null
        },
        load(id) {
            if (id.endsWith('.html')) {
                return `
                <!DOCTYPE html>
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
                        '<script type="module" src="@ENTRY"></script>'
                    )}
                  </body>
                </html>
          `.replace(/\s{2,}/g, ' ')
            }
            return null
        },
    }
}
