// 重写underline、keyboard text、superscript、subscript、collapse的语法，插入之后光标存在问题，collapse这个块级语法用code块解析的方式来定义
function insertText($vm: HTMLDivElement, params: any): string {
  const { prefix, str = '', subfix = '' } = params
  // 获取光标位置
  $vm.focus()
  let selection = getSelection()
  const value = $vm.innerHTML
  if (
    selection.anchorNode === $vm ||
    (selection.anchorNode.parentNode !== null && selection.anchorNode.parentNode === $vm)
  ) {
    const start = selection.anchorOffset
    const end = selection.focusOffset
    const restoreTop = $vm.scrollTop
    const range = document.createRange()
    if (selection.isCollapsed) {
      $vm.innerHTML =
        value.substring(0, start) + prefix + str + subfix + value.substring(end, value.length)
      // range.setStart($vm.childNodes[0], start + prefix.length)
      // range.setEnd($vm.childNodes[0], end + prefix.length + str.length)
      range.selectNodeContents($vm)
      selection.removeAllRanges()
      selection.addRange(range)
    } else {
      $vm.innerHTML =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end + value.length)
      // range.setStart($vm.childNodes[0], start + prefix.length)
      // range.setEnd($vm.childNodes[0], end + prefix.length)
      range.selectNodeContents($vm)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
  }
  return $vm.innerHTML
}

export { insertText }
