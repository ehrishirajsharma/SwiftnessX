// @flow
import React from 'react';
import styles from '../css/Footer.css';
import SwiftnessIcon from '../../assets/icons/SwiftnessIcon';
import ExportIcon from '../../assets/icons/ExportIcon';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <SwiftnessIcon />
        <ExportIcon />
      </div>
    );
  }
}
