const fs = require('fs')
const path = require('path')

const copydirSync = (source, target) => {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
    }
    const filePaths = fs.readdirSync(source, 'utf-8')
    filePaths.forEach(fileName => {
        const from = path.resolve(source, fileName)
        const to = path.resolve(target, fileName)
        if (fs.statSync(from).isDirectory()) {
            copydirSync(from, to)
        } else {
            const readStream = fs.createReadStream(from)
            const writeStream = fs.createWriteStream(to)
            readStream.pipe(writeStream)
            // fs.copyFileSync(from, to)
        }
    })
}

const cleardirSync = (dirPath, { ignore = [] }) => {
    const filePaths = fs.readdirSync(dirPath, 'utf-8')
    const ignoreFiles = ignore.length > 0 ? ignore : null
    filePaths.forEach(fileName => {
        if (!ignoreFiles || ignoreFiles.indexOf(fileName) === -1) {
            const delPath = path.resolve(dirPath, fileName)
            if (fs.statSync(delPath).isDirectory()) {
                cleardirSync(delPath, { ignore })
            } else {
                fs.unlinkSync(delPath)
            }
        }
    })
}

module.exports = {
    existsSync: fs.existsSync,
    mkdirSync: fs.mkdirSync,
    rmdirSync: fs.rmdirSync,
    readdirSync: fs.readdirSync,
    copydirSync: copydirSync,
    cleardirSync: cleardirSync
}
