import { readFile, writeJSON } from 'fs-extra'
import path from 'path'

const basePath = path.join(__dirname, '../static/');

async function parse () {
	const file = await readFile(path.join(basePath, 'produkter.csv'))
	const lines = file.toString().split('\n')
	const keys = lines.shift()!.split(';')
	const wines = lines.map((value, i) => ({
		[keys[i]]: value
	}))
	await writeJSON(path.join(basePath, 'produkter.json'),  wines)
}

parse();
