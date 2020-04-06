# for-editor-herb

A branch of [for-editor](https://github.com/kkfor/for-editor)! Beacuse of long time without refreshing, without PR handler, the repository is builded and keep in sync with `for-editor` PR. Hug to Open Source! If you like this, please give a star to [for-editor](https://github.com/kkfor/for-editor)

* [demo](https://server.jieec.cn/editor)
* [github](https://github.com/HerbertHe/for-editor-herb)

> Base on `0.3.5`

## What's New

* [x] Toolbar button: quote/paragraph/table/inline code/collapse/katex
* [x] `Tex` render support by `katex`
* [x] `mermaid` render(experimental, some bugs happened using `mermaidAPI`)
* [x] Responsive Layout

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
import Editor from 'for-editor'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return <Editor value={value} onChange={() => this.handleChange()} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Api

### props

| name        | type    | default             | description         |
| ----------- | ------- | ------------------- | ------------------  |
| value       | String  | -                   | value               |
| language    | String  | zh-CN               | Language switch, zh-CN: Simplified Chinese, en: English     |
| placeholder | String  | Begin editing...            | The default prompt text when the textarea is empty  |
| lineNum     | Boolean | true                        | Show lineNum                                        |
| style       | Object  | -                           | editor styles                                       |
| height      | String  | 600px                       | editor height                                       |
| preview     | Boolean | false                       | preview switch                                      |
| expand      | Boolean | false                       | fullscreen switch                                   |
| subfield    | Boolean | false                       | true: Double columns - Edit preview same screen(notice: preview: true), Single Columns - otherwise not |
| toolbar     | Object  | As in the following example | toolbars                                            |

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
    para: true,       // parapraph
    table: true,
    quote: true,
    link: true,
    innercode: true,
    code: true,
    collapse: true,
    katex: true,
    preview: true,
    expand: true,
    undo: true,
    redo: true,
    save: true,
    subfield: true,
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
