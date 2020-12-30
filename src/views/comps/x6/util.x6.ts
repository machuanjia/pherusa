/** @format */
import { Graph } from '@antv/x6'
import { SimpleNodeView } from './x6.map'

export class X6Editor {
  private graph
  private options: any = {
    container: null,
    width: 800,
    height: 600,
    grid: true, //网格
    background: false, //背景
    clipboard: true, //剪切板
    history: true, //撤销、重做
    selecting: {
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    }, //点选、框选
    snapline: true, // 对齐线
    scroller: true, // 滚动
  }

  constructor(ops: { container: string; miniMap: string }) {
    this.options = Object.assign({}, this.options, ops)
    const container = document.getElementById(this.options.container)
    if (this.options.miniMap) {
      const miniMap = document.getElementById(this.options.miniMap)
      this.options.minimap = {
        enabled: true,
        container: miniMap,
        width: 150,
        height: 150,
        padding: 10,
        graphOptions: {
          async: true,
          getCellView(cell) {
            if (cell.isNode()) {
              return SimpleNodeView
            }
          },
          createCellView(cell) {
            if (cell.isEdge()) {
              return null
            }
          },
        },
      }
      delete this.options.miniMap
    }
    this.options.container = container
    this.options.width = container.clientWidth
    this.options.height = container.clientHeight
    this.init()
  }

  init() {
    this.graph = new Graph(this.options)
  }

  loadData(data) {
    this.graph.fromJSON(data)
  }
}
