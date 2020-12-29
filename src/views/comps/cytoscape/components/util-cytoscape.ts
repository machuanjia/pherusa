/** @format */
import cytoscape from 'cytoscape'
import tippy from 'tippy.js'
import { jsPDF } from 'jspdf'
import edgeBendEditing from 'cytoscape-edge-bend-editing'
import popper from 'cytoscape-popper'
import contextMenus from 'cytoscape-context-menus'

cytoscape.use(popper)
cytoscape.use(contextMenus)
edgeBendEditing(cytoscape)

export class CytoscapeGenerator {
  private cy
  private container
  private contextMenu
  public static LAYOUT_MANUAL_BEZIER = 0
  public static LAYOUT_DAGRE_LR = 1
  public static LAYOUT_DAGRE_TB = 2
  public static LAYOUT_BREADTH_FIRST = 3
  private NAME_PROP = 'oriname'
  private MAX_AUTOFIT_ZOOM = 1
  private options = {
    maxZoom: 1e50,
    minZoom: 1e-50,
    panningEnabled: true,
    userPanningEnabled: true,
    userZoomingEnabled: true,
    wheelSensitivity: 0.1,
    zoom: 1,
    zoomingEnabled: true,
  }
  private style = [
    {
      selector: 'node',
      style: {
        'background-color': 'data(color)',
        'border-color': 'black',
        'border-width': 'data(borderwidth)',
        color: 'data(textcolor)',
        content: 'data(name)',
        'font-size': 'data(textsize)',
        height: 'data(height)',
        padding: 0,
        shape: 'data(shape)',
        'text-border-width': 0,
        'text-max-width': 'data(textwidth)',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        width: 'data(width)',
      },
    },
    {
      selector: 'edge',
      style: {
        color: 'data(color)',
        'control-point-step-size': 60,
        'curve-style': 'bezier',
        'edge-text-rotation': 0,
        'font-size': 16,
        label: 'data(label)',
        'line-color': 'data(color)',
        'line-style': 'data(style)',
        'loop-direction': -41,
        'loop-sweep': 181,
        opacity: 1,
        'source-arrow-color': 'data(color)',
        'target-arrow-color': 'data(color)',
        'target-arrow-shape': 'triangle',
        'text-background-color': '#ffffff',
        'text-background-opacity': 0,
        'text-background-padding': 5,
        'text-background-shape': 'roundrectangle',
        'text-margin-y': -16,
        'text-wrap': 'wrap',
        width: 'mapData(strength, 0, 100, 1, 6)',
      },
    },
    {
      selector: ':selected',
      style: {
        'border-color': '#ffa500',
        'border-width': '2px',
        color: '#ffa500',
        'line-color': '#ffa500',
        'line-style': 'solid',
        'target-arrow-color': '#ffa500',
      },
    },
  ]
  private elements = {
    nodes: [],
    edges: [],
  }
  private layouters = {
    [CytoscapeGenerator.LAYOUT_MANUAL_BEZIER]: () => {
      this.cy
        .style()
        .selector('edge')
        .style({
          'curve-style': ele => {
            return ele.data('edge-style')
          },
          'edge-distances': 'intersection',
          'control-point-distances': ele => {
            if (ele.data('edge-style') === 'unbundled-bezier') {
              return ele.data('point-distances')
            } else {
              return '0'
            }
          },
          'control-point-weights': ele => {
            if (ele.data('edge-style') === 'unbundled-bezier') {
              return ele.data('point-weights')
            } else {
              return '0.5'
            }
          },
        })
        .update()

      this.cy
        .elements()
        .layout({
          name: 'preset',
        })
        .run()
    },
    [CytoscapeGenerator.LAYOUT_DAGRE_LR]: () => {
      this.cy
        .elements()
        .layout({
          avoidOverlap: !0,
          edgeSep: 50,
          name: 'dagre',
          nodeSep: 110,
          randomize: false,
          rankDir: 'LR',
          ranker: 'network-simplex',
        })
        .run()
    },
    [CytoscapeGenerator.LAYOUT_DAGRE_TB]: randomize => {
      this.cy
        .style()
        .selector('edge')
        .style({
          'text-background-opacity': 1,
          'text-margin-y': 0,
        })
        .update()

      this.cy
        .elements()
        .layout({
          avoidOverlap: !0,
          edgeSep: 50,
          name: 'dagre',
          nodeSep: 110,
          randomize,
          rankDir: 'TB',
          ranker: 'tight-tree',
        })
        .run()
    },
    [CytoscapeGenerator.LAYOUT_BREADTH_FIRST]: () => {
      this.cy
        .style()
        .selector('edge')
        .style({
          'text-background-opacity': 1,
          'text-margin-y': 0,
        })
        .update()

      this.cy
        .elements()
        .layout({
          avoidOverlap: true,
          directed: !0,
          name: 'breadthfirst',
          spacingFactor: 1,
        })
        .run()
    },
  }
  private currentLayout = 0
  private isCtrlPressed = false
  private isAltPressed = false
  private currentNodeTooltip
  private currentZoomLevel = 1
  private currentPanPosition
  private isTraceMode = false

