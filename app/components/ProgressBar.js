// @flow
import React from 'react';
import styles from './css/ProgressBar.css';

type Props = {
  +value: number,
  +max: number
};

class ProgressBar extends React.PureComponent<Props> {
  props: Props;

  state = {
    showPercent: true
  };

  toggleUnits = () => {
    this.setState(prevState => ({ showPercent: !prevState.showPercent }));
  };

  setLeadingZeros = (value, digitNumber) => {
    const template = `000000000${value}`;

    return template.substr(template.length - digitNumber);
  };

  getColor = percent => {
    let color;

    if (percent <= 20) {
      color = '#FF1431';
    } else if (percent <= 60) {
      color = '#FECD75';
    } else if (percent <= 99) {
      color = '#B8E986';
    } else {
      color = '#7ED321';
    }

    return color;
  };

  render() {
    const { value, max } = this.props;
    const { showPercent } = this.state;

    const percent = max !== 0 ? Math.floor(value / max * 100) : 0;

    return (
      <div
        className={styles.progressBarContainer}
        onClick={this.toggleUnits}
        onKeyPress={this.toggleUnits}
        role="button"
        tabIndex={0}
      >
        <div className={styles.progressBarVisual}>
          <div
            style={{
              width: `${percent}%`,
              backgroundColor: this.getColor(percent)
            }}
            className={styles.progressBarValue}
          />
        </div>
        {showPercent && <span>{percent}%</span>}
        {!showPercent && (
          <div>
            <span className={styles.value}>
              {this.setLeadingZeros(value, max.toString().length)}
            </span>
            <span className={styles.max}>/{max}</span>
          </div>
        )}
      </div>
    );
  }
}

export default ProgressBar;
