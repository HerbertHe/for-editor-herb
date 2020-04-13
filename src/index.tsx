import * as React from 'react'
import classNames from 'classnames'
import marked from './lib/helpers/marked'
import keydownListen from './lib/helpers/keydownListen'
import ToolbarLeft from './components/toolbar_left'
import ToolbarRight from './components/toolbar_right'
import { insertText } from './lib/helpers/function'
import 'highlight.js/styles/tomorrow.css'
import './lib/fonts/iconfont.css'
import './lib/css/index.scss'
import './lib/fonts/katex.css'
import { CONFIG } from './lib'
import { outlined, generateTOC } from './lib/helpers/outlined'

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
  // 列表
  list?: boolean
  // 段落
  para?: IParagraph
  // 引用
  quote?: boolean
  // 表格
  table?: boolean
  img?: boolean
  link?: boolean
  // 行内代码
  inlinecode?: boolean
  code?: boolean
  // 折叠面板
  collapse?: boolean
  // Katex支持
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
  // 列表
  list: string
  orderlist: string
  disorderlist: string
  checklist: string
  // 段落
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
  // 引用
  quote: string
  // 表格
  table: string
  img: string
  link: string
  // 行内代码
  inlinecode: string
  code: string
  // 折叠面板
  collapse: string
  // katex
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
  // anchor
  anchor?: boolean
  outline?: boolean
  addImg?: (file: File, index: number) => void
  // highlight
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

class MdEditor extends React.Component<IP, IS> {
  static defaultProps = {
    lineNum: true,
    onChange: () => {},
    onSave: () => {},
    addImg: () => {},
    fontSize: '14px',
    disabled: false,
    preview: false,
    expand: false,
    subfield: false,
    style: {},
    toolbar: CONFIG.toolbar,
    language: 'en',
    outline: true,
    anchor: true
  }
  private $vm = React.createRef<HTMLTextAreaElement>()
  private $scrollEdit = React.createRef<HTMLDivElement>()
  private $scrollPreview = React.createRef<HTMLDivElement>()
  private $blockEdit = React.createRef<HTMLDivElement>()
  private $blockPreview = React.createRef<HTMLDivElement>()
  private currentTimeout: number
  constructor(props: IP) {
    super(props)

    this.state = {
      preview: props.preview,
      expand: props.expand,
      subfield: props.subfield,
      history: [],
      historyIndex: 0,
      lineIndex: 1,
      value: props.value,
      words: {
        placeholder: '',
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        undo: '',
        redo: '',
        list: '',
        orderlist: '',
        disorderlist: '',
        checklist: '',
        para: '',
        italic: '',
        bold: '',
        bolditalic: '',
        delline: '',
        underline: '',
        keytext: '',
        superscript: '',
        subscript: '',
        marktag: '',
        quote: '',
        table: '',
        img: '',
        link: '',
        inlinecode: '',
        code: '',
        collapse: '',
        katex: '',
        save: '',
        preview: '',
        singleColumn: '',
        doubleColumn: '',
        fullscreenOn: '',
        fullscreenOff: '',
        addImgLink: '',
        addImg: '',
        toc: ''
      }
    }
  }

  componentDidMount() {
    keydownListen(this.$vm.current, (type: string) => {
      this.toolBarLeftClick(type)
    })
    this.reHeight()
    this.initLanguage()
  }

  componentDidUpdate(preProps: IP) {
    const { value, preview, expand, subfield, language } = this.props
    const { history, historyIndex } = this.state
    if (preProps.value !== value) {
      this.reHeight()
    }
    if (value !== history[historyIndex]) {
      window.clearTimeout(this.currentTimeout)
      this.currentTimeout = window.setTimeout(() => {
        this.saveHistory(value)
      }, 500)
    }

    if (subfield !== preProps.subfield && this.state.subfield !== subfield) {
      this.setState({ subfield })
    }
    if (preview !== preProps.preview && this.state.preview !== preview) {
      this.setState({ preview })
    }
    if (expand !== preProps.expand && this.state.expand !== expand) {
      this.setState({ expand })
    }

    if (language !== preProps.language) {
      if (typeof language === 'string') {
        const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'en'
        this.setState({
          words: CONFIG.language[lang]
        })
      } else {
        this.setState({
          words: language
        })
      }
    }

    // 在此添加渲染函数
  }

  initLanguage = (): void => {
    const { language } = this.props
    if (typeof language === 'string') {
      const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'en'
      this.setState({
        words: CONFIG.language[lang]
      })
    } else {
      this.setState({
        words: language
      })
    }
  }

