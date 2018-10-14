// Don't export this to utils/index.ts, as this contains node-specfic imports
import { readdirSync, lstatSync } from "fs";
import { parse, join } from 'path'

/**
 * Scans a directory and returns all the folders it contains as an object
 * @param path Absolute path to folder
 * @example { folderName: absoluteFolderPath }
 */
export function getFolders(path: string): Record<string, string> {
	return readdirSync(path)
		.reduce((a, b) => {
			b = join(path, b)
			if (lstatSync(b).isDirectory()) {
				const p = parse(b)
				a[p.name] = b
			}
			return a
		}, {} as ReturnType<typeof getFolders>)
}
