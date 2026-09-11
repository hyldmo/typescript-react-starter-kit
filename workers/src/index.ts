interface Env {
	ASSETS: Fetcher
}

// Slot for a future API: anything under /api/* answers here, every other path
// falls through to the static Vite build (wrangler.jsonc not_found_handling).
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url)
		if (pathname.startsWith('/api/')) {
			return Response.json({ error: 'Not implemented' }, { status: 501 })
		}
		return env.ASSETS.fetch(request)
	}
}
