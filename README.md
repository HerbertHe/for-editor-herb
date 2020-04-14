# for-editor-herb

[![version](https://img.shields.io/npm/v/for-editor-herb.svg)](https://www.npmjs.com/package/for-editor-herb)
[![download](https://img.shields.io/npm/dm/for-editor-herb.svg)](https://www.npmjs.com/package/for-editor-herb)
[![cnpmVersion](https://cnpmjs.org/badge/v/for-editor-herb.svg)](https://cnpmjs.org/package/for-editor-herb)
[![cnpmDownload](https://cnpmjs.org/badge/d/for-editor-herb.svg)](https://cnpmjs.org/package/for-editor-herb)

> Markdown editor for React, support Tex rendering!

## About Versions

### About Version Number

`x.x.x` ---> `Incompatible Update` . `New Features(include Fixing Known Bugs)` . `Fix Bugs`

A branch of [for-editor](https://github.com/kkfor/for-editor)! Beacuse of long time without refreshing, without PR handler. Hug to Open Source! If you like this, please give a star to [for-editor](https://github.com/kkfor/for-editor)

* [Demo](https://goer.icu/for-editor-herb/)
* [GitHub](https://github.com/HerbertHe/for-editor-herb)

> Base on `0.3.5`

### What's New

* [x] Toolbar button: quote/paragraph/table/inline code/collapse/katex/list
* [x] Support to render `Tex` Block and Inline `Tex` sentences
* [x] Responsive Layout
* [x] Support Preview Outline for jumping appointed anchor
* [x] Generate TOC
* [x] Support Simplified Chinese, Traditional Chinese, English, Japanese
* [x] Support localization ( v2.3.3~ )
* [x] Support GitHub Diff Syntax ( v1.5.0~ )
* [x] Support to highlight the programming language which you want ( v2.0.0~ )
* [x] Support to render `emoji` by `emoji shortname` ( v2.2.0~ ), visit [joypixels](https://www.joypixels.com/emoji) for more information
* [x] Support markdown Expanded Syntax
  * use `==Mark==` to highlight (mark) the inline text ( v2.3.0~ )

### Documents

* [简体中文](./README.CN.md)

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
    // Support default language('en', 'zh-CN', 'zh-TW', 'jp') and localization
    const customLang: any = {
      placeholder: "Begin editing...",
      undo: "Undo",
      redo: "Redo",
      h1: "Header 1",
      h2: "Header 2",
      h3: "Header 3",
      h4: "Header 4",
      h5: "Header 5",
      h6: "Header 6",
      img: "Image Link",
      para: "Paragraphy",
      italic: "Italic",
      bold: "Bold",
      bolditalic: "Bold Italic",
      delline: "Delete Line",
      underline: "Underline",
      keytext: "Keyboard Text",
      superscript: "Superscript",
      subscript: "Subscript",
      marktag: "Mark Tag",
      table: "Table",
      quote: "Quote",
      link: "Link",
      list: "List",
      orderlist: "Order List",
      disorderlist: "Disorder List",
      checklist: "Check List",
      inlinecode: "Inline Code",
      code: "Code",
      collapse: "Collapse",
      katex: "KaTeX",
      save: "Save",
      preview: "Preview",
      singleColumn: "Single Column",
      doubleColumn: "Double Columns",
      fullscreenOn: "FullScreen ON",
      fullscreenOff: "FullScreen OFF",
      addImgLink: "Add Image Link",
      addImg: "Upload Image",
      toc: "Generate TOC"
    }

    }
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

| name        | type     | default                     | description                                                                                            |
| ----------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| value       | String   | -                           | value                                                                                                  |
| language    | String / IWords  | en   | Default Language(zh-CN: Simplified Chinese, en: English, zh-TW: Traditional Chinese, jp: Japanese), support localization by following the `interface IWords`     |
| placeholder | String   | Begin editing...            | The default prompt text when the textarea is empty                                                     |
| lineNum     | Boolean  | true                        | Show lineNum                                                                                           |
| style       | Object   | -                           | editor styles                                                                                          |
| height      | String   | 600px                       | editor height                                                                                          |
| preview     | Boolean  | false                       | preview switch                                                                                         |
| expand      | Boolean  | false                       | fullscreen switch                                                                                      |
| subfield    | Boolean  | false                       | true: Double columns - Edit preview same screen(notice: preview: true), Single Columns - otherwise not |
| toolbar     | Object   | As in the following example | toolbars                                                                                               |
| outline     | Boolean  | true                        | Display outline list for markdown                                                                      |
| highlight   | Function | Hljs.highlightAuto          | Hljs (highlight.js)'s function --- highlightAuto                                                       |
| anchor | Boolean | true | Control if the anchor is displayed at the preview |

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
    h5: true,
    h6: true,
    img: true,
    list: true,
    para: {
      paragraph: true,            // control the whole part if you don't want to display
      italic: true,
      bold: true,
      bolditalic: true,
      delline: true,
      underline: true,
      keytext: true,
      superscript: true,
      subscript: true,
      marktag: true
    },
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

#### Localization

> IWords

```js
interface IWords {
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
