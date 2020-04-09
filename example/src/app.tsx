import React, { Component } from 'react'
import Editor from '../../src/index'
import * as styles from './app.module.scss'
import value from '../static/help.md'

const Hljs = require('highlight.js')

interface IS {
  value: string
  mobile: boolean
}

class App extends Component<{}, IS> {
  private $vm = React.createRef<Editor>()

  constructor(props: any) {
    super(props)

    this.state = {
      value: '',
      mobile: false
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
          <h1>for-editor-herb</h1>
          <ul>
            <li>
              <a
                href="https://github.com/HerbertHe/for-editor-herb"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.editor}>
          {mobile && (
            <Editor
              ref={this.$vm}
              height="500px"
              language="en"
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
              language="en"
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
