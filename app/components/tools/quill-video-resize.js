import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');
const ATTRIBUTES = ['height', 'width'];

const nubStyles = {
  tLeft: {
    top: '-5px',
    left: '-5px'
  },
  tRight: {
    top: '-5px',
    right: '-5px'
  },
  bLeft: {
    bottom: '-5px',
    left: '-5px'
  },
  bRight: {
    bottom: '-5px',
    right: '-5px'
  }
};

const getClosest = (el, sel) => {
  let el1 = el;

  do {
    el1 = el1.parentElement;
  } while (el1 && !(el1.matches || el1.matchesSelector).call(el1, sel));

  return el1;
};

const createSpacer = () => {
  const spacer = document.createElement('div');
  spacer.appendChild(document.createElement('br'));
  return spacer;
};

class VideoBuilder {
  buildIFrame = (src, node) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    iframe.className = 'td-quill-video-editing';
    iframe.setAttribute('width', node.getAttribute('width') || 300);
    iframe.setAttribute('height', node.getAttribute('height') || 150);
    iframe.setAttribute('src', src);
    return iframe;
  };

  buildNode = (node, wrapper) => {
    node.appendChild(wrapper);
    setTimeout(() => {
      node.setAttribute('contenteditable', 'false');

      if (node.parentElement) {
        node.parentElement.insertBefore(createSpacer(), node);
        node.parentElement.appendChild(createSpacer());
      }

      const iframe = node.getElementsByTagName('iframe')[0];
      iframe.setAttribute('width', node.getAttribute('width') || 300);
      iframe.setAttribute('height', node.getAttribute('height') || 150);
    }, 0);

    return node;
  };

  select(overlay, quill, node) {
    this.selectedElement = overlay;
    if (this.selectedElement.className.indexOf('active') === -1) {
      this.quill = quill;
      this.quill.setSelection(null);
      this.parentElement = this.selectedElement.parentElement;
      this.node = node;
      [this.iframe] = this.parentElement.getElementsByTagName('iframe');
      this.selectedElement.setAttribute(
        'class',
        'td-quill-video-wrapper active'
      );
      const toolBar = this.buildToolBar();
      this.selectedElement.insertBefore(
        toolBar,
        this.selectedElement.childNodes[0]
      );
      this.buildResize();
      this.handelDeselect = this.deselect.bind(this);
      this.quill.root.addEventListener('click', this.handelDeselect, false);
    }
  }

  deselect(event) {
    if (event.target !== this.selectedElement) {
      this.selectedElement.setAttribute('class', 'td-quill-video-wrapper');
      this.clearNubEvents(true);
      while (this.selectedElement.childNodes.length > 1) {
        this.selectedElement.removeChild(this.selectedElement.firstChild);
      }
      this.selectedElement = null;
      this.quill.root.removeEventListener('click', this.handelDeselect, false);
    }
  }

  buildToolBar() {
    const toolbarWrapper = document.createElement('div');
    toolbarWrapper.className = 'td-quill-video-toolbar-wrapper';
    let toolbar = document.createElement('div');
    toolbar.className = 'td-quill-video-toolbar';
    toolbar = this.addToolBarActions(toolbar);
    toolbarWrapper.appendChild(toolbar);
    return toolbarWrapper;
  }

  addToolBarActions(toolbar) {
    toolbar.appendChild(this.buildAction('left'));
    toolbar.appendChild(this.buildAction('center'));
    toolbar.appendChild(this.buildAction('right'));
    return toolbar;
  }

  buildAction(type) {
    const button = document.createElement('span');
    button.className = `td-quill-video-align-action td-quill-video-${type}`;
    button.innerHTML = `<i class="fa fa-align-${type} td-align-${type}" aria-hidden="true"></i>`;
    button.addEventListener('click', () => {
      this.quill.setSelection(this.node.offset(this.quill.scroll), 1, 'user');
      if (type === 'left') {
        return this.quill.format('align', null);
      }
      this.quill.format('align', type);
      this.quill.setSelection(null);
    });

    return button;
  }

  buildResize() {
    this.boxes = [];
    this.dragHandeler = this.handleDrag.bind(this);
    this.mouseUp = this.handelMouseUp.bind(this);
    this.mouseDown = this.handleMousedown.bind(this);

    Object.keys(nubStyles).forEach(key => {
      const nub = this.buildNub(key);
      this.boxes.push(nub);
      this.selectedElement.insertBefore(
        nub,
        this.selectedElement.childNodes[0]
      );
    });

    return this.selectedElement;
  }

  buildNub(pos) {
    const nub = document.createElement('span');
    nub.className = 'td-quill-resize-nub';
    Object.assign(nub.style, nubStyles[pos]);
    nub.addEventListener('mousedown', this.mouseDown, false);
    return nub;
  }

  handleMousedown(event) {
    this.dragBox = event.target;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.preDragWidth = parseInt(this.iframe.width, 10) || 300;
    this.preDragHeight = parseInt(this.iframe.height, 10) || 150;
    document.addEventListener('mousemove', this.dragHandeler, false);
    document.addEventListener('mouseup', this.mouseUp, false);
  }

  handleDrag(event) {
    if (!this.iframe) {
      return;
    }
    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[2]) {
      this.iframe.width = Math.round(this.preDragWidth - deltaX);
      this.iframe.height = Math.round(this.preDragHeight + deltaY);
    } else {
      this.iframe.width = Math.round(this.preDragWidth + deltaX);
      this.iframe.height = Math.round(this.preDragHeight + deltaY);
    }
  }

  handelMouseUp() {
    this.clearNubEvents();
  }

  clearNubEvents(includeNub) {
    Object.keys(this.boxes).forEach(nub => {
      document.removeEventListener('mousemove', this.dragHandeler, false);
      document.removeEventListener('mouseup', this.mouseUp, false);
      if (includeNub) {
        this.boxes[nub].removeEventListener(
          'mousedown',
          this.handleMousedown,
          false
        );
      }
    });
  }
}

class Video extends BlockEmbed {
  static create(src) {
    const node = super.create();
    node.builder = new VideoBuilder();
    const wrapper = document.createElement('div');
    wrapper.className = 'td-quill-video-wrapper';

    wrapper.setAttribute('contenteditable', 'false');
    wrapper.addEventListener('mouseover', () => {
      const rootElement = getClosest(wrapper, '.ql-editor');
      if (rootElement && rootElement.quill) {
        const node1 = Parchment.find(wrapper.parentElement);
        if (node1 instanceof Video) {
          node1.domNode.builder.select(wrapper, rootElement.quill, node);
        }
      }
    });

    const iframe = node.builder.buildIFrame(src, node);
    wrapper.appendChild(iframe);
    return node.builder.buildNode(node, wrapper);
  }

  static formats(domNode) {
    const iframe = domNode.getElementsByTagName('iframe')[0];
    return ATTRIBUTES.reduce((formats, attribute) => {
      const formats1 = formats;

      if (iframe.hasAttribute(attribute)) {
        formats1[attribute] = iframe.getAttribute(attribute);
      }
      return formats1;
    }, {});
  }

  static value(domNode) {
    return domNode.getElementsByTagName('iframe')[0].getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Video.blotName = 'video';
Video.className = 'td-video';
Video.tagName = 'div';

Quill.register(Video, true);

export default Video;
