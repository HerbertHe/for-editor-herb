# for-editor-herb

[![version](https://img.shields.io/npm/v/for-editor-herb.svg)](https://www.npmjs.com/package/for-editor-herb)
[![download](https://img.shields.io/npm/dm/for-editor-herb.svg)](https://www.npmjs.com/package/for-editor-herb)
[![cnpmVersion](https://cnpmjs.org/badge/v/for-editor-herb.svg)](https://cnpmjs.org/package/for-editor-herb)
[![cnpmDownload](https://cnpmjs.org/badge/d/for-editor-herb.svg)](https://cnpmjs.org/package/for-editor-herb)

> React的markdown编辑器组件，支持Tex渲染

## 版本说明

### 版本号说明

`x.x.x` --> `不兼容更新` . `新特性更新(含已知bug修复)` . `bug修复`

基于[for-editor](https://github.com/kkfor/for-editor)的分支，因为原作者太久没有更新了，PR也没有处理，有些小伙伴看修改文档觉得没有很方便，索性就开了这个项目。拥抱开源，如果你喜欢，请给个star给原项目

* [Demo](https://herberthe.gitee.io/for-editor-herb/)
* [GitHub](https://github.com/HerbertHe/for-editor-herb)

> 基于`0.3.5`开始构建

### 更多的特性

* [x] 工具栏按钮 quote/paragraph/table/inline code/collapse/katex/list
* [x] 支持渲染Tex块和行内Tex语句
* [x] 响应式布局
* [x] 支持预览大纲跳转锚点
* [x] 生成大纲插入
* [x] 支持简体中文、英文、繁体中文、日文
* [x] 支持编辑器本土化( v2.3.3~ )
* [x] 支持GitHub Diff语法 ( v1.5.0~ )
* [x] 支持自定义高亮代码语言类型 ( v2.0.0~ )
* [x] 支持`emoji shortname` 渲染`emoji` ( v2.2.0~ ), 更多详情访问 [joypixels](https://www.joypixels.com/emoji)
* [x] 支持扩展语法
  * 支持`==Mark==`语法高亮行内文本

### 文档

* [English Document](./README.md)

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
// 引入代码高亮包
const Hljs = require('highlight.js')

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    // 在componentDidMount生命周期注册你想高亮的语言
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
    // 支持默认语言('en', 'zh-CN', 'zh-TW', 'jp'), 也支持本土化
    const customLang: any = {
      placeholder: '开始编辑...',
      undo: '上一步',
      redo: '下一步',
      h1: '一级标题',
      h2: '二级标题',
      h3: '三级标题',
      h4: '四级标题',
      h5: '五级标题',
      h6: '六级标题',
      para: '段落',
      italic: '斜体',
      bold: '粗体',
      bolditalic: '斜粗体',
      delline: '删除线',
      underline: '下划线',
      keytext: '键盘文本',
      superscript: '上标',
      subscript: '下标',
      marktag: '高亮标签',
      table: '表格',
      quote: '引用',
      img: '添加图片链接',
      link: '链接',
      list: '列表',
      orderlist: '有序列表',
      disorderlist: '无序列表',
      checklist: '勾选框列表',
      inlinecode: '行内代码',
      code: '代码块',
      collapse: '折叠块',
      katex: 'KaTeX',
      save: '保存',
      preview: '预览',
      singleColumn: '单栏',
      doubleColumn: '双栏',
      fullscreenOn: '全屏编辑',
      fullscreenOff: '退出全屏',
      addImgLink: '添加图片链接',
      addImg: '上传图片',
      toc: '生成大纲'
    }
    // 传递Hljs.highlightAuto函数
    return （
      <Editor
        language={customLang}
        value={value}
        onChange={() => this.handleChange()}
        highlight={Hljs.highlightAuto}
      />
    ）
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## API

### 属性

| name        | type    | default     | description                                                   |
| ----------- | ------- | ----------- | ------------------------------------------------------------- |
| value       | String  | -           | 输入框内容                                                      |
| placeholder | String  | 开始编辑...   | 占位文本                                                       |
| lineNum     | Boolean | true        | 是否显示行号                                                    |
| style       | Object  | -           | 编辑器样式                                                      |
| height      | String  | 600px       | 编辑器高度                                                      |
| preview     | Boolean | false       | 预览模式                                                        |
| expand      | Boolean | false       | 全屏模式                                                        |
| subfield    | Boolean | false       | 双栏模式(预览模式激活下有效)                                       |
| language    | String `|` IWords | en       | 默认语言(支持 zh-CN:中文简体, en:英文, zh-TW: 繁体中文, jp: 日语)，支持按照IWords这个interface本土化       |
| toolbar     | Object  | 如下         | 自定义工具栏                                                    |
| outline     | Boolean | true        | 显示Markdown的大纲                                              |
| highlight   | Function | Hljs.highlightAuto | Hljs(highlight.js) 的 highlightAuto函数                 |
| anchor      | Boolean  | true       | 是否在预览的标题显示锚点                                           |

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
    h5: true,
    h6: true,
    img: true,
    list: true,
    para: {
      paragraph: true,        // 控制整个部分是否显示
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
    table: true,      // 表格
    quote: true,      // 引用
    link: true,       // 链接
    inlinecode: true,  // 行内代码
    code: true,       // 代码块
    collapse: true,   // 折叠
    katex: true,      // katex
    preview: true,    // 预览
    expand: true,     // 全屏
    undo: true,
    redo: true,
    save: true,
    subfield: true,   // 单双栏切换
    toc: true         // 生成大纲插入
}
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

### 事件

| name     | params        | default | description    |
| -------- | ------------- | ------- | -------------- |
| onChange | String: value | -       | 内容改变的回调    |
| onSave   | String: value | -       | 保存时回调       |
| addImg   | File: file    | -       | 添加图片时回调    |

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
