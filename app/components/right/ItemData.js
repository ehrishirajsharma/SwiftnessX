// @flow
import React from 'react';
import ContentEditable from '../tools/ContentEditableExpanded';
import styles from '../css/ItemData.css';
import CopyIcon from '../../assets/icons/CopyIcon';
import Editor from '../tools/Editor';

type Props = {
  +editTitle: (id: string, title: string) => void,
  +editContent: (id: string, content: string) => void,
  +item: {
    +id: string,
    +title: string,
    +content: string
  },
  +search: string
};

export default class ItemData extends React.PureComponent<Props> {
  props: Props;

  state = {
    disabled: true,
    value: ''
  };

  renameItem = event => {
    if (this.state.disabled) {
      const { target } = event;

      this.setState({ disabled: false, value: this.props.item.title });

      setTimeout(() => {
        target.focus();
        if (
          typeof window.getSelection !== 'undefined' &&
          typeof document.createRange !== 'undefined'
        ) {
          const range = document.createRange();
          range.selectNodeContents(target);
          range.collapse(false);

          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 0);
    }
  };

  onBlur = () => {
    if (this.props.item.title) {
      this.setState({ value: this.props.item.title });
    } else {
      this.props.editTitle(this.props.item.id, this.state.value);
    }

    this.setState({ disabled: true });
  };

  render() {
    const { editTitle, editContent, item, search } = this.props;

    return (
      <div className={styles.checklistData}>
        <div className={styles.checklistDataHeader}>
          <ContentEditable
            id={item.id}
            disabled={this.state.disabled}
            onClick={this.renameItem}
            onBlur={this.onBlur}
            onChange={e => editTitle(item.id, e.target.value)}
            tagName="span"
            html={item.title}
          />
          <CopyIcon content={item.content} sanitizeContent />
        </div>
        <Editor
          key={item.id}
          editContent={content => editContent(item.id, content)}
          item={item}
          search={search}
        />
      </div>
    );
  }
}
