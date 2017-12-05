const fs = require('fs-extra')
const path = require('path')

function overwriteScripts () {

    const sourcePkgFilename = path.resolve(__dirname, '../package.json');
    const sourcePkg = require(sourcePkgFilename);
    const pkgName = sourcePkg.name;
	delete sourcePkg.scripts.postinstall

    const destPkgFilename = path.resolve(__dirname, '../../../package.json');
    const destPkg = require(destPkgFilename);


    destPkg.scripts = Object.assign({}, destPkg.scripts, sourcePkg.scripts)

    if (process.env.NODE_ENV !== 'test')
        console.info(pkgName + ': Overwriting package.json scripts...')

    fs.writeJSON(destPkgFilename, destPkg, { spaces: 2 })
}

overwriteScripts()
