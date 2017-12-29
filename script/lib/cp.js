const cp = require('child_process')

const spawn = (command, args, options) =>
    new Promise((resolve, reject) => {
        cp.spawn(command, args, options).on('close', code => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`${command} ${args.join(' ')} => ${code} (error)`))
            }
        })
    })

const exec = (command, options) =>
    new Promise((resolve, reject) => {
        cp.exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(err)
                return
            }

            resolve({ stdout, stderr })
        })
    })

module.exports = {
    spawn,
    exec
}
