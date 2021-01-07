/** @format */

import React, { Component } from 'react';
import Modeler from 'bpmn-js/lib/Modeler';

import { pizzaBpmn } from './pizza.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

export default class BpmnEventComponent extends Component {
  modeler = null;

  componentDidMount() {
    setTimeout(() => {
      this.modeler = new Modeler({
        container: '#bpmnview-event',
        keyboard: {
          bindTo: window,
        },
        propertiesPanel: {
          parent: '#propview-event',
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      });
      this.openBpmnDiagram(pizzaBpmn);
    }, 1000);
  }

  openBpmnDiagram = (xml) => {
    this.modeler.importXML(xml, (error) => {
      if (error) {
        console.log('fail import xml');
        return;
      }
      const canvas = this.modeler.get('canvas');
      canvas.zoom('fit-viewport');
      this.setEvents();
    });
  };
  setEvents() {
    // 数据改变事件
    this.addBpmnListener();
    // 元素变化事件
    this.addModelerListener();
    // 元素交互事件
    this.addEventBusListener();
  }

  addEventBusListener() {
    // 监听 element
    const eventBus = this.modeler.get('eventBus');
    const modeling = this.modeler.get('modeling');
    const elementRegistry = this.modeler.get('elementRegistry');
    const eventTypes = ['element.click', 'element.changed'];
    eventTypes.forEach((eventType) => {
      eventBus.on(eventType, (e) => {
        console.log(e);
        if (!e || e.element.type === 'bpmn:Process') return;
        if (eventType === 'element.changed') {
          this.elementChanged(e);
        } else if (eventType === 'element.click') {
          console.log('点击了element');
          const shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
          if (shape.type === 'bpmn:StartEvent') {
            modeling.updateProperties(shape, {
              name: '我是修改后的虚线节点',
              isInterrupting: false,
              customText: '我是自定义的text属性',
            });
          }
        }
      });
    });
  }

  getShape(id) {
    const elementRegistry = this.modeler.get('elementRegistry');
    return elementRegistry.get(id);
  }

  elementChanged(e) {
    const shape = this.getShape(e.element.id);
    console.log(shape);
    if (!shape) {
      // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
      console.log('无效的shape');
      // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
      console.log('删除了shape和connect');
      return;
    }
    if (!this.isInvalid(shape.type)) {
      if (this.isSequenceFlow(shape.type)) {
        console.log('改变了线');
      }
    }
  }

  isInvalid(param) {
    // 判断是否是无效的值
    return param === null || param === undefined || param === '';
  }
  isSequenceFlow(type) {
    // 判断是否是线
    return type === 'bpmn:SequenceFlow';
  }

  addBpmnListener() {
    this.modeler.on('commandStack.changed', () => {
      // this.modeler.saveXML({ format: true }, function(err, xml) {
      // })
      this.modeler.saveXML({ format: true }, (err, xml) => {
        console.log(xml);
      });
    });
  }

  addModelerListener() {
    // 监听 modeler
    // 'shape.removed', 'connect.end', 'connect.move'
    const events = ['shape.added', 'shape.move.end', 'shape.removed'];
    events.forEach((event) => {
      this.modeler.on(event, (e) => {
        const elementRegistry = this.modeler.get('elementRegistry');
        const shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
        // console.log(shape)
        if (event === 'shape.added==========================') {
          console.log('新增了shape');
          console.log(shape);
        } else if (event === 'shape.move.end') {
          console.log('移动了shape===========================');
          console.log(shape);
        } else if (event === 'shape.removed==========================') {
          console.log('删除了shape');
          console.log(shape);
        }
      });
    });
  }

  // setEncoded(link, name, data) {
  //   // 把xml转换为URI，下载要用到的
  //   const encodedData = encodeURIComponent(data)
  //   // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
  //   //   console.log(link, name, data)
  //   let xmlFile = new File([data], 'test.bpmn')
  //   //   console.log(xmlFile)
  //   if (data) {
  //     link.className = 'active'
  //     link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
  //     link.download = name
  //   }
  // }

  render = () => {
    return (
      <div id="bpmncontainer">
        <div
          id="propview-event"
          style={{
            width: '15%',
            height: '98vh',
            float: 'right',
            maxHeight: '98vh',
            overflowX: 'auto',
          }}
        ></div>
        <div id="bpmnview-event" style={{ width: '85%', height: '98vh', float: 'left' }}></div>
      </div>
    );
  };
}
