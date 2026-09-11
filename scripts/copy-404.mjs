// GH Pages has no SPA fallback: a hard refresh on /tracker serves 404.html.
// Copying the built index.html there keeps client-side routes working.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.info('dist/404.html written')