  // 输入框改变
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value
    this.props.onChange(value)
  }

  // 保存记录
  saveHistory = (value: string): void => {
    let { history, historyIndex } = this.state
    // 撤销后修改，删除当前以后记录
    history.splice(historyIndex + 1, history.length)
    if (history.length >= 20) {
      history.shift()
    }
    // 记录当前位置
    historyIndex = history.length
    history.push(value)
    this.setState({
      history,
      historyIndex
    })
  }

  reLineNum() {
    const { fontSize } = this.props
    const editHeight: number = parseFloat(
      this.$vm.current.getBoundingClientRect().height.toFixed(1)
    )
    const lineHeight: number = parseFloat(fontSize.replace('px', '')) * 1.6
    const baseHeight: number = parseInt(((editHeight - 16.0) / lineHeight).toFixed())
    this.setState({
      lineIndex: baseHeight
    })
  }

  reHeight() {
    this.$vm.current.style.height = ''
    this.$vm.current.style.height = this.$vm.current.scrollHeight + 'px'
    this.reLineNum()
  }

  // 保存
  save = (): void => {
    this.props.onSave(this.$vm.current!.value)
  }

  // 撤销
  undo = (): void => {
    let { history, historyIndex } = this.state
    historyIndex = historyIndex - 1
    if (historyIndex < 0) return
    this.props.onChange(history[historyIndex])
    this.setState({
      historyIndex
    })
  }

  // 重做
  redo = (): void => {
    let { history, historyIndex } = this.state
    historyIndex = historyIndex + 1
    if (historyIndex >= history.length) return
    this.props.onChange(history[historyIndex])
    this.setState({
      historyIndex
    })
  }

  // 菜单点击
  toolBarLeftClick = (type: string): void => {
    const { words } = this.state
    const insertTextObj: any = {
      h1: {
        prefix: '# ',
        subfix: '',
        str: words.h1
      },
      h2: {
        prefix: '## ',
        subfix: '',
        str: words.h2
      },
      h3: {
        prefix: '### ',
        subfix: '',
        str: words.h3
      },
      h4: {
        prefix: '#### ',
        subfix: '',
        str: words.h4
      },
      h5: {
        prefix: '##### ',
        subfix: '',
        str: words.h5
      },
      h6: {
        prefix: '###### ',
        subfix: '',
        str: words.h6
      },
      quote: {
        prefix: '> ',
        subfix: '',
        str: words.quote
      },
      italic: {
        prefix: '*',
        subfix: '*',
        str: words.italic
      },
      bold: {
        prefix: '**',
        subfix: '**',
        str: words.bold
      },
      bolditalic: {
        prefix: '***',
        subfix: '***',
        str: words.bolditalic
      },
      delline: {
        prefix: '~~',
        subfix: '~~',
        str: words.delline
      },
      underline: {
        prefix: '<u>',
        subfix: '</u>',
        str: words.underline
      },
      keytext: {
        prefix: '<kbd>',
        subfix: '</kbd>',
        str: words.keytext
      },
      superscript: {
        prefix: 'x<sup>',
        subfix: '</sup>',
        str: 'y'
      },
      subscript: {
        prefix: 'a<sub>',
        subfix: '</sub>',
        str: '1'
      },
      marktag: {
        prefix: '==',
        subfix: '==',
        str: words.marktag
      },
      table: {
        prefix: '',
        subfix: '',
        str:
          '| title      | description     |\n| ---------- | --------------- |\n| for-editor | markdown editor |\n'
      },
      img: {
        prefix: '![alt](',
        subfix: ')',
        str: 'url'
      },
      link: {
        prefix: '[title](',
        subfix: ')',
        str: 'url'
      },
      orderlist: {
        prefix: '\n1. ',
        subfix: '',
        str: 'item'
      },
      disorderlist: {
        prefix: '\n- ',
        subfix: '',
        str: 'item'
      },
      checklist: {
        prefix: '\n- [x] ',
        subfix: '',
        str: 'item'
      },
      inlinecode: {
        prefix: '`',
        subfix: '`',
        str: words.inlinecode
      },
      code: {
        prefix: '```',
        subfix: '\n\n```',
        str: 'language'
      },
      collapse: {
        prefix: '\n<details>\n<summary>title</summary>\n\n',
        subfix: '\n</details>\n\n',
        str: words.collapse
      },
      katex: {
        prefix: '\n\n$$\n',
        subfix: '\n$$\n',
        str: 'a^2 + b^2 = c^2'
      },
      tab: {
        prefix: '  ',
        subfix: '',
        str: ''
      }
    }

    if (insertTextObj.hasOwnProperty(type)) {
      if (this.$vm.current) {
        const value = insertText(this.$vm.current, insertTextObj[type])
        this.props.onChange(value)
      }
    }

    const otherLeftClick: any = {
      undo: this.undo,
      redo: this.redo,
      save: this.save
    }
    if (otherLeftClick.hasOwnProperty(type)) {
      otherLeftClick[type]()
    }
  }

  // 添加图片
  addImg = (file: File, index: number) => {
    this.props.addImg(file, index)
  }

  $img2Url = (name: string, url: string) => {
    const value = insertText(this.$vm.current, {
      prefix: `![${name}](${url})`,
      subfix: '',
      str: ''
    })
    this.props.onChange(value)
  }

  // 添加TOC
  addTOC = () => {
    const value = insertText(this.$vm.current, {
      prefix: '\n<!-- TOC -->\n\n',
      subfix: '\n<!-- TOC -->\n',
      str: generateTOC(this.props.value)
    })
    this.props.onChange(value)
  }

  // 右侧菜单
  toolBarRightClick = (type: string): void => {
    const toolbarRightPreviewClick = () => {
      this.setState({
        preview: !this.state.preview
      })
    }
    const toolbarRightExpandClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    }

    const toolbarRightSubfieldClick = () => {
      const { preview, subfield } = this.state
      if (subfield) {
        this.reHeight()
      }
      if (preview) {
        if (subfield) {
          this.setState({
            subfield: false,
            preview: false
          })
        } else {
          this.setState({
            subfield: true
          })
        }
      } else {
        if (subfield) {
          this.setState({
            subfield: false
          })
        } else {
          this.setState({
            preview: true,
            subfield: true
          })
        }
      }
    }

    const rightClick: any = {
      preview: toolbarRightPreviewClick,
      expand: toolbarRightExpandClick,
      subfield: toolbarRightSubfieldClick
    }
    if (rightClick.hasOwnProperty(type)) {
      rightClick[type]()
    }
  }

  focusText = (): void => {
    this.$vm.current!.focus()
  }

  handleScoll = (e: React.UIEvent<HTMLDivElement>): void => {
    const radio =
      this.$blockEdit.current!.scrollTop /
      (this.$scrollEdit.current!.scrollHeight - e.currentTarget.offsetHeight)
    this.$blockPreview.current!.scrollTop =
      (this.$scrollPreview.current!.scrollHeight - this.$blockPreview.current!.offsetHeight) * radio
  }

  render() {
    const { preview, expand, subfield, lineIndex, words } = this.state
    const {
      value,
      placeholder,
      fontSize,
      disabled,
      height,
      style,
      toolbar,
      outline,
      highlight,
      anchor
    } = this.props
    const editorClass = classNames({
      'for-editor-edit': true,
      'for-panel': true,
      'for-active': preview && subfield,
      'for-edit-preview': preview && !subfield
    })
    const previewClass = classNames({
      'for-panel': true,
      'for-editor-preview': true,
      'for-active': preview && subfield
    })
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand
    })
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    })

    // 行号
    function lineNum() {
      const list = []
      for (let i = 0; i < lineIndex; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }

    return (
      <div className={fullscreen} style={{ height, ...style }}>
        {/* 菜单栏 */}
        {Boolean(Object.keys(toolbar).length) && (
          <div className="for-toolbar">
            <ToolbarLeft
              toolbar={toolbar}
              words={words}
              onClick={this.toolBarLeftClick}
              addImg={this.addImg}
              addTOC={this.addTOC}
              {...this.props}
            />
            <ToolbarRight
              toolbar={toolbar}
              words={words}
              preview={preview}
              expand={expand}
              subfield={subfield}
              onClick={this.toolBarRightClick}
            />
          </div>
        )}
        {/* 内容区 */}
        <div className="for-editor" style={{ fontSize }}>
          {/* 编辑区 */}
          <div
            className={editorClass}
            ref={this.$blockEdit}
            onScroll={this.handleScoll}
            onClick={this.focusText}
          >
            <div className="for-editor-block" ref={this.$scrollEdit}>
              {lineNum()}
              <div className="for-editor-content">
                <pre id="true-value">{value} </pre>
                <textarea
                  ref={this.$vm}
                  value={value}
                  disabled={disabled}
                  onChange={this.handleChange}
                  placeholder={placeholder ? placeholder : words.placeholder}
                />
              </div>
            </div>
          </div>
          {/* 大纲 */}
          {preview && outline && anchor && (
            <div id="for-outline-box" className="for-outline-box">
              <div className="for-outline-title">
                <i className="foricon for-outline"></i>
              </div>
              <div
                className="for-outline-body"
                dangerouslySetInnerHTML={{ __html: outlined(value) }}
              ></div>
            </div>
          )}

          {/* 预览区 */}
          <div className={previewClass} ref={this.$blockPreview}>
            <div
              id="for-preview"
              ref={this.$scrollPreview}
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: marked(value, highlight, anchor) }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}

export default MdEditor
