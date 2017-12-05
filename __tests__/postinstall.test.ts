import { copy, mkdir, remove } from 'fs-extra'
import * as path from 'path'

it('copies run scripts to package.json', async (done) => {
	// Arrange
	const origPackagePath = path.resolve(__dirname, '../package.json')
	const packageName = require(origPackagePath).name
	const testPath = path.join(__dirname, 'postinstall-test')
	const modulePath = path.join(testPath, 'node_modules')
	const scriptsFolder = path.join(modulePath, packageName)

	await remove(testPath)

	await mkdir(testPath)
	await mkdir(modulePath)
	await mkdir(scriptsFolder)

	await copy(origPackagePath, path.resolve(scriptsFolder, 'package.json'))
	await copy(
		path.resolve(__dirname, 'package-testfile.json'),
		path.resolve(testPath, 'package.json')
	)
	await copy(
		path.resolve(__dirname, '../scripts'),
		path.join(scriptsFolder, 'scripts/')
	)

	// Act
	require(path.resolve(scriptsFolder, 'scripts/postinstall'))

	// Assert
	const expected = require(path.resolve(__dirname, '../package.json'))
	delete expected.scripts.postinstall
	const result = require(path.resolve(testPath, 'package.json'))
	expect(expected.scripts).toEqual(result.scripts)

	// Cleanup
	await remove(testPath)
	done()
})
