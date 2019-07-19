// @flow
import { remote } from 'electron';
import fs from 'fs';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './css/ExportDialog.css';
import { targetType } from '../reducers/targets';
import { libraryType } from '../reducers/libraries';
import { templateType } from '../reducers/templates';
import { payloadType } from '../reducers/payloads';
import { importTargets } from '../actions/targets';
import { importLibraries } from '../actions/libraries';
import { importTemplates } from '../actions/templates';
import { importPayloads } from '../actions/payloads';

type Props = {
  +exportTargets: targetType[],
  +exportLibraries: libraryType[],
  +exportTemplates: templateType[],
  +exportPayloads: payloadType[],
  +importTargets: (targets: targetType[]) => void,
  +importLibraries: (libraries: libraryType[]) => void,
  +importTemplates: (templates: templateType[]) => void,
  +importPayloads: (payloads: payloadType[]) => void
};

class ExportDialog extends React.PureComponent<Props> {
  props: Props;

  state = {
    targets: [],
    libraries: [],
    templates: [],
    payloads: []
  };

  handleSelectAll = (type, items) => e => {
    if (e.target.checked) {
      this.setState({ [type]: items });
    } else {
      this.setState({ [type]: [] });
    }
  };

  handleCheckboxChange = (type, item) => e => {
    if (e.target.checked) {
      this.setState(prevState => ({
        [type]: prevState[type].concat(item)
      }));
    } else {
      const index = this.state[type].findIndex(i => i.id === item.id);

      this.setState(prevState => ({
        [type]: [
          ...prevState[type].slice(0, index),
          ...prevState[type].slice(index + 1, prevState[type].length)
        ]
      }));
    }
  };

  handleImport = () => {
    const { dialog } = remote;

    dialog.showOpenDialog(
      {
        filters: [{ name: 'json', extensions: ['json'] }]
      },
      fileNames => {
        try {
          if (fileNames !== undefined) {
            const fileName = fileNames[0];

            fs.readFile(fileName, 'utf-8', (err, data) => {
              const importObjects = JSON.parse(data);

              this.props.importTargets(importObjects.targets);
              this.props.importLibraries(importObjects.libraries);
              this.props.importTemplates(importObjects.templates);
              this.props.importPayloads(importObjects.payloads);
            });

            dialog.showMessageBox(
              {
                type: 'info',
                title: 'Import',
                message: 'Import successful.',
                buttons: ['OK']
              },
              this.handleClose
            );
          }
        } catch (error) {
          dialog.showMessageBox(
            {
              type: 'error',
              title: 'Import',
              message: 'Something went wrong.',
              buttons: ['OK']
            },
            this.handleClose
          );
        }
      }
    );
  };

  handleExport = () => {
    const { dialog } = remote;

    dialog.showSaveDialog(
      { filters: [{ name: 'json', extensions: ['json'] }] },
      fileName => {
        try {
          if (fileName !== undefined) {
            fs.writeFile(fileName, JSON.stringify(this.state), function (err, result) {
       if (err) console.log('error', err);
});

            dialog.showMessageBox(
              {
                type: 'info',
                title: 'Export',
                message: 'Export successful.',
                buttons: ['OK']
              },
              this.handleClose
            );
          }
        } catch (error) {
          dialog.showMessageBox(
            {
              type: 'error',
              title: 'Export',
              message: 'Something went wrong.',
              buttons: ['OK']
            },
            this.handleClose
          );
        }
      }
    );
  };

  handleClose = () => {
    remote.getCurrentWindow().hide();
  };

  render() {
    const {
      exportTargets,
      exportLibraries,
      exportTemplates,
      exportPayloads
    } = this.props;

    const itemList = (type, items) => (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>
              <input
                type="checkbox"
                onClick={this.handleCheckboxChange(type, item)}
                checked={this.state[type].some(i => i.id === item.id)}
              />
              <span className={styles.checkmark} />
            </div>
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    );

    const dialogBox = (title, type, items) => (
      <div className={styles.dialogBoxSection}>
        <p className={styles.dialogBoxSectionTitle}>{title}</p>
        <div className={styles.dialogItems}>{itemList(type, items)}</div>
        <div className={styles.selectAllWrapper}>
          <div className={styles.selectAllCheckbox}>
            <input
              type="checkbox"
              onClick={this.handleSelectAll(type, items)}
            />
            <span className={styles.checkmark} />
          </div>Select All
        </div>
      </div>
    );

    return (
      <div className={styles.dialogWrapper}>
        <div className={styles.dialogBox}>
          {dialogBox('Targets', 'targets', exportTargets)}
          {dialogBox('Libraries', 'libraries', exportLibraries)}
          {dialogBox('Templates', 'templates', exportTemplates)}
          {dialogBox('Payloads', 'payloads', exportPayloads)}
        </div>
        <div className={styles.dialogBoxButtons}>
          <button
            className={styles.dialogBoxButtonImport}
            onClick={this.handleImport}
          >
            Import
          </button>
          <div>
            <button
              className={styles.dialogBoxButtonExport}
              onClick={this.handleExport}
            >
              Export
            </button>
            <button
              className={styles.dialogBoxButtonCancel}
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exportTargets: state.targets,
    exportLibraries: state.libraries,
    exportTemplates: state.templates,
    exportPayloads: state.payloads
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      importTargets,
      importLibraries,
      importTemplates,
      importPayloads
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportDialog);
