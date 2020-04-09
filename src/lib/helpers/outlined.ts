import marked from 'marked'

const tocDepth: any = {
  2: '- ',
  3: '  - ',
  4: '    - ',
  5: '      - ',
  6: '        - '
}

const generateTOC = (content: string): string => {
  let token: any = marked.lexer(content)
  var tocs: string = ''
  token.forEach((item: any) => {
    if (item.type === 'heading' && item.depth !== 1) {
      tocs += tocDepth[item.depth] + `[${item.text}](#${item.text})\n`
    }
  })
  return tocs
}

const outlined = (content: string): string => {
  // 对象解析
  let token: any = marked.lexer(content)
  var heading: string = ''
  token.forEach((item: any) => {
    if (item.type === 'heading') {
      heading += `<li class="for-outline-h${item.depth}">${
        item.depth === 1 ? '╃' : '┕'
      } <a href="#${item.text}" title=${item.text}>${item.text}</a></li>`
    }
  })

  return `<ul class="for-outline-ul">${heading}</ul>`
}

export {
  outlined,
  generateTOC
}
