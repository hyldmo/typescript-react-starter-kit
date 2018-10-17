// tslint:disable:no-console
import { Aborter, BlobURL, BlockBlobURL, ContainerURL, ServiceURL, SharedKeyCredential, StorageURL } from '@azure/storage-blob'
import { lstatSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const targetBranch = process.env.TRAVIS_BRANCH
const currentBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH

async function upload () {
	const account = process.env.AZURE_STORAGE_ACCOUNT
	const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY

	if (typeof account !== 'string' || typeof accountKey !== 'string')
		throw new Error('Account or AccountKey not provided')

	const sharedKeyCredential = new SharedKeyCredential(account, accountKey)
	const pipeline = StorageURL.newPipeline(sharedKeyCredential)
	const serviceURL = new ServiceURL(`https://${account}.blob.core.windows.net`, pipeline)
	const containerURL = ContainerURL.fromServiceURL(serviceURL, 'screenshots')
	const responseCode = await containerURL.create(Aborter.none)
		.then(r => r._response.status)
		.catch(e => e.statusCode)
	if (![200, 409].includes(responseCode)) {
		throw new Error('Failed to create container')
	}
	const screenshotFolder = join(__dirname, '../cypress/screenshots')
	const folders = readdirSync(screenshotFolder)
	for (const folder of folders) {
		const testSuiteFolder = join(screenshotFolder, folder)
		const files = readdirSync(testSuiteFolder)
		for (const file of files) {
			const path = join(testSuiteFolder, file)
			if (lstatSync(path).isDirectory())
				return

			const content = readFileSync(path)
			const blobName = `${currentBranch}/${file}`
			const blobURL = BlobURL.fromContainerURL(containerURL, blobName)
			const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL)
			await blockBlobURL.upload(Aborter.none, content, content.length)
			console.info(`Uploaded "${blobName}"`)
		}
	}
}

async function diffImages () {
	const account = process.env.AZURE_STORAGE_ACCOUNT
	const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY

	if (typeof account !== 'string' || typeof accountKey !== 'string')
		throw new Error('Account or AccountKey not provided')

	const sharedKeyCredential = new SharedKeyCredential(account, accountKey)
	const pipeline = StorageURL.newPipeline(sharedKeyCredential)
	const serviceURL = new ServiceURL(`https://${account}.blob.core.windows.net`, pipeline)
	const containerURL = ContainerURL.fromServiceURL(serviceURL, 'screenshots')
	const createContainerResponse = await containerURL.create(Aborter.none).catch(e => e)
	if (![200, 409].includes(createContainerResponse.statusCode)) {
		throw new Error('Failed to create container')
	}
	const screenshotFolder = join(__dirname, '../cypress/screenshots')
	const folders = readdirSync(screenshotFolder)
	for (const folder of folders) {
		const testSuiteFolder = join(screenshotFolder, folder)
		const files = readdirSync(testSuiteFolder)
		for (const file of files) {
			console.info(`Diffing "${file}"`)
			const path = join(testSuiteFolder, file)
			if (lstatSync(path).isDirectory())
				return

			const newImg = readFileSync(path)

			const image = (await BlockBlobURL
				.fromContainerURL(containerURL, `${targetBranch}/${file}`)
				.download(Aborter.none, 0))
				.readableStreamBody

			if (image !== undefined) {
				const currentImg = image
					.pipe(new PNG())
					.on('parsed', async () => {
						const diff = new PNG({ width: currentImg.width, height: currentImg.height })
						pixelmatch(currentImg.data, newImg, diff.data, diff.width, diff.height)

						await BlockBlobURL
							.fromContainerURL(containerURL, `${currentBranch}/PR/${targetBranch}/${file}`)
							.upload(Aborter.none, diff.data, diff.data.length)
					})

			}
		}
	}
}

async function run () {
	await upload()
	console.info(`TRAVIS_PULL_REQUEST=${process.env.TRAVIS_PULL_REQUEST}`)
	if (process.env.TRAVIS_PULL_REQUEST !== 'false') {
		console.info(`PR detected, diffing screenshots from ${targetBranch}`)
		diffImages()
	}
}

run()
