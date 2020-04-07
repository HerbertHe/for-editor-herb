# for-editor-herb

基于[for-editor](https://github.com/kkfor/for-editor)的分支，因为原作者太久没有更新了，PR也没有处理，有些小伙伴看修改文档觉得没有很方便，索性就开了这个项目。本项目将会与给`for-editor`的提交保持同步。拥抱开源，如果你喜欢，请给个star给原项目

* [demo](https://server.jieec.cn/example)
* [github](https://github.com/HerbertHe/for-editor-herb)

> 基于`0.3.5`开始构建

## 更多的特性

* [x] 工具栏按钮 quote/paragraph/table/inline code/collapse/katex/list
* [x] 支持渲染Tex块和行内Tex语句
* [x] `mermiad`渲染（实验性，mermaidAPI使用有些bug，已经提交）
* [x] 响应式布局

## [English Documents](./README.EN.md)

## 安装

```shell
# npm
npm install for-editor-herb -S
# yarn
yarn add for-editor-herb
```

## 使用

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'for-editor-herb'

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

## API

### 属性

| name        | type    | default     | description                        |
| ----------- | ------- | ----------- | ---------------------------------- |
| value       | String  | -           | 输入框内容                         |
| placeholder | String  | 开始编辑...   | 占位文本                           |
| lineNum     | Boolean | true        | 是否显示行号                       |
| style       | Object  | -           | 编辑器样式                         |
| height      | String  | 600px       | 编辑器高度                         |
| preview     | Boolean | false       | 预览模式                           |
| expand      | Boolean | false       | 全屏模式                           |
| subfield    | Boolean | false       | 双栏模式(预览模式激活下有效)       |
| language    | String  | zh-CN       | 语言(支持 zh-CN:中文简体, en:英文) |
| toolbar     | Object  | 如下         | 自定义工具栏                       |

```js
/*
默认工具栏按钮全部开启, 传入自定义对象
  例如: {
    h1: true, // h1
    code: true, // 代码块
    preview: true, // 预览
  }
  此时, 仅仅显示此三个功能键
  注:传入空对象则不显示工具栏
*/
toolbar: {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    img: true,
    list: true,
    para: true,       // 段落
    table: true,      // 表格
    quote: true,      // 引用
    link: true,       // 链接
    innercode: true,  // 行内代码
    code: true,       // 代码块
    collapse: true,   // 折叠
    katex: true,      // katex
    preview: true,    // 预览
    expand: true,     // 全屏
    undo: true,
    redo: true,
    save: true,
    subfield: true,   // 单双栏切换
}
```

### 事件

| name     | params        | default | description         |
| -------- | ------------- | ------- | ------------------- |
| onChange | String: value | -       | 内容改变的回调         |
| onSave   | String: value | -       | 保存时回调            |
| addImg   | File: file    | -       | 添加图片时回调         |

### 图片上传

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

### 快捷键

| name   | description |
| ------ | ----------- |
| tab    | 两空格缩进    |
| ctrl+s | 保存         |
| ctrl+z | 上一步       |
| ctrl+y | 下一步       |

## 更新日志

* [更新日志](./doc/UPDATELOG.md)

## License

for-editor-herb is [MIT License](./LICENSE)
