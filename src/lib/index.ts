import zhCN from './lang/zh-CN/index.json'
import en from './lang/en/index.json'
import zhTW from './lang/zh-TW/index.json'
import jp from './lang/jp/index.json'
import { IToolbar, IWords } from '../index'
export interface ICONFIG {
  language: {
    'zh-CN': IWords
    'zh-TW': IWords
    'en': IWords
    'jp': IWords
    [key: string]: IWords
  }
  langList: string[]
  toolbar: IToolbar
}

// 编辑栏设置
export const CONFIG: ICONFIG = {
  language: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en': en,
    'jp': jp
  },
  langList: ['zh-CN', 'zh-TW', 'en', 'jp'],
  toolbar: {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    img: true,
    para: true,
    table: true,
    quote: true,
    link: true,
    list: true,
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
    toc: true
  }
}