  private removed

  constructor(options: { container: string }) {
    this.container = document.getElementById('cy')
    this.init()
  }

  init() {
    this.cy = cytoscape(
      Object.assign(this.options, {
        container: this.container,
        style: this.style,
        elements: this.elements,
      }),
    )
    this.setContextMenu()
    this.bindActions()
  }

  setContextMenu() {
    this.contextMenu = this.cy.contextMenus({
      menuItems: [
        {
          id: 'remove',
          content: 'remove',
          tooltipText: 'remove',
          image: { src: 'assets/remove.svg', width: 12, height: 12, x: 6, y: 4 },
          selector: 'node, edge',
          onClickFunction: event => {
            var target = event.target || event.cyTarget
            this.removed = target.remove()
            this.contextMenu.showMenuItem('undo-last-remove')
          },
          hasTrailingDivider: true,
        },
        {
          id: 'undo-last-remove',
          content: 'undo last remove',
          selector: 'node, edge',
          show: false,
          coreAsWell: true,
          onClickFunction: event => {
            if (this.removed) {
              this.removed.restore()
            }
            this.contextMenu.hideMenuItem('undo-last-remove')
          },
          hasTrailingDivider: true,
        },
        {
          id: 'color',
          content: 'change color',
          tooltipText: 'change color',
          selector: 'node',
          hasTrailingDivider: true,
          submenu: [
            {
              id: 'color-blue',
              content: 'blue',
              tooltipText: 'blue',
              onClickFunction: event => {
                let target = event.target || event.cyTarget
                target.style('background-color', 'blue')
              },
              submenu: [
                {
                  id: 'color-light-blue',
                  content: 'light blue',
                  tooltipText: 'light blue',
                  onClickFunction: event => {
                    let target = event.target || event.cyTarget
                    target.style('background-color', 'lightblue')
                  },
                },
                {
                  id: 'color-dark-blue',
                  content: 'dark blue',
                  tooltipText: 'dark blue',
                  onClickFunction: event => {
                    let target = event.target || event.cyTarget
                    target.style('background-color', 'darkblue')
                  },
                },
              ],
            },
            {
              id: 'color-green',
              content: 'green',
              tooltipText: 'green',
              onClickFunction: event => {
                let target = event.target || event.cyTarget
                target.style('background-color', 'green')
              },
            },
            {
              id: 'color-red',
              content: 'red',
              tooltipText: 'red',
              onClickFunction: event => {
                let target = event.target || event.cyTarget
                target.style('background-color', 'red')
              },
            },
          ],
        },
        {
          id: 'add-node',
          content: 'add node',
          tooltipText: 'add node',
          image: { src: 'assets/add.svg', width: 12, height: 12, x: 6, y: 4 },
          coreAsWell: true,
          onClickFunction: event => {
            var data = {
              group: 'nodes',
            }

            var pos = event.position || event.cyPosition

            this.cy.add({
              data: data,
              position: {
                x: pos.x,
                y: pos.y,
              },
            })
          },
        },
        {
          id: 'select-all-nodes',
          content: 'select all nodes',
          selector: 'node',
          coreAsWell: true,
          show: true,
          onClickFunction: event => {
            // this.selectAllOfTheSameType('node');
            this.contextMenu.hideMenuItem('select-all-nodes')
            this.contextMenu.showMenuItem('unselect-all-nodes')
          },
        },
        {
          id: 'unselect-all-nodes',
          content: 'unselect all nodes',
          selector: 'node',
          coreAsWell: true,
          show: false,
          onClickFunction: event => {
            // this.unselectAllOfTheSameType('node');
            this.contextMenu.showMenuItem('select-all-nodes')
            this.contextMenu.hideMenuItem('unselect-all-nodes')
          },
        },
        {
          id: 'select-all-edges',
          content: 'select all edges',
          selector: 'edge',
          coreAsWell: true,
          show: true,
          onClickFunction: event => {
            // this.selectAllOfTheSameType('edge');
            this.contextMenu.hideMenuItem('select-all-edges')
            this.contextMenu.showMenuItem('unselect-all-edges')
          },
        },
        {
          id: 'unselect-all-edges',
          content: 'unselect all edges',
          selector: 'edge',
          coreAsWell: true,
          show: false,
          onClickFunction: event => {
            // this.unselectAllOfTheSameType('edge');
            this.contextMenu.showMenuItem('select-all-edges')
            this.contextMenu.hideMenuItem('unselect-all-edges')
          },
        },
      ],
    })
  }

