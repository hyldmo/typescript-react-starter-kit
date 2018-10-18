// tslint:disable:no-console
import { request, RequestOptions } from 'https'

export async function comment (diffUrl: string) {
	const PR = process.env.TRAVIS_PULL_REQUEST
	// tslint:disable-next-line:triple-equals
	if (PR == 'false')
		return false

	const repo = process.env.TRAVIS_REPO_SLUG

	const body = JSON.stringify({
		body: `## Cypress Screenshots ##\nDiff screenshots uploaded at ${diffUrl}`,
		in_reply_to: 1
	})

	const options: RequestOptions = {
		hostname: 'api.github.com',
		path: `repos/${repo}/pulls/${PR}/comments`,
		method: 'POST',
		headers: {
			'Accept': 'application/vnd.github.v3+json',
			// 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
			'Content-Length': Buffer.byteLength(body)
		}
	}

	const req = request(options, (res) => {
		console.log('statusCode:', res.statusCode)
		console.log('headers:', res.headers)

		res.on('data', (d) => {
			process.stdout.write(d)
		})
	})

	req.on('error', (e) => {
		console.error(e)
	})
	req.end()
}
