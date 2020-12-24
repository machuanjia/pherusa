/** @format */

import { MODAL_SIZE } from '@constants/index'
import { Button, Modal } from 'laiye-antd'
import React, { Component } from 'react'
import ChordComponent from './components/chord.component'
import ClusterComponent from './components/cluster.component'
import PackComponent from './components/pack.component'
import PartitionComponent from './components/partition.component'
import TreeComponent from './components/tree.component'
import TreemapComponent from './components/treemap.component'

interface IGraphLayoutProps {}
interface IGraphLayoutState {
  isTreeVisible: boolean
  isClusterVisible: boolean
  isTreemapVisible: boolean
  isPackVisible: boolean
  isPartitionVisible: boolean
  isChordVisible: boolean
}

export default class GraphLayoutView extends Component<IGraphLayoutProps, IGraphLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      isTreeVisible: false,
      isClusterVisible: false,
      isTreemapVisible: false,
      isPackVisible: false,
      isPartitionVisible: false,
      isChordVisible: false,
    }
  }
  setOpen(key) {
    // @ts-ignore
    this.setState({
      [key]: true,
    })
  }
  handleCancel() {
    this.setState({
      isTreeVisible: false,
      isClusterVisible: false,
      isTreemapVisible: false,
      isPackVisible: false,
      isPartitionVisible: false,
      isChordVisible: false,
    })
  }
  render() {
    const { isTreeVisible, isClusterVisible, isTreemapVisible, isPackVisible, isPartitionVisible, isChordVisible } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.setOpen.bind(this, 'isTreeVisible')}>
          tree
        </Button>
        <Modal
          title="Tree"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isTreeVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <TreeComponent />
          </div>
        </Modal>

        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isClusterVisible')}>
          cluster
        </Button>
        <Modal
          title="Tree"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isClusterVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <ClusterComponent />
          </div>
        </Modal>

        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isTreemapVisible')}>
          treemap
        </Button>
        <Modal
          title="Treemap"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isTreemapVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <TreemapComponent />
          </div>
        </Modal>

        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isPackVisible')}>
          pack
        </Button>
        <Modal
          title="Pack"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isPackVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <PackComponent />
          </div>
        </Modal>

        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isPartitionVisible')}>
          partition
        </Button>
        <Modal
          title="Partitioin"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isPartitionVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <PartitionComponent />
          </div>
        </Modal>

        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isChordVisible')}>
          Chord
        </Button>
        <Modal
          title="Partitioin"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isChordVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <ChordComponent />
          </div>
        </Modal>
      </div>
    )
  }
}
