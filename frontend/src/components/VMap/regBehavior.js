import G6 from '@antv/g6'
// import G6 from '../../../node_modules/@antv/g6/src'

G6.registerBehavior('select', {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'node:click': 'onItemClick',
      'edge:click': 'onItemClick',
      'canvas:click': 'onCanvasClick'
    };
  },
  onItemClick(event) {
    const self = this;
    const item = event.item;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    if (!self.multiple) {
      this.removeSelectedState();
    }
    if (item.hasState('selected')) {
      if (self.shouldUpdate(self, event)) {
        item.setState('selected', false);
      }
      graph.emit('nodeselectchange', { target: item, select: false });
    } else {
      if (self.shouldUpdate(self, event)) {
        item.setState('selected', true);
      }
      graph.emit('nodeselectchange', { target: item, select: true });
    }
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onCanvasClick() {
    this.removeSelectedState();
  },
  removeSelectedState() {
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    graph.findAllByState('node', 'selected').forEach(node => {
      graph.setItemState(node, 'selected', false);
    });
    graph.findAllByState('edge', 'selected').forEach(edge => {
      graph.setItemState(edge, 'selected', false);
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  }
});
