/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'

export default class ProdCytoscapeComponent extends Component {
  private cy

  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      layout: {
        name: 'cose',
        padding: 10,
        randomize: true,
      },
      zoom: 1,
      pan: { x: 0, y: 0 },
      minZoom: 1e-50,
      maxZoom: 1e50,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      wheelSensitivity: 0.01,

      style: cytoscape
        .stylesheet()
        .selector('node')
        .css({
          shape: 'roundrectangle',
          width: 'label',
          height: 'label',
          'background-color': '#79adf8',
          content: 'data(name)',
          'text-wrap': 'wrap',
          'text-valign': 'center',
          'text-max-width': '50px',
          'font-size': 7,
          'text-border-width': 10,
          padding: 5,
        })
        .selector(':selected')
        .css({
          'border-width': 3,
          'border-color': '#333',
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          opacity: 1,
          width: 'mapData(strength, 0, 100, 1, 10)',
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': '',
          color: 'black',
          'line-color': 'gray',
          'source-arrow-color': 'gray',
          'target-arrow-color': 'gray',
          label: 'data(label)',
        })
        .selector('edge.questionable')
        .css({
          'line-style': 'dotted',
          'target-arrow-shape': 'diamond',
        })
        .selector('.faded')
        .css({
          opacity: 0.25,
          'text-opacity': 0,
        }),
      elements: {
        nodes: [],
        edges: [],
      },
    })
    this.loadData()
  }

  loadData() {
    const str =
      '[{"data":{"shape":"roundrectangle","color":"#8caebd","textsize":"16px","borderwidth":"1px","oriname":"Release A","name":"Release A\\n\\n671","textcolor":"black","width":"160px","id":0,"textwidth":"155px","height":"70px"},"position":{"x":2546,"y":136}},' +
      '{"data":{"shape":"ellipse","color":"#C1C9B0","textsize":"16px","borderwidth":"1px","oriname":"|>","name":"S","textcolor":"black","width":"25px","id":1,"textwidth":"155px","height":"25px"},"position":{"x":13.5,"y":402}},' +
      '{"data":{"shape":"roundrectangle","color":"#bdd5de","textsize":"16px","borderwidth":"1px","oriname":"Return ER","name":"Return ER\\n\\n294","textcolor":"black","width":"160px","id":2,"textwidth":"155px","height":"70px"},"position":{"x":2806,"y":248}},' +
      '{"data":{"shape":"roundrectangle","color":"#789faf","textsize":"16px","borderwidth":"1px","oriname":"IV Antibiotics","name":"IV Antibiotics\\n\\n823","textcolor":"white","width":"160px","id":3,"textwidth":"155px","height":"70px"},"position":{"x":1246,"y":402}},' +
      '{"data":{"shape":"roundrectangle","color":"#608c9e","textsize":"16px","borderwidth":"1px","oriname":"Leucocytes","name":"Leucocytes\\n\\n1012","textcolor":"white","width":"160px","id":4,"textwidth":"155px","height":"70px"},"position":{"x":2026,"y":390}},' +
      '{"data":{"shape":"roundrectangle","color":"#e0f0f6","textsize":"16px","borderwidth":"1px","oriname":"Release C","name":"Release C\\n\\n25","textcolor":"black","width":"160px","id":5,"textwidth":"155px","height":"70px"},"position":{"x":2546,"y":376}},' +
      '{"data":{"shape":"ellipse","color":"#C0A3A1","textsize":"16px","borderwidth":"3px","oriname":"[]","name":"E","textcolor":"black","width":"25px","id":6,"textwidth":"155px","height":"25px"},"position":{"x":2998.5,"y":384}},' +
      '{"data":{"shape":"roundrectangle","color":"#7ba1b1","textsize":"16px","borderwidth":"1px","oriname":"Admission NC","name":"Admission NC\\n\\n800","textcolor":"white","width":"160px","id":7,"textwidth":"155px","height":"70px"},"position":{"x":1506,"y":468}},' +
      '{"data":{"shape":"roundrectangle","color":"#749bac","textsize":"16px","borderwidth":"1px","oriname":"LacticAcid","name":"LacticAcid\\n\\n860","textcolor":"white","width":"160px","id":8,"textwidth":"155px","height":"70px"},"position":{"x":1766,"y":356}},' +
      '{"data":{"shape":"roundrectangle","color":"#d5e7ef","textsize":"16px","borderwidth":"1px","oriname":"Admission IC","name":"Admission IC\\n\\n110","textcolor":"black","width":"160px","id":9,"textwidth":"155px","height":"70px"},"position":{"x":1506,"y":348}},' +
      '{"data":{"shape":"roundrectangle","color":"#dcedf4","textsize":"16px","borderwidth":"1px","oriname":"Release B","name":"Release B\\n\\n56","textcolor":"black","width":"160px","id":10,"textwidth":"155px","height":"70px"},"position":{"x":2546,"y":256}},' +
      '{"data":{"shape":"roundrectangle","color":"#e0f0f6","textsize":"16px","borderwidth":"1px","oriname":"Release D","name":"Release D\\n\\n24","textcolor":"black","width":"160px","id":11,"textwidth":"155px","height":"70px"},"position":{"x":2546,"y":496}},' +
      '{"data":{"shape":"roundrectangle","color":"#e2f2f8","textsize":"16px","borderwidth":"1px","oriname":"Release E","name":"Release E\\n\\n6","textcolor":"black","width":"160px","id":12,"textwidth":"155px","height":"70px"},"position":{"x":2546,"y":616}},' +
      '{"data":{"shape":"roundrectangle","color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Triage","name":"ER Triage\\n\\n1050","textcolor":"white","width":"160px","id":13,"textwidth":"155px","height":"70px"},"position":{"x":466,"y":402}},' +
      '{"data":{"shape":"roundrectangle","color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Registration","name":"ER Registration\\n\\n1050","textcolor":"white","width":"160px","id":14,"textwidth":"155px","height":"70px"},"position":{"x":206,"y":402}},' +
      '{"data":{"shape":"roundrectangle","color":"#81a6b5","textsize":"16px","borderwidth":"1px","oriname":"IV Liquid","name":"IV Liquid\\n\\n753","textcolor":"white","width":"160px","id":15,"textwidth":"155px","height":"70px"},"position":{"x":986,"y":402}},' +
      '{"data":{"shape":"roundrectangle","color":"#618c9f","textsize":"16px","borderwidth":"1px","oriname":"CRP","name":"CRP\\n\\n1007","textcolor":"white","width":"160px","id":16,"textwidth":"155px","height":"70px"},"position":{"x":2286,"y":378}},' +
      '{"data":{"shape":"roundrectangle","color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Sepsis Triage","name":"ER Sepsis Triage\\n\\n1049","textcolor":"white","width":"160px","id":17,"textwidth":"155px","height":"70px"},"position":{"x":726,"y":402}},' +
      '{"data":{"strength":50.201612903225815,"color":"#568294","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":15,"label":"501","point-weights":"0.5","target":3}},' +
      '{"data":{"strength":97.58064516129032,"color":"#476a78","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":14,"label":"971","point-weights":"0.5","target":13}},' +
      '{"data":{"strength":90.92741935483872,"color":"#496e7c","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":13,"label":"905","point-weights":"0.5","target":17}},' +
      '{"data":{"strength":0.20161290322580644,"color":"#646464","point-distances":"15.40","edge-style":"unbundled-bezier","style":"dashed","source":12,"label":"5","point-weights":"0.56","target":6}},' +
      '{"data":{"strength":4.334677419354839,"color":"#669aaf","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":3,"label":"46","point-weights":"0.5","target":9}},' +
      '{"data":{"strength":1.6129032258064515,"color":"#646464","point-distances":"3.40","edge-style":"unbundled-bezier","style":"dashed","source":5,"label":"19","point-weights":"0.57","target":6}},' +
      '{"data":{"strength":0.9072580645161291,"color":"#679cb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"12","point-weights":"0.5","target":11}},' +
      '{"data":{"strength":48.99193548387097,"color":"#578395","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":3,"label":"489","point-weights":"0.5","target":7}},' +
      '{"data":{"strength":100,"color":"#646464","point-distances":"0","edge-style":"unbundled-bezier","style":"dashed","source":1,"label":"995","point-weights":"0.5","target":14}},' +
      '{"data":{"strength":1.6129032258064515,"color":"#669bb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"19","point-weights":"0.5","target":10}},' +
      '{"data":{"strength":0,"color":"#679cb2","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"3","point-weights":"0.5","target":12}},' +
      '{"data":{"strength":3.7298387096774195,"color":"#669ab0","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":9,"label":"40","point-weights":"0.5","target":8}},' +
      '{"data":{"strength":1.1088709677419355,"color":"#646464","point-distances":"8.11","edge-style":"unbundled-bezier","style":"dashed","source":11,"label":"14","point-weights":"0.57","target":6}},' +
      '{"data":{"strength":32.15725806451613,"color":"#5c8c9f","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"322","point-weights":"0.5","target":0}},' +
      '{"data":{"strength":29.03225806451613,"color":"#646464","point-distances":"0","edge-style":"unbundled-bezier","style":"dashed","source":2,"label":"291","point-weights":"0.5","target":6}},' +
      '{"data":{"strength":36.59274193548387,"color":"#5b899c","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":8,"label":"366","point-weights":"0.5","target":4}},' +
      '{"data":{"strength":28.42741935483871,"color":"#5e8ea1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":17,"label":"285","point-weights":"0.5","target":15}},' +
      '{"data":{"strength":1.0080645161290323,"color":"#679bb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"13","point-weights":"0.5","target":5}},' +
      '{"data":{"strength":27.52016129032258,"color":"#5e8ea2","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":0,"label":"276","point-weights":"0.5","target":2}},' +
      '{"data":{"strength":76.10887096774194,"color":"#4e7585","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":4,"label":"758","point-weights":"0.5","target":16}},' +
      '{"data":{"strength":5.241935483870968,"color":"#646464","point-distances":"3.32","edge-style":"unbundled-bezier","style":"dashed","source":10,"label":"55","point-weights":"0.58","target":6}},' +
      '{"data":{"strength":36.693548387096776,"color":"#5b899c","point-distances":"11.87","edge-style":"unbundled-bezier","style":"solid","source":7,"label":"367","point-weights":"0.50","target":4}}]'
    this.cy.add(JSON.parse(str))
  }

  layout() {
    this.cy
      .elements()
      .layout({
        name: 'dagre',
        avoidOverlap: true,
        edgeSep: 5,
        nodeSep: 100,
        rankSep: 100,
        rankDir: 'LR',
        edgeWeight: function (edge) {
          return 100
        },
      })
      .run()
  }

  componentWillUnmount() {
    this.cy && this.cy.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
