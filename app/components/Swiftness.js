// @flow
import React from 'react';
import PanelGroup from 'react-panelgroup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './css/Swiftness.css';
import LeftPanelContainer from '../containers/LeftPanelContainer';
import MiddlePanelContainer from '../containers/MiddlePanelContainer';
import RightPanelContainer from '../containers/RightPanelContainer';

export default class Swiftness extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <PanelGroup
          panelWidths={[
            { size: 246, minSize: 218, resize: 'dynamic' },
            { size: 346, minSize: 230, resize: 'dynamic' },
            { size: 512, minSize: 512, resize: 'dynamic' }
          ]}
        >
          <div className={styles.leftPanel}>
            <LeftPanelContainer />
          </div>
          <div className={styles.middlePanel}>
            <MiddlePanelContainer />
          </div>
          <div className={styles.rightPanel}>
            <RightPanelContainer />
          </div>
        </PanelGroup>
        <ToastContainer />
      </div>
    );
  }
}
