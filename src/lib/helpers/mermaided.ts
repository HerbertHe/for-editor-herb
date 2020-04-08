import mermaid from 'mermaid'
const md5 = require('md5')

mermaid.mermaidAPI.initialize({
  theme: 'forest',
  logLevel: 1,
  securityLevel: 'strict',
  startOnLoad: true,
  arrowMarkerAbsolute: false,

  flowchart: {
    htmlLabels: true,
    curve: 'linear'
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    bottomMarginAdj: 1,
    useMaxWidth: true
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    fontFamily: '"Open-Sans", "sans-serif"',
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d'
  }
})

const mermaided = (id: string, code: string): string => {
  try {
    let back: string = ''
    mermaid.render(id, code, (html) => {
      back = html
    })
    return back
  } catch (e) {}
}

// md5会增加不确定性，干掉他
const mermaidMd5 = (code: string): string => {
  return md5(code)
}

export { mermaided, mermaidMd5 }
