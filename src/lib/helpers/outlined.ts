import marked from 'marked'

// 添加点击事件

const outlined = (content: string) => {
  // 对象解析
  let token: any = marked.lexer(content)
  var heading: string = ''
  token.forEach((item: any) => {
    if (item.type === 'heading') {
      heading += `<li class="for-outline-h${item.depth}">${
        item.depth === 1 ? '╃' : '┕'
      } <a href="#${item.text}">${item.text}</a></li>`
    }
  })

  return `<ul class="for-outline-ul">${heading}</ul>`
}

export default (content: string) => {
  return outlined(content)
}
