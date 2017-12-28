export const htmlFilterRules = [
    /<meta [^<>]*>/g,
    /<[\/]?span[^<>]*>/g,
    /<[\/]?font[^<>]*>/g,
    /<[\/]?div[^<>]*>/g,
    /<\/(u[^a-zA-Z]?|b[^a-zA-Z]?)>[^<>]*<\1[^<>]*>/g,
    /<\/(u[^a-zA-Z]?|b[^a-zA-Z]?)>[^<>]*<\1[^<>]*>/g
]

export const htmlReplaceRules = [
    {
        origin: /<style>[\s\S]*<\/style>/g,
        replace: `<style>
  body {
    color:#333;
  }
  .article {
    padding: 20px 15px;
    font-size: 15px;
  }
  .article * {
    max-width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }

  .article li {
    list-style: none;
    line-height: 1.5;
  }

  .article .title {
    font-size: 20px;
    font-weight: bold;
  }

  .article .big-title {
    font-size: 30px;
    text-align: center;
    margin: 150px 0;
  }

  .article .big-gap {
    margin: 150px 0;
  }

  .article .no-gap {
    margin: 0;
  }

  .article section {
    margin-bottom: 1.5em;
  }

  .article  .footer {
    float: right;
    margin-right: 50px;
  }

  .article h1 {
    text-indent: 2em;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: .9em;
  }

  .article h2 {
    text-indent: 2em;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: .34em;
  }
  .article h3 {
    text-indent: 2em;
    font-weight: 400;
    font-size: 15px;
    margin-bottom: .34em;
  }
  .article p {
    margin: 0 0 .8em;
    text-indent: 2em;
    line-height: 1.5;
  }

  .article .center {
    text-indent: 0 !important;
    text-align: center;
  }

  .article .left {
    text-indent: 0 !important;
    text-align: left;
  }

  .article .right {
    text-align: right;
  }

  .article  .red {
    color: red;
  }

  .article table {
    border: 1px solid #000;
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
  }
  .article table tr td {
    border: 1px solid #000;
    margin: 0;
    height: 20px;
  }
</style>
`
    },
    {
        origin: /<body[^<>]*?>([\s\S]*)<\/body>/g,
        replace: (m, m1) => {
            return `<body>\n<div class="article">${m1}</div>\n</body>`
        }
    },
    {
        origin: /<p( [^<>]+)>/g,
        replace: (m, m1) => {
            // 保留text-align，用class替代
            return m.replace(m1, cm1 => {
                let textAlignClass = ''
                if (cm1.match(/text-align:right/)) {
                    textAlignClass = ' class="right"'
                }
                if (cm1.match(/text-align:center/)) {
                    textAlignClass = ' class="center"'
                }
                return textAlignClass
            })
        }
    },
    {
        origin: /<u [^<>]+>/g,
        replace: '<u>'
    },
    {
        origin: /<b [^<>]+>/g,
        replace: '<b>'
    },
    {
        origin: /<tbody [^<>]+>/g,
        replace: '<tbody>'
    },
    {
        origin: /<table [^<>]+>/g,
        replace: '<table>'
    },
    {
        origin: /<tr [^<>]+>/g,
        replace: '<tr>'
    },
    {
        origin: /<td([^<>]*)>([\s\S]*?)<\/td>/g,
        replace: function replace(m, m1, m2) {
            return m
                .replace(m1, cm1 => {
                    const span = cm1.match(/( (rowspan|colspan)=['"]?\d+['"]?)/)
                    return (span && span[0]) || ''
                })
                .replace(m2, cm2 => {
                    return cm2.replace(/<[\/]?p[^<>]*>/g, '')
                })
        }
    },
    {
        origin: /<th([^<>]*)>([^(th)]*)<\/th>/g,
        replace: function replace(m, m1, m2) {
            return m
                .replace(m1, cm1 => {
                    const span = cm1.match(/( (rowspan|colspan)=['"]?\d+['"]?)/)
                    return (span && span[0]) || ''
                })
                .replace(m2, cm2 => {
                    return cm2.replace(/<[\/]?p[^<>]*>/g, '')
                })
        }
    },
    // 换占位的空白字符，去除行间距
    {
        origin: /<p>&nbsp;<\/p>/g,
        replace: '<p class="no-gap">&nbsp;</p>'
    },
    {
        origin: />[\s]?['"]?([\d\.]+)[^ \d\.]/g,
        replace: (m, m1) => {
            return m.replace(m1, m1 + ' ')
        }
    }
]

export const htmlWrapper = (content, title) =>
    content
        .replace(/(<style>[\s\S]*<\/style>)([\s\S]+)/, (m, m1, m2) => {
            return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>《${title}》</title>
  ${m1}
</head>
<body>
${m2}
</body>
</html>
`
        })
        .replace(/(\n|\r\n|\r)\1+/g, '$1')
