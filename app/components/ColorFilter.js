// @flow
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';
import styles from './css/ColorFilter.css';

type Props = {
  +toggleColor: (color: string) => void,
  colors?: string[]
};

class ColorFilter extends React.PureComponent<Props> {
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

  toggleColor = (color: string) => {
    this.props.toggleColor(color);
  };

  render() {
    const { colors } = this.props;

    const ColorFilterButton = props => (
      <div
        className={classnames(styles.colorItem, styles[props.color])}
        onClick={props.onClick}
        onKeyPress={props.onClick}
        role="menuitem"
        tabIndex={0}
      >
        <div className={styles.border}>
          <div className={styles.center} />
        </div>
      </div>
    );

    const ColorItem = props => (
      <div
        className={classnames(styles.colorItem, styles[props.color], {
          [`${styles.selected}`]: props.isSelected
        })}
        onClick={() => props.onClick(props.color)}
        onKeyPress={() => props.onClick(props.color)}
        role="menuitem"
        tabIndex={0}
      >
        <div className={styles.border}>
          <div className={styles.center} />
        </div>
      </div>
    );

    return (
      <div className={styles.colorPicker}>
        <ColorFilterButton onClick={this.togglePopup} />
        {this.state.open && (
          <div className={styles.colorPickerPopup}>
            <div className={styles.arrow} />
            <div className={styles.options}>
              <ColorItem
                onClick={this.toggleColor}
                color="light-red"
                isSelected={colors && colors.includes('light-red')}
              />
              <ColorItem
                onClick={this.toggleColor}
                color="light-yellow"
                isSelected={colors && colors.includes('light-yellow')}
              />
              <ColorItem
                onClick={this.toggleColor}
                color="dark-red"
                isSelected={colors && colors.includes('dark-red')}
              />
              <ColorItem
                onClick={this.toggleColor}
                color="light-green"
                isSelected={colors && colors.includes('light-green')}
              />
              <ColorItem
                onClick={this.toggleColor}
                color="dark-yellow"
                isSelected={colors && colors.includes('dark-yellow')}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

ColorFilter.defaultProps = {
  colors: []
};

export default onClickOutside(ColorFilter);
