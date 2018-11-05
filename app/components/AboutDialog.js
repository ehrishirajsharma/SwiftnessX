// @flow
import React from 'react';
import styles from './css/AboutDialog.css';
import Logo from '../assets/images/logo.png';

export default class AboutDialog extends React.PureComponent {
  render() {
    return (
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutBox}>
          <div className={styles.aboutIntro}>
            <p>v0.1 Windows</p>
            <p>Swiftness Electron</p>
            <p>
              Swiftness is an open-source project aimed to intensify penetration
              testing process.
            </p>
          </div>
          <div className={styles.aboutLinks}>
            <div className={styles.aboutLogo}>
              <img src={Logo} alt="logo" />
            </div>
            <a href="#">swiftness.org</a>
            <a href="#">Contribute</a>
            <a href="#">Acknowledgments</a>
          </div>
        </div>
      </div>
    );
  }
}
