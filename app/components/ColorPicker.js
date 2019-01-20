// @flow
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import styles from './css/ColorPicker.css';

type Props = {};

class ColorPicker extends React.PureComponent<Props> {
  props: Props;

  state = {
    open: false
  };

  handleClickOutside = e => {
    e.stopPropagation();
    // this.props.onClose();
  };

  togglePopup = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const ColorItem = props => (
      <div {...props} className={styles.colorItem}>
        <div className={styles.border}>
          <div className={styles.center} />
        </div>
      </div>
    );

    return (
      <div className={styles.colorPicker} id="color-picker">
        <ColorItem onClick={this.togglePopup} />
        {this.state.open && (
          <div className={styles.colorPickerPopup}>
            <div className={styles.arrow} />
            <div className={styles.options}>
              <ColorItem />
              <ColorItem />
              <ColorItem />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(ColorPicker);
