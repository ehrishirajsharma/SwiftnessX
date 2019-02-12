// @flow
import { shell } from 'electron';
import React from 'react';
import './highlight';
import ReactQuill, { Quill } from 'react-quill';
import QuillTable from 'quill-table';
import ImageResize from 'quill-image-resize-module-react';
import onClickOutside from 'react-onclickoutside';
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
import AddRowIcon from '../../assets/quill/add_row.svg';
import AddColumnIcon from '../../assets/quill/add_column.svg';
import Video from './quill-video-resize';
import CustomToolbar from './CustomToolbar';

type Props = {
  +editContent: (content: string) => void,
  +item: {
    +id: string,
    +content: string
  },
  +search: string
};

class Editor extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.quill = null;
    this.reactQuill = null;

    const BackgroundStyle = Quill.import('attributors/class/background');
    const FontStyle = Quill.import('attributors/style/font');
    const SizeStyle = Quill.import('attributors/style/size');

    FontStyle.whitelist = [
      'sans-serif',
      'verdana',
      'open-sans',
      'inconsolata',
      'roboto',
      'mirza',
      'arial'
    ];

    SizeStyle.whitelist = ['10px', '13px', '18px', '32px'];

    Quill.register(QuillTable.TableCell);
    Quill.register(QuillTable.TableRow);
    Quill.register(QuillTable.Table);
    Quill.register(QuillTable.Contain);
    Quill.register('modules/table', QuillTable.TableModule);

    Quill.register('modules/imageResize', ImageResize);
    Quill.register({ 'formats/video': Video });

    Quill.register(BackgroundStyle, true);
    Quill.register(FontStyle, true);
    Quill.register(SizeStyle, true);

    const icons = Quill.import('ui/icons');

    icons.bold = `<img src=${BoldIcon}>`;
    icons.italic = `<img src=${ItalicIcon}>`;
    icons.underline = `<img src=${UnderlineIcon}>`;
    icons['code-block'] = `<img src=${CodeIcon}>`;
    icons.image = `<img src=${ImageIcon}>`;
    icons.video = `<img src=${VideoIcon}>`;
    icons.list.ordered = `<img src=${ListOrderedIcon}>`;
    icons.link = `<img src=${LinkIcon}>`;

    icons.table = {
      'append-row': `<img src=${AddRowIcon}>`,
      'append-col': `<img src=${AddColumnIcon}>`
    };
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
    this.quill.root.addEventListener('click', this.handleClick, false);
    this.quill.root.quill = this.quill;
  };

  applySearch = () => {
    const { search } = this.props;
    const text = this.quill.getText().toLowerCase();

    let index = 0;

    if (search.length > 0) {
      while (true) {
        index = text.indexOf(search, index);

        if (index !== -1) {
          this.quill.formatText(index, search.length, {
            background: 'find'
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
            item.className.includes('SimpleMenu__menu-item-nav-header')
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
  syntax: true,
  table: true,
  imageResize: {
    modules: ['Resize', 'DisplaySize']
  },
  clipboard: {
    matchVisual: false
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
  'check',
  'indent',
  'align',
  'size',
  'color',
  'font',
  'link',
  'image',
  'video',
  'width',
  'height',

  'table',
  'contain',
  'tr',
  'td'
];

export default onClickOutside(Editor);
