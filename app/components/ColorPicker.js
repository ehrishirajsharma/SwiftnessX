// @flow
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';
import styles from './css/ColorPicker.css';

type Props = {
  +editColor: (color: string) => void,
  +color: string | undefined
};

class ColorPicker extends React.PureComponent<Props> {
  props: Props;

  state = {
    open: false
  };

  handleClickOutside = e => {
    e.stopPropagation();
    this.setState({ open: false });
  };

  togglePopup = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  editColor = (color: string) => {
    this.props.editColor(color);
    this.setState({ open: false });
  };

  render() {
    const { color } = this.props;

    const ColorItem = props => (
      <div
        {...props}
        className={classnames(styles.colorItem, styles[props.color])}
      >
        <div className={styles.border}>
          <div className={styles.center} />
        </div>
      </div>
    );

    return (
      <div className={styles.colorPicker} id="color-picker">
        <ColorItem onClick={this.togglePopup} color={color} />
        {this.state.open && (
          <div className={styles.colorPickerPopup}>
            <div className={styles.arrow} />
            <div className={styles.options}>
              <ColorItem
                onClick={() => this.editColor('light-red')}
                color="light-red"
              />
              <ColorItem
                onClick={() => this.editColor('light-yellow')}
                color="light-yellow"
              />
              <ColorItem
                onClick={() => this.editColor('dark-red')}
                color="dark-red"
              />
              <ColorItem
                onClick={() => this.editColor('light-green')}
                color="light-green"
              />
              <ColorItem
                onClick={() => this.editColor('dark-yellow')}
                color="dark-yellow"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(ColorPicker);
