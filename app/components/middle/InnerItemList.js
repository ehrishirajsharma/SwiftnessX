import React from 'react';
import Item from './Item';

type Props = {
  +saveItem: (id: string) => void,
  +openItem: (id: string) => void,
  +renameItem: (id: string, title: string) => void,
  +editColor: (id: string, color: string) => void,
  +removeItem: (id: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +items: {
    +id: string,
    +title: string,
    +done?: boolean,
    +isNew?: boolean
  }[],
  checkboxState: (id: string) => void,
  checkbox: boolean,
  selectedItem: string | undefined,
  showDeleteConfirmation: boolean
};

class InnerItemList extends React.PureComponent<Props> {
  props: Props;

  render() {
    const { selectedItem, items, ...itemProps } = this.props;

    return items.map((item, index) => (
      <Item
        {...itemProps}
        key={item.id}
        item={item}
        index={index}
        editColor={this.props.editColor}
        isSelected={item.id === selectedItem}
      />
    ));
  }
}

export default InnerItemList;
