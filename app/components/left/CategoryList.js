// @flow
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import ColorPicker from '../ColorPicker';
import styles from '../css/CategoryList.css';
import CategoryListItem from './CategoryListItem';

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
  +onClick: (id: string) => void,
  +addFolder: (id: string) => void,
  +saveFolder: (id: string, folderId: string) => void,
  +editFolderTitle: (id: string, folderId: string, title: string) => void,
  editFolderColor?: (
    id: string,
    folderId: string,
    color: string
  ) => void | undefined,
  +removeFolder: (id: string, folderId: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +targetId: string,
  +color: string | undefined,
  +activeFolderId: string | undefined,
  +folders: {
    +id: string,
    +title: string,
    +isNew?: boolean
  }[],
  +showDeleteConfirmation: boolean
};

export default class CategoryList extends React.Component<Props> {
  props: Props;

  shouldComponentUpdate = nextProps =>
    this.props.targetId !== nextProps.targetId ||
    this.props.activeFolderId !== nextProps.activeFolderId ||
    this.props.folders !== nextProps.folders;

  render() {
    const {
      addFolder,
      saveFolder,
      editFolderTitle,
      editFolderColor,
      removeFolder,
      targetId,
      color,
      folders
    } = this.props;

    return (
      <div className={classnames(styles.sublistNav, styles[color])}>
        <Droppable droppableId={targetId} type={targetId}>
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {folders.map((folder, index) => (
                <Draggable
                  key={folder.id}
                  draggableId={folder.id}
                  index={index}
                >
                  {(providedDrag, snapshotDrag) => (
                    <li
                      className={styles.sublistItem}
                      key={folder.id}
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      style={getItemStyle(
                        false,
                        snapshotDrag.isDragging,
                        providedDrag.draggableProps.style
                      )}
                    >
                      <CategoryListItem
                        {...providedDrag.dragHandleProps}
                        id={`${targetId}-${folder.id}`}
                        title={folder.title}
                        isNew={folder.isNew}
                        index={index}
                        active={this.props.activeFolderId === folder.id}
                        onClick={() => this.props.onClick(folder.id)}
                        addItem={() => addFolder(targetId)}
                        saveItem={() => saveFolder(targetId, folder.id)}
                        renameItem={title =>
                          editFolderTitle(targetId, folder.id, title)
                        }
                        removeItem={() => removeFolder(targetId, folder.id)}
                        doNotShowDeleteConfirmation={
                          this.props.doNotShowDeleteConfirmation
                        }
                        showDeleteConfirmation={
                          this.props.showDeleteConfirmation
                        }
                      />
                      {editFolderColor && (
                        <ColorPicker
                          editColor={selectedColor =>
                            editFolderColor(targetId, folder.id, selectedColor)
                          }
                          color={folder.color}
                        />
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </div>
    );
  }
}

CategoryList.defaultProps = {
  editFolderColor: undefined
};
