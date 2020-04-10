import marked from 'marked'
import katex from 'katex'
const emojione = require('emojione')

const markedRender = (content: string, highlight: Function): string => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })

  const renderer = new marked.Renderer()

  // 标题解析
  const headingParse = (text: string, level: number) => {
    return `<h${level}>
    <span class="for-heading">${text}</span>
    <a href="#${text}" name="${text}" class="for-anchor">
      #
    </a>
  </h${level}>`
  }

  // latex解析
  const latexBlockParse = (latex: string) => {
    let html: string = katex.renderToString(latex, {
      displayMode: true,
      leqno: false,
      fleqn: false,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
      output: 'html'
    })
    return html
  }

  const latexInlineParse = (latex: string) => {
    let html: string = katex.renderToString(latex, {
      displayMode: false,
      leqno: false,
      fleqn: false,
      throwOnError: false,
      strict: 'warn',
      trust: false,
      output: 'html'
    })
    return html
  }

  // 段落解析
  const paragraphParse = (text: string) => {
    const texBlock = /(?<=\$\$)[\s\S]*?(?=\$\$)/
    const texInline = /(\$+)([^\$]|[^\$][\s\S]*?[^\$])\1(?!\$)/
    const emojiInline = /(\:+)([^\:]|[^\:][\s\S]*?[^\:])\1(?!\:)/g
    const excludeColon = /([\S]+:)/g
    const excludeHttp = /(?<=http(s)?:\/\/)[\s\S]*?/

    if (texBlock.test(text)) {
      return latexBlockParse(texBlock.exec(text)[0])
    } else if (texInline.test(text)) {
      while (texInline.test(text)) {
        let result: RegExpExecArray = texInline.exec(text)
        text = text.replace(result[0], latexInlineParse(result[2]))
      }
      return `<p>${text}</p>`
    } else if (emojiInline.test(text) && !excludeHttp.test(text)) {
      let back: string = ''
      let others: RegExpMatchArray = text.match(excludeColon)
      let textArray: Array<string> = text.replace('\n', ' ').split(' ')
      textArray.forEach((item: string) => {
        if (others.includes(item)) {
          back += emojione.shortnameToImage(item)
        } else {
          back += item
        }
      })
      return `<p class="for-para-emoji">${back}</p>`
    } else {
      return `<p>${text}</p>`
    }
  }

  // 链接解析
  const linkParse = (href: string, title: string, text: string) => {
    return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`
  }

  const codeParse = (code: string, language: string) => {
    if (language === 'diff') {
      let diffArray: Array<string> = code.split('\n')
      let backDiff: string = ''
      diffArray.forEach((item: string) => {
        if (/(?<=\+ )/.test(item)) {
          backDiff += `<p class="for-md-diff-add">${item}</p>`
        } else if (/(?<=\- )/.test(item)) {
          backDiff += `<p class="for-md-diff-del">${item}</p>`
        } else if (/(?<=\! )/.test(item)) {
          backDiff += `<p class="for-md-diff-focus">${item}</p>`
        } else if (/(?<=\# )/.test(item)) {
          backDiff += `<p class="for-md-diff-ignore">${item}</p>`
        } else {
          backDiff += `<p>${item}</p>`
        }
      })
      return `<pre class="for-md-diff"><code>${backDiff}</code></pre>`
    } else {
      return `<pre><code title="${language}" class="language-${language}">${
        highlight(code).value
      }</code></pre>`
    }
  }

  renderer.code = codeParse
  renderer.paragraph = paragraphParse
  renderer.link = linkParse
  renderer.heading = headingParse

  return marked(content, { renderer })
}

export default (content: string, highlight: Function): string => {
  if (typeof content !== 'string') return ''

  return markedRender(content, highlight)
}
