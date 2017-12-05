import { copy, mkdir, readdir, remove } from 'fs-extra'
import * as path from 'path'

describe('postinstall', () => {
	afterAll(async (done) => {
		const testDirectory = path.join(__dirname, 'testfiles')
		const dirs = (await readdir(testDirectory))
			.filter(dir => dir.indexOf('postinstall-test') >= 0)
			.map(dir => remove(path.join(testDirectory, dir)))

		await Promise.all(dirs)

		done()
	})

	it('copies run scripts to package.json', async (done) => {
		// Arrange
		const { scriptsFolder, testPath } = await makeFolders('package.json')

		// Act
		require(path.resolve(scriptsFolder, 'scripts/postinstall'))

		// Assert
		const expected = require(path.resolve(__dirname, '../package.json'))
		delete expected.scripts.postinstall
		delete expected.scripts.prepublishOnly
		const result = require(path.resolve(testPath, 'package.json'))
		expect(expected.scripts).toEqual(result.scripts)

		done()
	})

	it('throws if there are duplicate keys', async (done) => {
		// Arrange
		const { scriptsFolder } = await makeFolders('package-withscripts.json')

		// Act
		const func = () => require(path.resolve(scriptsFolder, 'scripts/postinstall'))

		// Assert
		expect(func).toThrow()

		done()
	})

	it('does not add non-build scripts', async (done) => {
		// Arrange
		const { scriptsFolder, testPath } = await makeFolders('package.json')

		// Act
		require(path.resolve(scriptsFolder, 'scripts/postinstall'))

		// Assert
		const result = require(path.resolve(testPath, 'package.json'))
		const actualKeys = Object.keys(result.scripts);

		['prepublishOnly', 'postinstall'].forEach(key => {
			expect(actualKeys).not.toContain(key)
		})

		done()
	})
})

type FolderResult = {
	scriptsFolder: string
	testPath: string
}

async function makeFolders (filename: string): Promise<FolderResult> {
	const origPackagePath = path.resolve(__dirname, '../package.json')
	const packageName = require(origPackagePath).name
	const testPath = path.join(__dirname, `testfiles/postinstall-test${Math.round(Math.random() * Math.pow(2, 16))}`)
	const modulePath = path.join(testPath, 'node_modules')
	const scriptsFolder = path.join(modulePath, packageName)

	await remove(testPath)

	await mkdir(testPath)
	await mkdir(modulePath)
	await mkdir(scriptsFolder)

	await copy(origPackagePath, path.resolve(scriptsFolder, 'package.json'))
	await copy(
		path.resolve(__dirname, `testfiles/${filename}`),
		path.resolve(testPath, 'package.json')
	)
	await copy(
		path.resolve(__dirname, '../scripts'),
		path.join(scriptsFolder, 'scripts/')
	)
	return {
		scriptsFolder,
		testPath
	}
}

