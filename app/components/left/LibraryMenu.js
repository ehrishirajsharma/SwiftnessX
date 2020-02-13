// @flow
import React from 'react';
import className from 'classnames';
import SmoothCollapse from 'react-smooth-collapse';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../css/LibraryMenu.css';
import LibraryMenuItem from './LibraryMenuItem';
import ColorPicker from '../ColorPicker';
import ArrowUpIcon from '../../assets/icons/ArrowUpIcon';
import AddIcon from '../../assets/icons/AddIcon';
import { libraryType } from '../../reducers/libraries';

type Props = {
  +saveParent: (id: string) => void,
  +saveFolder: (id: string, folderId: string) => void,
  +onAddClick: (library?: libraryType) => void,
  +openItem: (id: string, folderId: string) => void,
  +openItemData: (itemId: string) => void,
  +removeParent: (id: string) => void,
  +addFolder: (id: string) => void,
  +removeFolder: (id: string, folderId: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +editTitle: (id: string, title: string) => void,
  +editOrder: (fromIndex: number, toIndex: number) => void,
  +editColor: (id: string, color: string) => void,
  +editFolderTitle: (id: string, folderId: string, title: string) => void,
  +editFolderOrder: (id: string, fromIndex: number, toIndex: number) => void,
  +title: string,
  +sublist: libraryType[],
  +menu: {
    id: string | undefined,
    folderId: string | undefined
  },
  +showDeleteConfirmation: boolean
};

export default class LibraryMenu extends React.PureComponent<Props> {
  props: Props;

  state = {
    sublistExpanded: true,
    expandedList: undefined,
    overflowAuto: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setOverflowAuto();
    }, 0);
  };

  componentDidUpdate = () => {
    this.setOverflowAuto();
  };

  setActiveList = id => {
    this.setState(prevState => ({
      expandedList: prevState.expandedList !== id ? id : undefined
    }));
  };

  handleAddClick = e => {
    this.props.onAddClick();
    this.setState({ sublistExpanded: true });

    e.stopPropagation();
  };

  handleKeyPress = evt => {
    if (evt.key === ' ') {
      this.handleHeaderClick();
    }
  };

  handleHeaderClick = () => {
    this.setState({ sublistExpanded: !this.state.sublistExpanded });
  };

  handleCategoryClick = (item, folderId) => {
    const folder = item.folders.find(f => f.id === folderId);

    if (folder) {
      this.props.openItem(item.id, folder.id);

      if (folder.checklist.length > 0) {
        this.props.openItemData(folder.checklist[0].id, true);
      } else {
        this.props.openItemData(undefined, true);
      }
    }
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.type === 'DEFAULT') {
      this.props.editOrder(result.source.index, result.destination.index);
    } else {
      this.props.editFolderOrder(
        result.type,
        result.source.index,
        result.destination.index
      );
    }
  };

  setOverflowAuto = () => {
    const entireItemList = document.querySelector('#library-list');
    const entireItemListBounds = entireItemList.getBoundingClientRect();

    if (entireItemListBounds.height > 250) {
      this.setState({ overflowAuto: true });
    } else {
      this.setState({ overflowAuto: false });
    }
  };

  render() {
    const {
      removeParent,
      editColor,
      addFolder,
      removeFolder,
      title,
      sublist,
      menu
    } = this.props;

    const sublistList = (
      <ul id="library-list">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sublist.map((item, index) => (
                  <div key={item.id} className={styles.menuItem}>
                    <LibraryMenuItem
                      item={item}
                      menu={menu}
                      expanded={this.state.expandedList === item.id}
                      index={index}
                      setActiveList={() => this.setActiveList(item.id)}
                      onCategoryClick={folderId =>
                        this.handleCategoryClick(item, folderId)
                      }
                      removeParent={removeParent}
                      doNotShowDeleteConfirmation={
                        this.props.doNotShowDeleteConfirmation
                      }
                      addFolder={addFolder}
                      saveParent={this.props.saveParent}
                      saveFolder={this.props.saveFolder}
                      removeFolder={removeFolder}
                      editTitle={this.props.editTitle}
                      editFolderTitle={this.props.editFolderTitle}
                      showDeleteConfirmation={this.props.showDeleteConfirmation}
                    />
                    <ColorPicker
                      editColor={selectedColor =>
                        editColor(item.id, selectedColor)
                      }
                      color={item.color}
                      rootContainerSelector={
                        this.state.overflowAuto
                          ? '#library-container'
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    );

    return (
      <div className={styles.menuItemNav} id="library-container">
        <div
          className={styles.menuItemNavHeader}
          onClick={this.handleHeaderClick}
          onKeyPress={this.handleKeyPress}
          role="menuitem"
          tabIndex={0}
        >
          <ArrowUpIcon up={this.state.sublistExpanded} />
          <span>{title}</span>
          <AddIcon onClick={this.handleAddClick} />
        </div>

        <SmoothCollapse
          expanded={this.state.sublistExpanded}
          className={className(styles.menuItemNavList, {
            [`${styles.overflowAuto}`]: this.state.overflowAuto
          })}
          allowOverflowWhenOpen
        >
          {sublistList}
        </SmoothCollapse>
      </div>
    );
  }
}
