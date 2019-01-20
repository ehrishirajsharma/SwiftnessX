// @flow
import { ipcRenderer } from 'electron';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  openTarget,
  openLibrary,
  openTemplate,
  openPayload,
  closeList,
  openChecklistData,
  openLibraryData,
  openTemplateData,
  openPayloadData
} from '../actions/uiState';
import {
  addTarget,
  addTargetFolder,
  saveTarget,
  saveTargetFolder,
  editTargetTitle,
  editTargetOrder,
  editTargetFolderTitle,
  editTargetFolderOrder,
  editTargetFolderColor,
  removeTarget,
  removeTargetFolder
} from '../actions/targets';
import {
  addLibrary,
  addLibraryFolder,
  saveLibrary,
  saveLibraryFolder,
  editLibraryTitle,
  editLibraryOrder,
  editLibraryColor,
  editLibraryFolderTitle,
  editLibraryFolderOrder,
  removeLibrary,
  removeLibraryFolder
} from '../actions/libraries';
import { doNotShowDeleteConfirmation } from '../actions/messages';
import { uiStateType } from '../reducers/uiState';
import { messagesType } from '../reducers/messages';
import { targetType } from '../reducers/targets';
import { libraryType } from '../reducers/libraries';
import { templateType } from '../reducers/templates';
import { payloadType } from '../reducers/payloads';
import TargetMenu from '../components/left/TargetMenu';
import LibraryMenu from '../components/left/LibraryMenu';
import SimpleMenu from '../components/left/SimpleMenu';
import TemplateIcon from '../assets/icons/TemplateIcon';
import PayloadIcon from '../assets/icons/PayloadIcon';
import SwiftnessIcon from '../assets/icons/SwiftnessIcon';
import ExportIcon from '../assets/icons/ExportIcon';
import styles from '../components/css/LeftPanelContainer.css';

type Props = {
  +openTarget: (id: string, folderId: string) => void,
  +openLibrary: (id: string, folderId: string) => void,
  +openTemplate: () => void,
  +openPayload: () => void,

  +closeList: () => void,

  +openChecklistData: (itemId: string) => void,
  +openLibraryData: (itemId: string) => void,
  +openTemplateData: (itemId: string) => void,
  +openPayloadData: (itemId: string) => void,

  +addTarget: (library?: libraryType) => void,
  +addLibrary: () => void,
  +addTargetFolder: (id: string) => void,
  +addLibraryFolder: (id: string) => void,

  +saveTarget: (id: string) => void,
  +saveLibrary: (id: string) => void,
  +saveTargetFolder: (id: string, folderId: string) => void,
  +saveLibraryFolder: (id: string, folderId: string) => void,

  +editTargetTitle: (id: string, title: string) => void,
  +editTargetOrder: (fromIndex: number, toIndex: number) => void,
  +editTargetFolderTitle: (id: string, folderId: string, title: string) => void,
  +editTargetFolderOrder: (
    id: string,
    fromIndex: number,
    toIndex: number
  ) => void,
  +editTargetFolderColor: (id: string, folderId: string, color: string) => void,
  +editLibraryTitle: (id: string, title: string) => void,
  +editLibraryOrder: (fromIndex: number, toIndex: number) => void,
  +editLibraryColor: (id: string, color: string) => void,
  +editLibraryFolderTitle: (
    id: string,
    folderId: string,
    title: string
  ) => void,
  +editLibraryFolderOrder: (
    id: string,
    fromIndex: number,
    toIndex: number
  ) => void,

  +removeTarget: (id: string) => void,
  +removeLibrary: (id: string) => void,
  +removeTargetFolder: (id: string, folderId: string) => void,
  +removeLibraryFolder: (id: string, folderId: string) => void,

  +doNotShowDeleteConfirmation: () => void,

  +uiState: uiStateType,
  +messages: messagesType,
  +targets: targetType[],
  +libraries: libraryType[],
  +templates: templateType[],
  +payloads: payloadType[]
};

class LeftPanelContainer extends React.PureComponent<Props> {
  props: Props;

  handleAboutClick = () => {
    ipcRenderer.send('openAboutWindow');
  };

  handleExportClick = () => {
    ipcRenderer.send('openExportWindow');
  };

  handleRemoveTarget = (id: string) => {
    const { menu } = this.props.uiState;

    if (menu.type === 'target' && menu.id === id) {
      this.props.closeList();
    }

    this.props.removeTarget(id);
  };

