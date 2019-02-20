// Don't export this to utils/index.ts, as this contains node-specfic imports
import { lstatSync, readdirSync } from 'fs'
import { join, parse } from 'path'

/**
 * Scans a directory and returns all the folders it contains as an object
 * @param path Absolute path to folder
 * @example { folderName: absoluteFolderPath }
 */
export function getFolders (path: string): Record<string, string> {
	return readdirSync(path)
		.reduce((a: ReturnType<typeof getFolders>, b) => {
			b = join(path, b)
			if (lstatSync(b).isDirectory()) {
				const p = parse(b)
				a[p.name] = b
			}
			return a
		}, {})
}

/**
 * Created a path for webpack output file names
 * @param type File type
 * @param chunk Whether filename should inclue chunk or not
 */
export function makePath  (type: 'js' | 'css', chunk?: boolean) {
	return `static/${type}/[name]-[contenthash]${chunk ? '.chunk.' : '.'}${type}`
}
