const path = require('path')
const cp = require('./lib/cp')
const fs = require('./lib/fs')
const opn = require('opn')

// GitHub Pages
const remote = {
    name: 'SmileSmith',
    url: 'https://github.com/SmileSmith/wordEditor.git',
    branch: 'gh-pages',
    website: 'https://smilesmith.github.io/wordEditor',
    static: true
}

const options = {
    cwd: path.resolve(__dirname, '../build'),
    stdio: ['ignore', 'inherit', 'inherit']
}

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
    const startDeployTime = new Date()

    // Initialize a new repository
    if (!fs.existsSync('build')) {
        fs.mkdirSync('build')
    }
    fs.cleardirSync('build', { ignore: ['.git'] })

    await cp.spawn('git', ['init', '--quiet'], options)

    // Changing a remote's URL
    let isRemoteExists = false
    try {
        await cp.spawn('git', ['config', '--get', `remote.${remote.name}.url`], options)
        isRemoteExists = true
    } catch (error) {
        /* skip */
    }
    await cp.spawn(
        'git',
        ['remote', isRemoteExists ? 'set-url' : 'add', remote.name, remote.url],
        options
    )

    // Fetch the remote repository if it exists
    let isRefExists = false
    try {
        await cp.spawn(
            'git',
            ['ls-remote', '--quiet', '--exit-code', remote.url, remote.branch],
            options
        )
        isRefExists = true
    } catch (error) {
        await cp.spawn('git', ['update-ref', '-d', 'HEAD'], options)
    }
    if (isRefExists) {
        await cp.spawn('git', ['fetch', remote.name], options)
        await cp.spawn('git', ['reset', `${remote.name}/${remote.branch}`, '--hard'], options)
        await cp.spawn('git', ['clean', '--force'], options)
    }

    // Build the project in RELEASE mode which
    // generates optimized and minimized bundles
    // await cp.spawn('gulp')
    fs.copydirSync('release', 'build')
    fs.copydirSync('sample', 'build')

    // Push the contents of the build folder to the remote server via Git
    await cp.spawn('git', ['add', '.', '--all'], options)
    try {
        await cp.spawn('git', ['diff', '--cached', '--exit-code', '--quiet'], options)
    } catch (error) {
        await cp.spawn(
            'git',
            ['commit', '--message', `Update ${new Date().toLocaleString()}`],
            options
        )
    }
    await cp.spawn(
        'git',
        ['push', remote.name, `master:${remote.branch}`, '--set-upstream'],
        options
    )

    opn(remote.website)
    const endDeployTime = new Date()
    console.log(`deploy success in ${(endDeployTime - startDeployTime)/1000} s.`)
    // Check if the site was successfully deployed
    console.info(`open => ${remote.website} `)

}

deploy()
