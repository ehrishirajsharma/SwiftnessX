import { remote } from 'electron';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import onClickOutside from 'react-onclickoutside';
import className from 'classnames';
import styles from '../css/Item.css';
import ColorPicker from '../ColorPicker';
import ContentEditable from '../tools/ContentEditableExpanded';

const getItemStyle = (isSelected, isDragging, draggableStyle) => {
  if (isDragging) {
    return {
      background: '#E0E0E0',
      ...draggableStyle
    };
  }

  return draggableStyle;
};

type Props = {
  +saveItem: (id: string) => void,
  +openItem: (id: string) => void,
  +renameItem: (id: string, title: string) => void,
  editColor?: (id: string, color: string) => void,
  +removeItem: (id: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +item: {
    +id: string,
    +title: string,
    +color: string,
    +done?: boolean,
    +isNew?: boolean
  },
  index: number,
  checkboxState: (id: string) => void,
  checkbox: boolean,
  isSelected: boolean,
  showDeleteConfirmation: boolean
};

class Item extends React.PureComponent<Props> {
  state = {
    disabled: true
  };

  componentDidMount = () => {
    const { item } = this.props;

    if (item.isNew) {
      const target = document.getElementById(item.id);

      this.renameItem(target);
      this.props.saveItem(item.id);
    }
  };

  handleClickOutside = () => {
    this.setState({ disabled: true });
  };

  handleRightClick = id => {
    const contextMenuHandler = () => {
      remote.Menu.buildFromTemplate([
        {
          label: 'Rename',
          click: () => this.renameItem(document.getElementById(id))
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
                    this.props.removeItem(id);
                  }
                  if (checkbox) {
                    this.props.doNotShowDeleteConfirmation();
                  }
                }
              );
            } else {
              this.props.removeItem(id);
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

  renameItem = target => {
    this.setState({ disabled: false });

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
      item,
      index,
      checkboxState,
      checkbox,
      isSelected,
      editColor
    } = this.props;

    return (
      <div className={styles.draggableList}>
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(providedDrag, snapshotDrag) => (
            <li
              className={className(styles.list, {
                [`${styles.selected}`]: isSelected
              })}
              key={item.id}
              onClick={e => this.props.openItem(item.id, e)}
              onKeyPress={e => this.props.openItem(item.id, e)}
              onContextMenu={e => this.handleRightClick(item.id, e.target)}
              role="menuitem"
              tabIndex={0}
              ref={providedDrag.innerRef}
              {...providedDrag.draggableProps}
              {...providedDrag.dragHandleProps}
              style={getItemStyle(
                this.props.isSelected,
                snapshotDrag.isDragging,
                providedDrag.draggableProps.style
              )}
            >
              <div className={styles.checkboxText}>
                {checkbox && (
                  <div>
                    <input
                      onClick={checkboxState(item.id)}
                      type="checkbox"
                      defaultChecked={item.done}
                    />
                    <span className={styles.checkmark} />
                  </div>
                )}
                <ContentEditable
                  id={item.id}
                  disabled={this.state.disabled}
                  tagName="span"
                  html={item.title}
                  onChange={e => this.props.renameItem(item.id, e.target.value)}
                />
              </div>
              {this.props.editColor !== undefined && (
                <ColorPicker
                  editColor={selectedColor => editColor(item.id, selectedColor)}
                  color={item.color}
                  rootContainerSelector="#item-list-body"
                />
              )}
            </li>
          )}
        </Draggable>
      </div>
    );
  }
}

Item.defaultProps = {
  editColor: undefined
};

export default onClickOutside(Item);