  handleRemoveTargetFolder = (id: string, folderId: string) => {
    const { menu } = this.props.uiState;

    if (
      menu.type === 'target' &&
      menu.id === id &&
      menu.folderId === folderId
    ) {
      this.props.closeList();
    }

    this.props.removeTargetFolder(id, folderId);
  };

  handleRemoveLibrary = (id: string) => {
    const { menu } = this.props.uiState;

    if (menu.type === 'library' && menu.id === id) {
      this.props.closeList();
    }

    this.props.removeLibrary(id);
  };

  handleRemoveLibraryFolder = (id: string, folderId: string) => {
    const { menu } = this.props.uiState;

    if (
      menu.type === 'library' &&
      menu.id === id &&
      menu.folderId === folderId
    ) {
      this.props.closeList();
    }

    this.props.removeLibraryFolder(id, folderId);
  };

  render() {
    const { uiState, targets, libraries, templates, payloads } = this.props;

    const TemplatesMenu = SimpleMenu(TemplateIcon);
    const PayloadsMenu = SimpleMenu(PayloadIcon);

    return (
      <div>
        <TargetMenu
          openItem={this.props.openTarget}
          openItemData={this.props.openChecklistData}
          removeParent={this.handleRemoveTarget}
          addFolder={this.props.addTargetFolder}
          removeFolder={this.handleRemoveTargetFolder}
          doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
          onAddClick={this.props.addTarget}
          saveParent={this.props.saveTarget}
          saveFolder={this.props.saveTargetFolder}
          editTitle={this.props.editTargetTitle}
          editOrder={this.props.editTargetOrder}
          editFolderTitle={this.props.editTargetFolderTitle}
          editFolderOrder={this.props.editTargetFolderOrder}
          editFolderColor={this.props.editTargetFolderColor}
          title="Targets"
          sublist={targets}
          menu={uiState.menu}
          showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
        />
        <LibraryMenu
          openItem={this.props.openLibrary}
          openItemData={this.props.openLibraryData}
          removeParent={this.handleRemoveLibrary}
          addFolder={this.props.addLibraryFolder}
          removeFolder={this.handleRemoveLibraryFolder}
          doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
          onAddClick={this.props.addLibrary}
          saveParent={this.props.saveLibrary}
          saveFolder={this.props.saveLibraryFolder}
          editTitle={this.props.editLibraryTitle}
          editOrder={this.props.editLibraryOrder}
          editColor={this.props.editLibraryColor}
          editFolderTitle={this.props.editLibraryFolderTitle}
          editFolderOrder={this.props.editLibraryFolderOrder}
          title="Libraries"
          sublist={libraries}
          menu={uiState.menu}
          showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
        />
        <TemplatesMenu
          openItem={this.props.openTemplate}
          openItemData={this.props.openTemplateData}
          items={templates}
          title="Templates"
          isSelected={uiState.menu.type === 'template'}
        />
        <PayloadsMenu
          openItem={this.props.openPayload}
          openItemData={this.props.openPayloadData}
          items={payloads}
          title="Payloads"
          isSelected={uiState.menu.type === 'payload'}
        />

        <div className={styles.footer}>
          <SwiftnessIcon onClick={this.handleAboutClick} />
          <ExportIcon onClick={this.handleExportClick} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.uiState,
    messages: state.messages,
    targets: state.targets,
    libraries: state.libraries,
    templates: state.templates,
    payloads: state.payloads
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openTarget,
      openLibrary,
      openTemplate,
      openPayload,
      closeList,

      openChecklistData,
      openLibraryData,
      openTemplateData,
      openPayloadData,

      addTarget,
      addLibrary,
      addTargetFolder,
      addLibraryFolder,

      saveTarget,
      saveLibrary,
      saveTargetFolder,
      saveLibraryFolder,

      editTargetTitle,
      editTargetOrder,
      editTargetFolderTitle,
      editTargetFolderOrder,
      editTargetFolderColor,
      editLibraryTitle,
      editLibraryOrder,
      editLibraryColor,
      editLibraryFolderTitle,
      editLibraryFolderOrder,

      removeTarget,
      removeLibrary,
      removeTargetFolder,
      removeLibraryFolder,

      doNotShowDeleteConfirmation
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanelContainer);
