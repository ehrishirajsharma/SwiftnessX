// @flow
import { shell } from 'electron';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import className from 'classnames';
import onClickOutside from 'react-onclickoutside';
import $ from 'jquery';
import 'react-quill/dist/quill.snow.css';
import styles from '../css/Editor.css';
import BoldIcon from '../../assets/quill/bold.png';
import ItalicIcon from '../../assets/quill/italic.png';
import UnderlineIcon from '../../assets/quill/underline.png';
import CodeIcon from '../../assets/quill/code.png';
import ImageIcon from '../../assets/quill/image.png';
import VideoIcon from '../../assets/quill/video.png';
import ListOrderedIcon from '../../assets/quill/list_ordered.png';
import LinkIcon from '../../assets/quill/link.png';
import Video from './quill-video-resize';

type Props = {
  +editContent: (content: string) => void,
  +item: {
    +id: string,
    +content: string
  },
  +search: string
};

const CustomToolbar = () => (
  <div id="toolbar" className={styles.toolbar}>
    <select
      className={className('ql-font', styles.font)}
      defaultValue="open-sans"
    >
      <option value="open-sans">Open Sans</option>
      <option value="sans-serif">Sans Serif</option>
      <option value="verdana">Verdana</option>
      <option value="inconsolata">Inconsolata</option>
      <option value="roboto">Roboto</option>
      <option value="mirza">Mirza</option>
      <option value="arial">Arial</option>
    </select>
    <select className="ql-size" defaultValue="">
      <option value="10px">Small</option>
      <option value="">Normal</option>
      <option value="18px">Large</option>
      <option value="32px">Huge</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-code-block" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-list" value="ordered" />
    <button className="ql-link" />
  </div>
);

const GetCodeBlock = () => {
  const CodeBlock = Quill.import('formats/code-block');

  class InlineStyleCodeBlock extends CodeBlock {
    static create() {
      const node = super.create();
      $(node).attr(
        'style',
        'background-color: #23241f; color: #f8f8f2;' +
          ' margin: 5px 0px; padding: 5px 10px;' +
          ' border-radius: 3px; overflow: visible; white-space: pre-wrap;' +
          ' counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7;'
      );

      return node;
    }
  }

  InlineStyleCodeBlock.blotName = 'code-block';
  InlineStyleCodeBlock.tagName = 'pre';

  return InlineStyleCodeBlock;
};

class Editor extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.quill = null;
    this.reactQuill = null;

    const FontStyle = Quill.import('attributors/style/font');
    const SizeStyle = Quill.import('attributors/style/size');
    const CodeBlock = GetCodeBlock();

    FontStyle.whitelist = [
      'sans-serif',
      'verdana',
      'open-sans',
      'inconsolata',
      'roboto',
      'mirza',
      'arial'
    ];

    Quill.register('modules/ImageResize', ImageResize);
    Quill.register({ 'formats/video': Video });

    Quill.register(FontStyle, true);
    Quill.register(SizeStyle, true);
    Quill.register(CodeBlock, true);

    const icons = Quill.import('ui/icons');

    icons.bold = `<img src=${BoldIcon}>`;
    icons.italic = `<img src=${ItalicIcon}>`;
    icons.underline = `<img src=${UnderlineIcon}>`;
    icons['code-block'] = `<img src=${CodeIcon}>`;
    icons.image = `<img src=${ImageIcon}>`;
    icons.video = `<img src=${VideoIcon}>`;
    icons.list.ordered = `<img src=${ListOrderedIcon}>`;
    icons.link = `<img src=${LinkIcon}>`;
  }

  state = {
    id: '',
    content: '',
    prevSearch: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.item.id !== prevState.id ||
      nextProps.search !== prevState.prevSearch
    ) {
      return {
        id: nextProps.item.id,
        content: nextProps.item.content,
        prevSearch: nextProps.search
      };
    }

    return null;
  }

  componentDidMount() {
    this.attachQuillRefs();
    this.applySearch();
  }

  componentDidUpdate() {
    this.applySearch();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuill.getEditor !== 'function') return;

    this.quill = this.reactQuill.getEditor();
    this.quill = this.reactQuill.getEditor();
    this.quill.root.addEventListener('click', this.handleClick, false);
    this.quill.root.quill = this.quill;
  };

  applySearch = () => {
    const { search } = this.props;
    const text = this.quill.getText();

    let index = 0;

    if (search.length > 0) {
      while (true) {
        index = text.indexOf(search, index);

        if (index !== -1) {
          this.quill.formatText(index, search.length, {
            background: '#ff0000'
          });
          index += 1;
        } else {
          break;
        }
      }
    }
  };

  handleClickOutside = e => {
    if (this.props.item.content !== this.state.content) {
      this.props.editContent(this.state.content);

      // HACK!!! Somehow event does not propagate to Templates/Payloads menu click.
      if (e.path) {
        const element = e.path.find(
          item =>
            item.className &&
            item.className.includes('SimpleMenuItem__menu-item-nav-header')
        );

        if (element) {
          element.click();
        }
      }
    }
  };

  handleContentEdit = (value, delta, source) => {
    if (source === 'user') {
      this.setState({ content: value });
    }
  };

  handleLinkClick = event => {
    if (
      event.target.tagName === 'A' &&
      event.target.classList.contains('ql-preview')
    ) {
      if (event.target.href.startsWith('http')) {
        shell.openExternal(event.target.href);
      }
      event.preventDefault();
    }
  };

  render() {
    return (
      <div
        className={styles.checklistDataBody}
        onClick={this.handleLinkClick}
        onKeyPress={this.handleLinkClick}
        role="textbox"
        tabIndex={0}
      >
        <CustomToolbar />
        <ReactQuill
          ref={el => {
            this.reactQuill = el;
          }}
          className={styles.editor}
          id="editor"
          theme="snow"
          bounds="#editor"
          value={this.state.content}
          placeholder="Type something..."
          scrollingContainer="#editor"
          onChange={this.handleContentEdit}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: '#toolbar',
  imageResize: {
    displaySize: true
  },
  clipboard: {
    matchVisual: true
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

Editor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'background',
  'code-block',
  'list',
  'bullet',
  'indent',
  'align',
  'size',
  'color',
  'font',
  'link',
  'image',
  'video',
  'width',
  'height'
];

export default onClickOutside(Editor);
