// @flow
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';
import styles from './css/ColorPicker.css';

type Props = {
  +editColor: (color: string) => void,
  +color: string | undefined,
  rootContainerSelector?: string
};

class ColorPicker extends React.PureComponent<Props> {
  props: Props;

  state = {
    open: false,
    popupOver: false
  };

  handleClickOutside = e => {
    e.stopPropagation();
    this.setState({ open: false });
  };

  togglePopup = e => {
    e.stopPropagation();
    if (this.props.rootContainerSelector !== undefined && !this.state.open) {
      this.fixColorPickerPosition(e);
    } else {
      this.setState({ popupOver: false });
    }
    this.setState(prevState => ({ open: !prevState.open }));
  };

  fixColorPickerPosition = e => {
    const rootContainer = document.querySelector(
      this.props.rootContainerSelector
    );
    const pickerContainer = e.currentTarget;
    const rootBounds = rootContainer.getBoundingClientRect();
    const pickerBounds = pickerContainer.getBoundingClientRect();

    if (rootBounds.bottom < pickerBounds.bottom + 107) {
      this.setState({ popupOver: true });
    } else {
      this.setState({ popupOver: false });
    }
  };

  editColor = (e, color: string) => {
    e.stopPropagation();
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
      <div
        className={styles.colorPicker}
        onClick={this.togglePopup}
        onKeyPress={this.togglePopup}
        role="button"
        tabIndex={0}
      >
        <ColorItem color={color} />
        {this.state.open && (
          <div className={styles.colorPickerPopup}>
            <div
              className={classnames(styles.arrow, {
                [`${styles.arrowOver}`]: this.state.popupOver
              })}
            />
            <div
              className={classnames(styles.options, {
                [`${styles.optionsOver}`]: this.state.popupOver
              })}
            >
              <ColorItem
                onClick={e => this.editColor(e, 'light-red')}
                color="light-red"
              />
              <ColorItem
                onClick={e => this.editColor(e, 'light-yellow')}
                color="light-yellow"
              />
              <ColorItem
                onClick={e => this.editColor(e, 'dark-red')}
                color="dark-red"
              />
              <ColorItem
                onClick={e => this.editColor(e, 'light-green')}
                color="light-green"
              />
              <ColorItem
                onClick={e => this.editColor(e, 'dark-yellow')}
                color="dark-yellow"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  rootContainerSelector: undefined
};

export default onClickOutside(ColorPicker);
