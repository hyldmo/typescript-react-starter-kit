console.log('Running postinstall for ts-scripts')
const fs = require('fs-extra')
const path = require('path')

function overwriteScripts () {
    if (process.env.NODE_ENV !== 'test')
    	console.info('Overwriting package.json scripts...')

    const sourcePkgFilename = path.resolve(__dirname, '../package.json');
    const sourcePkg = require(sourcePkgFilename);
	delete sourcePkg.scripts.postinstall

    const destPkgFilename = path.resolve(__dirname, '../../../package.json');
    const destPkg = require(destPkgFilename);
	

    destPkg.scripts = Object.assign({}, destPkg.scripts, sourcePkg.scripts)

    fs.writeJSON(destPkgFilename, destPkg, { spaces: 2 })
}

overwriteScripts()
