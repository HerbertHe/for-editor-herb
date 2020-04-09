import React, { Component } from 'react'
import Editor from '../../src/index'
import * as styles from './app.module.scss'
import value from '../static/help.md'

const Hljs = require('highlight.js')

interface IS {
  value: string
  mobile: boolean
  language: string
}

class App extends Component<{}, IS> {
  private $vm = React.createRef<Editor>()

  constructor(props: any) {
    super(props)

    this.state = {
      value: '',
      mobile: false,
      language: 'en'
    }
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)

    Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
    Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
    Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
    Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
    Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
    Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
    Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))

    // eslint-disable-next-line no-console
    console.log(Hljs)
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.setState({
        mobile: false
      })
    } else {
      this.setState({
        mobile: true
      })
    }
  }

  handleChange(value: string) {
    this.setState({
      value
    })
  }

  handleSave(value: string) {
    // eslint-disable-next-line no-console
    console.log('触发保存事件', value)
  }

  addImg($file: File) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    // eslint-disable-next-line no-console
    console.log($file)
  }

  render() {
    const { value, mobile } = this.state

    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1>Live Editor</h1>
            <div>
              <a href="https://www.npmjs.com/package/for-editor-herb">
                <img
                  alt="version"
                  src="https://img.shields.io/npm/v/for-editor-herb.svg"
                  width="80px"
                  height="20px"
                />
              </a>
              <a href="https://www.npmjs.com/package/for-editor-herb" style={{ marginLeft: '5px' }}>
                <img
                  alt="download"
                  src="https://img.shields.io/npm/dm/for-editor-herb.svg"
                  width="140px"
                  height="20px"
                />
              </a>
            </div>
            <div>
              <a href="https://cnpmjs.org/package/for-editor-herb">
                <img
                  alt="cnpmVersion"
                  src="https://cnpmjs.org/badge/v/for-editor-herb.svg"
                  width="80px"
                  height="20px"
                />
              </a>
              <a href="https://cnpmjs.org/package/for-editor-herb" style={{ marginLeft: '5px' }}>
                <img
                  alt="cnpmDownload"
                  src="https://cnpmjs.org/badge/d/for-editor-herb.svg"
                  width="93px"
                  height="20px"
                />
              </a>
            </div>
          </div>
          <div className={styles.topRight}>
            <a
              href="https://github.com/HerbertHe/for-editor-herb"
              title="https://github.com/HerbertHe/for-editor-herb"
            >
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2481"
                width="45"
                height="45"
              >
                <path
                  d="M569.6 659.2c12.8-3.2 25.6-3.2 38.4-6.4 38.4-9.6 70.4-28.8 86.4-64 19.2-38.4 22.4-76.8 12.8-118.4-3.2-19.2-12.8-32-25.6-48-3.2-3.2-3.2-6.4-3.2-9.6 6.4-25.6 6.4-48-3.2-73.6 0-3.2-3.2-6.4-9.6-6.4-16 0-28.8 6.4-41.6 12.8s-22.4 12.8-32 19.2c-3.2 3.2-6.4 3.2-9.6 3.2-51.2-12.8-99.2-12.8-150.4 0-3.2 0-6.4 0-9.6-3.2-22.4-12.8-41.6-25.6-67.2-28.8-16-3.2-16-3.2-19.2 12.8-6.4 22.4-6.4 44.8 0 67.2v6.4c-28.8 32-35.2 73.6-28.8 112 3.2 12.8 3.2 22.4 6.4 35.2 16 44.8 48 70.4 96 83.2 12.8 3.2 25.6 6.4 41.6 9.6-9.6 9.6-16 25.6-19.2 38.4 0 3.2-3.2 3.2-3.2 3.2-32 12.8-67.2 9.6-89.6-25.6-9.6-16-22.4-28.8-44.8-32h-16c-6.4 0-6.4 6.4-3.2 9.6l6.4 6.4c16 9.6 28.8 25.6 35.2 44.8 12.8 28.8 35.2 41.6 67.2 44.8 12.8 0 28.8 0 44.8-3.2v60.8c0 9.6-9.6 16-22.4 12.8-25.6-9.6-51.2-22.4-76.8-38.4-96-67.2-147.2-160-140.8-278.4 6.4-147.2 115.2-265.6 259.2-294.4 166.4-32 326.4 70.4 371.2 233.6 41.6 160-51.2 326.4-204.8 377.6-16 6.4-25.6 0-25.6-19.2v-76.8c3.2-25.6 0-48-19.2-67.2z"
                  fill="#FFFFFF"
                  p-id="2482"
                ></path>
              </svg>
            </a>
            <select
              value={this.state.language}
              onChange={(e) => {
                this.setState({
                  language: e.target.value
                })
                this.forceUpdate()
              }}
            >
              <option value="en">English</option>
              <option value="zh-CN">中文(简体)</option>
              <option value="zh-TW">中文(繁體)</option>
              <option value="jp">日本語</option>
            </select>
          </div>
        </div>
        <div className={styles.editor}>
          {mobile && (
            <Editor
              ref={this.$vm}
              height="500px"
              language={this.state.language}
              value={value}
              subfield={false}
              onChange={(value) => this.handleChange(value)}
              onSave={(value) => this.handleSave(value)}
              highlight={Hljs.highlightAuto}
            />
          )}
          {!mobile && (
            <Editor
              ref={this.$vm}
              language={this.state.language}
              height="700px"
              value={value}
              addImg={($file) => this.addImg($file)}
              onChange={(value) => this.handleChange(value)}
              onSave={(value) => this.handleSave(value)}
              highlight={Hljs.highlightAuto}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
