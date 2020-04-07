import marked from 'marked'

const outlined = (content: string) => {
  // 对象解析
  let token: any = marked.lexer(content)
  var heading: string = ''
  token.forEach((item: any) => {
    if (item.type === 'heading') {
      heading += `<li class="for-outline-h${item.depth}">${item.text}</li>`
    }
  })

  return `<ul class="for-outline-ul">${heading}</ul>`
}

export default (content: string) => {
  return outlined(content)
}
