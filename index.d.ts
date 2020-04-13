import * as React from 'react'
export interface IParagraph {
  paragraph?: boolean
  italic?: boolean
  bold?: boolean
  bolditalic?: boolean
  delline?: boolean
  underline?: boolean
  keytext?: boolean
  superscript?: boolean
  subscript?: boolean
  marktag?: boolean
}

export interface IToolbar {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  list?: boolean
  para?: IParagraph
  quote?: boolean
  table?: boolean
  img?: boolean
  link?: boolean
  inlinecode?: boolean
  code?: boolean
  collapse?: boolean
  katex?: boolean
  preview?: boolean
  expand?: boolean
  undo?: boolean
  redo?: boolean
  save?: boolean
  subfield?: boolean
  toc?: boolean
}

export interface IWords {
  placeholder: string
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
  undo: string
  redo: string
  list: string
  orderlist: string
  disorderlist: string
  checklist: string
  para: string
  italic: string
  bold: string
  bolditalic: string
  delline: string
  underline: string
  keytext: string
  superscript: string
  subscript: string
  marktag: string
  quote: string
  table: string
  img: string
  link: string
  inlinecode: string
  code: string
  collapse: string
  katex: string
  save: string
  preview: string
  singleColumn: string
  doubleColumn: string
  fullscreenOn: string
  fullscreenOff: string
  addImgLink: string
  addImg: string
  toc: string
}

interface ILeft {
  prefix: string
  subfix: string
  str: string
}
interface IP {
  value?: string
  lineNum?: number
  onChange?: (value: string) => void
  onSave?: (value: string) => void
  placeholder?: string
  fontSize?: string
  disabled?: boolean
  style?: object
  height?: string
  preview?: boolean
  expand?: boolean
  subfield?: boolean
  toolbar?: IToolbar
  language?: string | IWords
  anchor?: boolean
  outline?: boolean
  addImg?: (file: File, index: number) => void
  highlight: () => string
}

interface IS {
  preview: boolean
  expand: boolean
  subfield: boolean
  history: string[]
  historyIndex: number
  lineIndex: number
  value: string
  words: IWords
}
declare class MdEditor extends React.Component<IP, IS> {
  static defaultProps: {
    lineNum: boolean
    onChange: () => void
    onSave: () => void
    addImg: () => void
    fontSize: string
    disabled: boolean
    preview: boolean
    expand: boolean
    subfield: boolean
    style: {}
    toolbar: IToolbar
    language: string | IWords
    outline: true
    anchor: true
  }

  $img2Url: (name: string, url: string) => void

  private $vm
  private $scrollEdit
  private $scrollPreview
  private $blockEdit
  private $blockPreview
  private currentTimeout
}
export default MdEditor
