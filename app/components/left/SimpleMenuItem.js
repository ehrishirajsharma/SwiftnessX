// @flow
import React from 'react';
import className from 'classnames';
import styles from '../css/SimpleMenuItem.css';

type Props = {
  +openItem: () => void,
  +openItemData: (id?: string) => void,
  +items: {
    +id: string
  }[],
  +title: string,
  +isSelected: boolean
};

const SimpleMenuItem = MenuItemIcon => (props: Props) => {
  const { openItem, openItemData, items, title, isSelected } = props;

  const handleClick = () => {
    openItem();

    if (items.length > 0) {
      openItemData(items[0].id);
    } else {
      openItemData();
    }
  };

  return (
    <div
      className={className(styles.menuItemNavHeader, {
        [`${styles.selected}`]: isSelected
      })}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="menuitem"
      tabIndex={0}
    >
      <MenuItemIcon />
      <span>{title}</span>
    </div>
  );
};

export default SimpleMenuItem;
