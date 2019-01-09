// @flow
import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../css/AdvancedMenuItem.css';
import SearchIcon from '../../assets/icons/Search';
import { targetType } from '../../reducers/targets';
import TargetMenuItem from './TargetMenuItem';
import ArrowUpIcon from '../../assets/icons/ArrowUpIcon';
import AddIcon from '../../assets/icons/AddIcon';
import AddPopup from '../AddPopup';
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
  +editFolderTitle: (id: string, folderId: string, title: string) => void,
  +editFolderOrder: (id: string, fromIndex: number, toIndex: number) => void,
  +title: string,
  +sublist: targetType[],
  popup?: boolean,
  +menu: {
    id: string | undefined,
    folderId: string | undefined
  },
  +showDeleteConfirmation: boolean,
  searchable?: boolean
};

export default class AdvancedMenuItem extends React.PureComponent<Props> {
  props: Props;

  state = {
    popupOpen: false,
    sublistExpanded: true,
    expandedList: undefined,
    filter: ''
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  applyFilter = items => {
    const { filter } = this.state;

    if (filter !== '') {
      return items.filter(
        item =>
          item.title.toLowerCase().includes(filter) ||
          item.folders.some(f => f.title.toLowerCase().includes(filter))
      );
    }

    return items;
  };

  setActiveList = id => {
    this.setState(prevState => ({
      expandedList: prevState.expandedList !== id ? id : undefined
    }));
  };

  handleAddClick = e => {
    if (this.props.popup) {
      this.setState(prevState => ({ popupOpen: !prevState.popupOpen }));
    } else {
      this.props.onAddClick();
      this.setState({ sublistExpanded: true });
    }

    e.stopPropagation();
  };

  handleAddFromPopup = (e, library?: libraryType) => {
    e.stopPropagation();

    this.handleClosePopup();

    this.props.onAddClick(library);
    this.setState({ sublistExpanded: true });
  };

  handleClosePopup = () => {
    this.setState({ popupOpen: false });
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

  render() {
    const {
      removeParent,
      addFolder,
      removeFolder,
      title,
      sublist,
      popup,
      menu,
      searchable
    } = this.props;

    const sublistList = (
      <ul>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.applyFilter(sublist).map((item, index) => (
                  <TargetMenuItem
                    key={item.id}
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
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    );

    return (
      <div className={styles.menuItemNav}>
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
          {popup &&
            this.state.popupOpen && (
              <AddPopup
                onClick={this.handleAddFromPopup}
                onClose={this.handleClosePopup}
              />
            )}
        </div>

        <SmoothCollapse
          expanded={this.state.sublistExpanded}
          className={styles.menuItemNavList}
        >
          {searchable && (
            <div id={styles.searchItemList}>
              <input
                className="target-search"
                onChange={this.onFilterChange}
                type="text"
                placeholder="Search Targets Here"
              />
              <SearchIcon />
            </div>
          )}
          {sublistList}
        </SmoothCollapse>
      </div>
    );
  }
}

AdvancedMenuItem.defaultProps = {
  popup: false,
  searchable: false
};
