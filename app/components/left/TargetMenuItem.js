// @flow
import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import className from 'classnames';
import styles from '../css/TargetMenuItem.css';
import { targetType } from '../../reducers/targets';
import CategoryList from './CategoryList';
import CategoryListItem from './CategoryListItem';

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
  +setActiveList: () => void,
  +expanded: boolean,
  +item: targetType,
  +menu: {
    id: string | undefined,
    folderId: string | undefined
  },
  +showDeleteConfirmation: boolean
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
      item,
      removeParent
    } = this.props;

    return (
      <li
        className={className(styles.listItem, {
          [`${styles.expanded}`]:
            this.props.expanded || this.props.menu.id === item.id
        })}
        role="menuitem"
      >
        <CategoryListItem
          id={item.id}
          title={item.title}
          isNew={item.isNew}
          active={this.props.menu.id === item.id}
          onClick={this.handleListItemClick}
          addItem={() => addFolder(item.id)}
          saveItem={() => saveParent(item.id)}
          renameItem={title => editTitle(item.id, title)}
          removeItem={() => removeParent(item.id)}
          doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
          showDeleteConfirmation={this.props.showDeleteConfirmation}
        />
        <SmoothCollapse expanded={this.props.expanded}>
          <CategoryList
            activeFolderId={this.props.menu.folderId}
            onClick={onCategoryClick}
            addFolder={addFolder}
            saveFolder={saveFolder}
            editFolderTitle={editFolderTitle}
            removeFolder={removeFolder}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            targetId={item.id}
            folders={item.folders}
            showDeleteConfirmation={this.props.showDeleteConfirmation}
          />
        </SmoothCollapse>
      </li>
    );
  }
}