  bindActions() {
    // 边框点击
    this.cy.on('tap', 'edge', source => {})
    // 节点点击
    this.cy.on('tap', 'node', source => {})
    // 边框右键
    this.cy.on('cxttap', 'edge', source => {
      if (!this.isTraceMode) {
        //   removeEdge(source)
      }
    })
    // 节点右键
    this.cy.on('cxttap', 'node', source => {
      if (!this.isTraceMode) {
        //   removeNode(source)
      }
    })
    // 平移动
    this.cy.on('pan', event => {
      if (!this.isTraceMode) {
        this.currentPanPosition = this.cy.pan()
      }
    })
    // 缩放
    this.cy.on('zoom', event => {
      if (!this.isTraceMode) {
        this.currentZoomLevel = this.cy.zoom()
      }
    })
    // 鼠标hover，显示tooltip
    this.cy.on('mouseover', 'node', event => {
      let node = event.target
      if (node.data(this.NAME_PROP)) {
        this.currentNodeTooltip = this.makeTippy(node, node.data(this.NAME_PROP))
        this.currentNodeTooltip.show()
      } else {
        this.currentNodeTooltip = undefined
      }
    })
    // 鼠标移出，隐藏tooltip
    this.cy.on('mouseout', 'node', event => {
      if (this.currentNodeTooltip) this.currentNodeTooltip.hide()
    })
  }

  destroy() {
    this.cy.destroy()
  }

  layout(layoutType) {
    let layouter = this.layouters[layoutType]
    if (layouter) {
      layouter(true)
    }
  }

  loadData(payload: { data: string; layoutType: number; retain: boolean }) {
    this.currentLayout = payload.layoutType
    let zoom = this.currentZoomLevel
    let pan = this.currentPanPosition

    this.isTraceMode = false
    this.destroy()
    this.init()
    this.cy.add(JSON.parse(payload.data))
    this.layout(payload.layoutType)

    if (payload.retain) {
      this.cy.zoom(zoom)
      this.cy.pan(pan)
      this.currentZoomLevel = zoom
      this.currentPanPosition = pan
    } else {
      this.fit(payload.layoutType)
    }

    this.cy.edgeBendEditing({
      bendShapeSizeFactor: 6,
      enabled: true,
      initBendPointsAutomatically: false,
      undoable: true,
    })
  }

