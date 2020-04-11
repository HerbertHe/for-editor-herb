const customize = (
  startFlag: string,
  endFlag: string,
  startCount: number,
  endCount: number,
  content: string
): Array<string> => {
  const symbols: Array<string> = [
    '\\',
    '|',
    '.',
    '^',
    '$',
    '*',
    '+',
    '?',
    '{',
    '}',
    '[',
    ']',
    '(',
    ')'
  ]
  let startFlagArray: Array<string> = startFlag.split('')
  let endFlagArray: Array<string> = endFlag.split('')
  startFlagArray.forEach((item: string) => {
    if (symbols.includes(item)) {
      item = `\\${item}`
    }
  })
  endFlagArray.forEach((item: string) => {
    if (symbols.includes(item)) {
      item = `\\${item}`
    }
  })
  startFlag = startFlagArray.join('')
  endFlag = endFlagArray.join('')

  const regexp = new RegExp(
    `/(${startFlag}{${startCount}}+)([^${startFlag}{${startCount}}]|[^${startFlag}{${startCount}}][\s\S]*?[^${endFlag}{${endCount}}])\1(?!${endFlag}{${endCount}})/g`
  )

  let contentHandle: Array<string> = content
    .replace('\n', ' ')
    .replace(regexp, '\n')
    .split('\n')
  let markTags: RegExpMatchArray = content.match(regexp)
  if (contentHandle[0].length === 0) {
    markTags.forEach((item: string, index: number) => {
      contentHandle = contentHandle.filter((el) => !(el.length === 0))
      contentHandle.splice(2 * index, 0, item)
    })
  } else if (contentHandle[0].length !== 0) {
    markTags.forEach((item: string, index: number) => {
      contentHandle = contentHandle.filter((el) => !(el.length === 0))
      contentHandle.splice(2 * index + 1, 0, item)
    })
  }
  return contentHandle
}

export default (startFlag: string, endFlag: string, startCount: number, endCount: number, content: string): Array<string> => {
  return customize(startFlag, endFlag, startCount, endCount, content)
}
