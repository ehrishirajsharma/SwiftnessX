// @flow
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import sanitizeHtml from 'sanitize-html';
import styles from '../css/ItemList.css';
import SearchIcon from '../../assets/icons/Search';
import InnerItemList from './InnerItemList';
import ColorFilter from '../ColorFilter';

type Props = {
  +openItemData: (id: string) => void,
  +search: (query: string) => void,
  +addItem: () => void,
  +saveItem: (id: string) => void,
  +renameItem: (id: string, title: string) => void,
  editItemColor?: (id: string, color: string) => void,
  +removeItem: (id: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +reorderItem: (fromIndex: number, toIndex: number) => void,
  toggleMainColor?: (color: string) => void,
  +items: {
    +id: string,
    +title: string,
    +content?: string,
    +data?: {
      +title?: string,
      +content?: string
    }[],
    +done?: boolean,
    +isNew?: boolean
  }[],
  checkboxState?: (itemId: string) => void,
  checkbox?: boolean,
  +main: {
    id: string | undefined,
    colors: string[] | undefined
  },
  +showDeleteConfirmation: boolean
};

class ItemList extends React.PureComponent<Props> {
  props: Props;

  state = {
    filter: ''
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });

    this.props.search(e.target.value.toLowerCase());
  };

  applySearchFilter = items => {
    const { filter } = this.state;

    if (filter !== '') {
      return items.filter(
        item =>
          item.title.toLowerCase().includes(filter) ||
          sanitizeHtml(item.content, { allowedTags: [], allowedAttributes: [] })
            .toLowerCase()
            .includes(filter) ||
          (item.data &&
            item.data.some(
              p =>
                p.title.toLowerCase().includes(filter) ||
                p.content.toUpperCase().includes(filter)
            ))
      );
    }

    return items;
  };

  applyColorFilter = items => {
    const { colors } = this.props.main;

    if (colors !== undefined && colors.length !== 0) {
      return items.filter(item => colors.includes(item.color));
    }

    return items;
  };

  onItemClick = id => {
    this.props.openItemData(id);
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    this.props.reorderItem(result.source.index, result.destination.index);
  };

  render() {
    const { main, addItem, items, checkboxState, checkbox } = this.props;

    const itemList = (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <InnerItemList
                saveItem={this.props.saveItem}
                openItem={this.onItemClick}
                renameItem={this.props.renameItem}
                removeItem={this.props.removeItem}
                editColor={this.props.editItemColor}
                doNotShowDeleteConfirmation={
                  this.props.doNotShowDeleteConfirmation
                }
                items={this.applyColorFilter(this.applySearchFilter(items))}
                checkboxState={checkboxState}
                checkbox={checkbox}
                selectedItem={main.id}
                showDeleteConfirmation={this.props.showDeleteConfirmation}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    return (
      <div className={styles.itemList}>
        <div className={styles.itemListControls}>
          <div id={styles.searchItemList}>
            <input
              className="list-search"
              onChange={this.onFilterChange}
              type="text"
              placeholder="Search"
            />
            <SearchIcon />
          </div>
          <div
            className={styles.newItemListButton}
            onClick={addItem}
            onKeyPress={addItem}
            role="menuitem"
            tabIndex={0}
          >
            <span>New +</span>
          </div>
          {this.props.toggleMainColor !== undefined && (
            <ColorFilter
              toggleColor={this.props.toggleMainColor}
              colors={this.props.main.colors}
            />
          )}
        </div>
        <div className={styles.itemListBody}>
          <ul>{itemList}</ul>
        </div>
      </div>
    );
  }
}

ItemList.defaultProps = {
  checkboxState: () => {},
  checkbox: false,
  editItemColor: undefined,
  toggleMainColor: undefined
};

export default ItemList;
