// @flow
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
  +removeFolder: (id: string, folderId: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +targetId: string,
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
      removeFolder,
      targetId,
      folders
    } = this.props;

    return (
      <div className={styles.sublistNav}>
        <Droppable droppableId={targetId} type={targetId}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {folders.map((folder, index) => (
                <Draggable
                  key={folder.id}
                  draggableId={folder.id}
                  index={index}
                >
                  {(providedDrag, snapshotDrag) => (
                    <div
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
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