  fit(layoutType?) {
    this.cy.fit()
    if (this.cy.zoom() > this.MAX_AUTOFIT_ZOOM) {
      this.cy.zoom(this.MAX_AUTOFIT_ZOOM)
      this.cy.center()
    }
    //moveTop(layoutType);
  }

  loadTrace(json) {
    this.isTraceMode = true
    this.destroy()
    this.init()
    this.cy.add(JSON.parse(json))
    this.layout(CytoscapeGenerator.LAYOUT_MANUAL_BEZIER)
    this.fit(1)
  }

  zoomIn() {
    this.cy.zoom(this.cy.zoom() + 0.1)
    this.cy.center()
  }

  zoomOut() {
    this.cy.zoom(this.cy.zoom() - 0.1)
    this.cy.center()
  }

  center(layoutType) {
    this.cy.center()
    //moveTop(layoutType);
  }

  resize() {
    this.cy.resize()
    this.fit()
  }

  moveTop(layoutType) {
    let currentPos = this.cy.pan()
    let box = this.cy.elements().boundingBox({ includeNodes: true, includeEdges: true })

    switch (layoutType) {
      case 0:
      case 1:
        if (this.cy.zoom() > 1.0) {
          this.cy.pan({ x: currentPos.x, y: -box.y1 + 10 })
        } else {
          this.cy.pan({ x: currentPos.x, y: -box.y1 * this.cy.zoom() + 10 })
        }
        break
      case 2:
        this.cy.center(
          this.cy.nodes().filter(ele => {
            return ele.data(this.NAME_PROP) === '|>'
          }),
        )
        this.cy.pan({ x: currentPos.x, y: 0 })
        break
      case 3:
        this.cy.fit()
        break
      default:
      // code block
    }
  }

  private SIGN_HEIGHT = 100
  private MARGIN = 100

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', err => reject(err))
      img.src = src
    })
  }

  rasterizeForPrint() {
    return Promise.all([
      this.loadImage(
        'data:image/png;base64,' +
          this.cy.png({
            full: true,
            output: 'base64',
            scale: 1.0,
            quality: 1.0,
          }),
      ),
    ]).then(function ([graph]) {
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let signHeight = this.SIGN_HEIGHT
      canvas.width = graph['width'] + 2 * this.MARGIN
      canvas.height = graph['height'] + signHeight + 2 * this.MARGIN
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width, canvas.height)
      //@ts-ignore
      context.drawImage(graph, MARGIN, signHeight + MARGIN)
      return canvas
    })
  }

  exportPDF(filename) {
    this.rasterizeForPrint().then(function (canvas) {
      let pdf = new jsPDF('l', 'px', [canvas.width, canvas.height], false)
      this.loadImage(canvas.toDataURL()).then(function (raster) {
        //@ts-ignore
        pdf.addImage(raster, 'PNG', 0, 0, canvas.width, canvas.height, NaN, 'FAST')
        pdf.save(filename + '.pdf', { returnPromise: true })
      })
    })
  }

  exportPNG(filename) {
    this.rasterizeForPrint().then(function (canvas) {
      let a = document.createElement('a')
      canvas.toBlob(function (blob) {
        a.href = URL.createObjectURL(blob)
        a.download = filename + '.png'
        a.click()
      })
    })
  }

  makeTippy(node, text) {
    return tippy(node.popperRef(), {
      content: function () {
        let div = document.createElement('div')
        div.innerHTML = text
        return div
      },
      trigger: 'manual',
      arrow: true,
      placement: 'bottom',
      hideOnClick: true,
      multiple: false,
      sticky: true,
      appendTo: document.body,
    })
  }
}

// function pos(source, b) {
//   let c = 0,
//     e = 0,
//     d
//   for (d in source.incomers().sources().outgoers().targets()) (c += d.position()[0]), (e += 1)
//   return 0 == e ? 0 : c / e
// }
