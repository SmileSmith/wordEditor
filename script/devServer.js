const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const bodyParser = require('body-parser')
const express = require('express')
const opn = require('opn')


const app = express()

// post body 解析
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// 静态文件服务，针对 html js css fonts 文件
const sampleDir = path.join(__dirname, '..', 'sample')
const releaseDir = path.join(__dirname, '..', 'release')

app.use(express.static(sampleDir))
app.use(express.static(releaseDir))


// 默认打开首页
app.get('/', function(req, res, next) {
    res.sendfile('./index.html')
})

// 保存上传的图片
function saveImages(req) {
    return new Promise((resolve, reject) => {
        const imgLinks = []
        const form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject('formidable, form.parse err', err.stack)
            }
            // 存储图片的文件夹
            const storePath = path.resolve(sampleDir, 'upload-files')
            if (!fs.existsSync(storePath)) {
                fs.mkdirSync(storePath)
            }

            // 遍历所有上传来的图片
            files.forEach((name, file) => {
                // 图片临时位置
                const tempFilePath = file.path
                // 图片名称和路径
                const fileName = file.name
                const fullFileName = path.join(storePath, fileName)
                // 将临时文件保存为正式文件
                fs.renameSync(tempFilePath, fullFileName)
                // 存储链接
                imgLinks.push('/upload-files/' + fileName)
            })

            // 返回结果
            resolve({
                errno: 0,
                data: imgLinks
            })
        })
    })
}

// 上传图片
app.post('/upload-img', function* (req, res) {
    // 获取数据
    const data = yield saveImages(req)

    // 返回结果
    this.body = JSON.stringify(data)
})

app.post('/upload-html', function(req, res) {
    const outputPath = path.join(sampleDir, 'protocol', 'output', `${req.body.fileName}.html`)
    fs.writeFile(outputPath, req.body.content, 'utf-8', err => {
        if (err) {
            console.log(err)
            res.json({
                code: 500,
                message: 'error'
            })
        } else {
            res.json({
                code: 200,
                message: 'build html file success'
            })
        }
    })
})


// 启动服务
app.listen(4000)
console.log('listening on port %s', 4000)

opn('http://localhost:4000')
