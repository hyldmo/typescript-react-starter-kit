import { Omit } from 'react-redux'

type omits = 'body' | 'trailer' | 'clone' | 'bodyUsed' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | 'ok'
export type ApiResponse<T = string | {}> =
	Omit<Response, omits> & { body: T, ok: true } |
	{ ok: false, status: number, message: string }

export async function api<T = string | {}> (url: string, options?: RequestInit): Promise<ApiResponse<T>> {
	const headers = options && options.headers
		? new Headers(options.headers)
		: new Headers()

	if (!url.includes('sleepingpill')) // Workaround for sleepingpill not supporting options
		headers.append('content-type', 'application/json')

	try {
		const response = await fetch(url, {
			...options,
			body: options && typeof options.body === 'object'
				? JSON.stringify(options.body)
				: options && options.body,
			headers: new Headers(headers)
		})
		let body
		try {
			body = await response.text()
			body = JSON.parse(body)
		} catch (err) {
			// Body will stay as text if parse fails
		}
		if (response.ok)
			return { // Cannot use Object.assign() with response for some reason
				ok: true,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				redirected: response.redirected,
				type: response.type,
				url: response.url,
				body
			}
		else
			return {
				ok: false,
				status: response.status,
				message: body
			}

	} catch (err) {
		return {
			ok: false,
			status: 0,
			message: err.message || 'Unknown error'
		}
	}

}
