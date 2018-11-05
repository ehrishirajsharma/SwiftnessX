// @flow
import React from 'react';
import styles from '../css/CategoryList.css';
import CategoryListItem from './CategoryListItem';

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
        {folders.map(folder => (
          <div key={folder.id}>
            <CategoryListItem
              id={`${targetId}-${folder.id}`}
              title={folder.title}
              isNew={folder.isNew}
              active={this.props.activeFolderId === folder.id}
              onClick={() => this.props.onClick(folder.id)}
              addItem={() => addFolder(targetId)}
              saveItem={() => saveFolder(targetId, folder.id)}
              renameItem={title => editFolderTitle(targetId, folder.id, title)}
              removeItem={() => removeFolder(targetId, folder.id)}
              doNotShowDeleteConfirmation={
                this.props.doNotShowDeleteConfirmation
              }
              showDeleteConfirmation={this.props.showDeleteConfirmation}
            />
          </div>
        ))}
      </div>
    );
  }
}
