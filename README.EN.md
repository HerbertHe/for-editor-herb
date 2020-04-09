# for-editor-herb

> Markdown editor for React, support Tex rendering!

A branch of [for-editor](https://github.com/kkfor/for-editor)! Beacuse of long time without refreshing, without PR handler, the repository is built and kept in sync with `for-editor` PR. Hug to Open Source! If you like this, please give a star to [for-editor](https://github.com/kkfor/for-editor)

* [demo](https://goer.icu/for-editor-herb/)
* [github](https://github.com/HerbertHe/for-editor-herb)

> Base on `0.3.5`

## What's New

* [x] Toolbar button: quote/paragraph/table/inline code/collapse/katex/list
* [x] Support to render `Tex` Block and Inline `Tex` sentences
* [x] Responsive Layout
* [x] Support Preview Outline for jumping appointed anchor
* [x] Generate TOC
* [x] Support Traditional Chinese, Japanese (Welcome to PR translation to different lanaguages & Help to correct translation)
* [x] Support GitHub Diff Syntax ( v1.5.0~ )
* [x] Support highlight the programming language which you want ( v2.0.0~ )

## Install

```shell
# npm
npm install for-editor-herb -S
# yarn
yarn add for-editor-herb
```

## Use

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'for-editor-herb'

// require `highlight.js` package
const Hljs = require('highlight.js')

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    // register languages in componentDidMount lifecycle
    Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
    Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
    Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
    Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
    Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
    Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
    Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    // Transfer function `Hljs.highlightAuto` to the Editor
    return (
      <Editor
        value={value}
        onChange={() => this.handleChange()}
        highlight={Hljs.highlightAuto}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Api

### props

| name        | type    | default             | description         |
| ----------- | ------- | ------------------- | ------------------  |
| value       | String  | -                   | value               |
| language    | String  | zh-CN               | Language switch, zh-CN: Simplified Chinese, en: English, zh-TW: Traditional Chinese, jp: Japanese     |
| placeholder | String  | Begin editing...            | The default prompt text when the textarea is empty  |
| lineNum     | Boolean | true                        | Show lineNum                                        |
| style       | Object  | -                           | editor styles                                       |
| height      | String  | 600px                       | editor height                                       |
| preview     | Boolean | false                       | preview switch                                      |
| expand      | Boolean | false                       | fullscreen switch                                   |
| subfield    | Boolean | false                       | true: Double columns - Edit preview same screen(notice: preview: true), Single Columns - otherwise not |
| toolbar     | Object  | As in the following example | toolbars                                            |
| outline     | Boolean | true | Display outline list for markdown                                          |
| highlight   | Function| Hljs.highlightAuto | Hljs (highlight.js)'s function --- highAuto                  |

```js
/*
  The default toolbar properties are all true,
  You can customize the object to cover them.
  eg: {
    h1: true,
    code: true,
    preview: true,
  }
  At this point, the toolbar only displays the three function keys.
  notice: Toolbar will be hidden when empty object.
 */

toolbar: {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    img: true,
    list: true,
    para: true,       // parapraph
    table: true,
    quote: true,
    link: true,
    inlinecode: true,
    code: true,
    collapse: true,
    katex: true,
    preview: true,
    expand: true,
    undo: true,
    redo: true,
    save: true,
    subfield: true,
    toc: true         // generate TOC
```

### events

| name     | params        | default | description                                 |
| -------- | ------------- | ------- | ------------------------------------------- |
| onChange | String: value | -       | Edit area change callback event             |
| onSave   | String: value | -       | Ctrl+s and click save button callback event |
| addImg   | File: file    | -       | upload image callback event                 |

### upload image

```js
class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  addImg($file) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  render() {
    const { value } = this.state

    return (
      <Editor
        ref={this.$vm}
        value={value}
        addImg={($file) => this.addImg($file)}
        onChange={(value) => this.handleChange(value)}
      />
    )
  }
}
```

### hot key

| name   | description |
| ------ | ----------- |
| tab    | two space   |
| ctrl+s | save        |
| ctrl+z | undo        |
| ctrl+y | redo        |

## Update

* [Update Log](./doc/UPDATELOG.md)

## Licence

for-editor is [MIT Licence](./LICENSE).
