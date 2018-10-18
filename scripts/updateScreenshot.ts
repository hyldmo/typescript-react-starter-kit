// tslint:disable:no-console
import { Aborter, BlobURL, BlockBlobURL, ContainerURL, ServiceURL, SharedKeyCredential, StorageURL } from '@azure/storage-blob'
import { createReadStream, createWriteStream, ensureDir, ensureFile, lstat, readdir, readFile } from 'fs-extra'
import { join, resolve } from 'path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const targetBranch = process.env.TRAVIS_BRANCH
const currentBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH

type File = {
	path: string
	name: string
	contents: Buffer
}

function getContainer (): ContainerURL {
	const account = process.env.AZURE_STORAGE_ACCOUNT
	const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY

	if (typeof account !== 'string' || typeof accountKey !== 'string')
		throw new Error('Account or AccountKey not provided')

	const sharedKeyCredential = new SharedKeyCredential(account, accountKey)
	const pipeline = StorageURL.newPipeline(sharedKeyCredential)
	const serviceURL = new ServiceURL(`https://${account}.blob.core.windows.net`, pipeline)
	return ContainerURL.fromServiceURL(serviceURL, 'screenshots')
}

async function getScreenshots (): Promise<File[]> {
	const screenshots: File[] = []
	const screenshotFolder = join(__dirname, '../cypress/screenshots')
	const folders = await readdir(screenshotFolder)
	for (const folder of folders) {
		const testSuiteFolder = join(screenshotFolder, folder)
		const files = await readdir(testSuiteFolder)
		for (const file of files) {
			const path = join(testSuiteFolder, file)
			if ((await lstat(path)).isDirectory())
				continue

			const contents = await readFile(path)
			screenshots.push({ path, name: file, contents })
		}
	}
	return screenshots
}

const upload = (containerURL: ContainerURL) => async ({ name, contents }: File) => {
	const blobName = `${currentBranch}/${name}`
	const blobURL = BlobURL.fromContainerURL(containerURL, blobName)
	const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL)
	await blockBlobURL.upload(Aborter.none, contents, contents.length)
}

const diffImage = (containerURL: ContainerURL) => async (file: File) => {
	const newImg = createReadStream(file.path).pipe(new PNG())

	const image = (await BlockBlobURL
		.fromContainerURL(containerURL, `${targetBranch}/${file.name}`)
		.download(Aborter.none, 0))
		.readableStreamBody

	if (image === undefined)
		return

	const currentImg = image
		.pipe(new PNG())
		.on('parsed', async () => {
			const diff = new PNG({ width: currentImg.width, height: currentImg.height })
			pixelmatch(currentImg.data, newImg.data, diff.data, diff.width, diff.height)

			const screenshotFolder = resolve(__dirname, '../cypress/screenshots/diffs')
			await ensureDir(screenshotFolder)
			const path = join(screenshotFolder, file.name)
			const stream = createWriteStream(path)
			await ensureFile(path)
			diff.pack().pipe(stream).on('close', async () => {
				const imageDiff = await readFile(path)
				const url =  `${currentBranch}/PR/${targetBranch}/${file.name}`

				await BlockBlobURL
					.fromContainerURL(containerURL, url)
					.upload(Aborter.none, imageDiff, imageDiff.length, { blobHTTPHeaders: { blobContentType: 'image/png' } })
			})
		})
}

async function run () {
	const container = getContainer()
	const responseCode = await container.create(Aborter.none)
		.then(r => r._response.status)
		.catch(e => e.statusCode)

	if (![200, 201, 409].includes(responseCode)) {
		throw new Error('Failed to create container')
	}
	const files = await getScreenshots()
	files.map(upload(container))
	console.info(`Uploaded screenshots to "/${targetBranch}/"`)
	// tslint:disable-next-line:triple-equals
	if (process.env.TRAVIS_PULL_REQUEST != 'false') {
		console.info(`PR detected, diffing screenshots from ${targetBranch}`)
		await Promise.all(files.map(diffImage(container)))
		console.info(`Uploaded diffs to "/${currentBranch}/PR/${targetBranch}/"`)
	}
}

run()
