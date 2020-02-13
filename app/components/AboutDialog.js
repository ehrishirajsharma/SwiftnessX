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
            <p>v0.2 Windows</p>
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
            <a href="https://swiftness.org">swiftness.org</a>
            <a href="https://github.com/ehrishirajsharma/SwiftnessX/issues">
              Contribute
            </a>
            <a href="https://github.com/ehrishirajsharma/SwiftnessX/graphs/contributors">
              Acknowledgments
            </a>
          </div>
        </div>
      </div>
    );
  }
}
