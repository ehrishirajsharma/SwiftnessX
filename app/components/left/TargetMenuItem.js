// @flow
import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Draggable } from 'react-beautiful-dnd';
import className from 'classnames';
import styles from '../css/TargetMenuItem.css';
import { targetType } from '../../reducers/targets';
import CategoryList from './CategoryList';
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
  +saveParent: (id: string) => void,
  +saveFolder: (id: string, folderId: string) => void,
  onCategoryClick: (folderId: string) => void,
  removeParent: (id: string) => void,
  addFolder: (id: string) => void,
  removeFolder: (id: string, folderId: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +editTitle: (id: string, title: string) => void,
  +editFolderTitle: (id: string, folderId: string, title: string) => void,
  +editFolderColor: (id: string, folderId: string, color: string) => void,
  +setActiveList: () => void,
  +expanded: boolean,
  +item: targetType,
  +menu: {
    id: string | undefined,
    folderId: string | undefined
  },
  +showDeleteConfirmation: boolean,
  +index: number
};

export default class TargetMenuItem extends React.Component<Props> {
  props: Props;

  shouldComponentUpdate = nextProps =>
    this.props.expanded !== nextProps.expanded ||
    this.props.item !== nextProps.item ||
    this.props.menu !== nextProps.menu;

  handleListItemClick = () => {
    const { onCategoryClick, setActiveList, item, expanded } = this.props;

    if (!expanded && item.folders[0]) {
      onCategoryClick(item.folders[0].id);
    }

    setActiveList();
  };

  render() {
    const {
      onCategoryClick,
      addFolder,
      saveParent,
      saveFolder,
      removeFolder,
      editTitle,
      editFolderTitle,
      editFolderColor,
      item,
      removeParent,
      index
    } = this.props;

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(providedDrag, snapshotDrag) => (
          <li
            className={className(styles.listItem, styles[item.color], {
              [`${styles.expanded}`]:
                this.props.expanded || this.props.menu.id === item.id
            })}
            key={item.id}
            role="menuitem"
            tabIndex={0}
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
              id={item.id}
              title={item.title}
              isNew={item.isNew}
              active={this.props.menu.id === item.id}
              index={this.props.index}
              onClick={this.handleListItemClick}
              addItem={() => addFolder(item.id)}
              saveItem={() => saveParent(item.id)}
              renameItem={title => editTitle(item.id, title)}
              removeItem={() => removeParent(item.id)}
              doNotShowDeleteConfirmation={
                this.props.doNotShowDeleteConfirmation
              }
              showDeleteConfirmation={this.props.showDeleteConfirmation}
            />
            <SmoothCollapse
              expanded={this.props.expanded}
              allowOverflowWhenOpen
            >
              <CategoryList
                activeFolderId={this.props.menu.folderId}
                onClick={onCategoryClick}
                addFolder={addFolder}
                saveFolder={saveFolder}
                editFolderTitle={editFolderTitle}
                removeFolder={removeFolder}
                doNotShowDeleteConfirmation={
                  this.props.doNotShowDeleteConfirmation
                }
                targetId={item.id}
                color={item.color}
                folders={item.folders}
                showDeleteConfirmation={this.props.showDeleteConfirmation}
                editFolderColor={editFolderColor}
              />
            </SmoothCollapse>
          </li>
        )}
      </Draggable>
    );
  }
}
