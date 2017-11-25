// tslint:disable:only-arrow-functions
window.matchMedia = window.matchMedia || function () {
	return {
		media: '',
		matches: false,
		addListener: () => undefined,
		removeListener: () => undefined
	}
}

window.requestAnimationFrame = window.requestAnimationFrame || function (callback) {
	setTimeout(callback, 0)
	return 0
}

// Fix for webpack env definitions
process.env.PACKAGE_NAME = ''
process.env.PACKAGE_VERSION = ''
