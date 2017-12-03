const sourcePkgFilename = path.resolve(__dirname, '../package.json');
const sourcePkg = require(sourcePkgFilename);
sourcePkg.scripts.postinstall = 'node scripts/postinstall.js'

fs.writeJSON(sourcePkgFilename, sourcePkg, { spaces: 2 })