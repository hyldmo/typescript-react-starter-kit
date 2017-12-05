const fs = require('fs-extra')
const path = require('path')

function overwriteScripts () {

    const sourcePkgFilename = path.resolve(__dirname, '../package.json');
    const sourcePkg = require(sourcePkgFilename);
    const pkgName = sourcePkg.name;
	delete sourcePkg.scripts.postinstall

    const destPkgFilename = path.resolve(__dirname, '../../../package.json');
    const destPkg = require(destPkgFilename);

    const sourceKeys = Object.keys(sourcePkg.scripts);
    const destKeys = Object.keys(destPkg.scripts)
    const duplicateKeys = Object.keys(sourcePkg.scripts).filter(key => destKeys.some(dstKey => dstKey === key))
    if (duplicateKeys.length > 0)
        throw new Error(`Duplicate keys found in package.json found. Please remove "${duplicateKeys.join('", "')}" from the "scripts" object in package.json`)

    if (process.env.NODE_ENV !== 'test')
        console.info(pkgName + ': Overwriting package.json scripts...')

    const excludeKeys = ['prepublishOnly', 'postinstall']
    Object.keys(sourcePkg.scripts).forEach(key => {
        if (excludeKeys.indexOf(key) >= 0)
            delete sourcePkg.scripts[key]
    })

    destPkg.scripts = Object.assign({}, destPkg.scripts, sourcePkg.scripts)
    fs.writeJSON(destPkgFilename, destPkg, { spaces: 2 })
}

overwriteScripts()
