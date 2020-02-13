// @flow
import { remote } from 'electron';
import React from 'react';
import className from 'classnames';
import styles from '../css/CategoryListItem.css';
import ContentEditable from '../tools/ContentEditableExpanded';

type Props = {
  +onClick: () => void,
  +addItem: () => void,
  +saveItem: () => void,
  +renameItem: (title: string) => void,
  +removeItem: () => void,
  +doNotShowDeleteConfirmation: () => void,
  +active: boolean,
  +id: string,
  +title: string,
  isNew?: boolean,
  +showDeleteConfirmation: boolean,
  +index: number
};

export default class CategoryListItem extends React.Component<Props> {
  props: Props;

  state = {
    disabled: true,
    value: ''
  };

  componentDidMount = () => {
    const { id, isNew } = this.props;

    if (isNew) {
      const target = document.getElementById(id);

      this.renameItem(target);
      this.props.saveItem(id);
    }
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    this.props.id !== nextProps.id ||
    this.props.active !== nextProps.active ||
    this.props.title !== nextProps.title ||
    this.state !== nextState;

  handleRightClick = target => {
    const contextMenuHandler = () => {
      remote.Menu.buildFromTemplate([
        {
          label: 'New Folder',
          click: this.props.addItem
        },
        {
          label: 'Rename',
          click: () => this.renameItem(target)
        },
        {
          label: 'Delete',
          click: () => {
            const { dialog } = remote;

            if (this.props.showDeleteConfirmation) {
              dialog.showMessageBox(
                {
                  type: 'warning',
                  title: 'Delete record',
                  message: 'Are you sure you want to delete this record?',
                  checkboxLabel: 'Do not show this message again',
                  buttons: ['Yes', 'No']
                },
                (response, checkbox) => {
                  if (response === 0) {
                    this.props.removeItem();
                  }
                  if (checkbox) {
                    this.props.doNotShowDeleteConfirmation();
                  }
                }
              );
            } else {
              this.props.removeItem();
            }
          }
        }
      ]).popup({
        window: remote.getCurrentWindow(),
        callback: () => {
          unmountMenu();
        }
      });
    };

    const unmountMenu = () => {
      remote
        .getCurrentWebContents()
        .removeListener('context-menu', contextMenuHandler);
    };

    remote.getCurrentWebContents().on('context-menu', contextMenuHandler);
  };

  onBlur = () => {
    if (this.props.title) {
      this.setState({ value: this.props.title });
    } else {
      this.props.renameItem(this.state.value);
    }

    this.setState({ disabled: true });
  };

  renameItem = target => {
    this.setState({ disabled: false, value: this.props.title });

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
  };

  render() {
    const {
      onClick,
      renameItem,
      id,
      title,
      isNew,
      doNotShowDeleteConfirmation,
      showDeleteConfirmation,
      removeItem,
      saveItem,
      addItem,
      active,
      ...other
    } = this.props;

    return (
      <ContentEditable
        {...other}
        className={className(styles.title, {
          [`${styles.active}`]: this.props.active
        })}
        id={id}
        disabled={this.state.disabled}
        tagName="span"
        html={title}
        onChange={e => renameItem(e.target.value)}
        onClick={onClick}
        onContextMenu={e => this.handleRightClick(e.target)}
        onBlur={this.onBlur}
      />
    );
  }
}

CategoryListItem.defaultProps = {
  isNew: false
};
