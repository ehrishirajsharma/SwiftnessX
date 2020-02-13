// @flow
import React from 'react';
import className from 'classnames';
import SmoothCollapse from 'react-smooth-collapse';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../css/TargetMenu.css';
import SearchIcon from '../../assets/icons/Search';
import { targetType } from '../../reducers/targets';
import { libraryType } from '../../reducers/libraries';
import TargetMenuItem from './TargetMenuItem';
import ArrowUpIcon from '../../assets/icons/ArrowUpIcon';
import AddIcon from '../../assets/icons/AddIcon';
import AddPopup from '../AddPopup';
import ColorFilter from '../ColorFilter';

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
  +editFolderColor: (id: string, folderId: string, color: string) => void,
  +toggleMenuColor: (color: string) => void,
  +title: string,
  +sublist: targetType[],
  +menu: {
    id: string | undefined,
    folderId: string | undefined,
    colors: string[] | undefined
  },
  +showDeleteConfirmation: boolean
};

export default class TargetMenu extends React.PureComponent<Props> {
  props: Props;

  state = {
    popupOpen: false,
    sublistExpanded: true,
    expandedList: undefined,
    filter: '',
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

  onFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  applySearchFilter = items => {
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

  applyColorFilter = items => {
    const { colors } = this.props.menu;

    if (colors !== undefined && colors.length !== 0) {
      return items.filter(item => colors.includes(item.color));
    }

    return items;
  };

  setActiveList = id => {
    this.setState(prevState => ({
      expandedList: prevState.expandedList !== id ? id : undefined
    }));
  };

  handleAddClick = e => {
    this.setState(prevState => ({ popupOpen: !prevState.popupOpen }));
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

  setOverflowAuto = () => {
    const entireItemList = document.querySelector('#target-list');
    const entireItemListBounds = entireItemList.getBoundingClientRect();

    if (entireItemListBounds.height > 326) {
      this.setState({ overflowAuto: true });
    } else {
      this.setState({ overflowAuto: false });
    }
  };

  render() {
    const {
      removeParent,
      addFolder,
      removeFolder,
      title,
      sublist,
      menu
    } = this.props;

    const sublistList = (
      <ul id="target-list">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.applyColorFilter(this.applySearchFilter(sublist)).map(
                  (item, index) => (
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
                      editFolderColor={this.props.editFolderColor}
                      showDeleteConfirmation={this.props.showDeleteConfirmation}
                      rootContainerSelector={
                        this.state.overflowAuto
                          ? '#target-container'
                          : undefined
                      }
                    />
                  )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    );

    return (
      <div className={styles.menuItemNav} id="target-container">
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
          {this.state.popupOpen && (
            <AddPopup
              onClick={this.handleAddFromPopup}
              onClose={this.handleClosePopup}
            />
          )}
        </div>

        <SmoothCollapse
          expanded={this.state.sublistExpanded}
          className={className(styles.menuItemNavList, {
            [`${styles.overflowAuto}`]: this.state.overflowAuto
          })}
          allowOverflowWhenOpen
        >
          <div className={styles.header}>
            <div id={styles.searchItemList}>
              <input
                className="target-search"
                onChange={this.onFilterChange}
                type="text"
                placeholder="Search Targets Here"
              />
              <SearchIcon />
            </div>
            <ColorFilter
              toggleColor={this.props.toggleMenuColor}
              colors={menu.colors}
            />
          </div>
          {sublistList}
        </SmoothCollapse>
      </div>
    );
  }
}
