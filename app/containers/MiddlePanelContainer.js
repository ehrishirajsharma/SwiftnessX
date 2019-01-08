import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uiStateType } from '../reducers/uiState';
import { messagesType } from '../reducers/messages';
import { targetType } from '../reducers/targets';
import { librariesType } from '../reducers/libraries';
import { templateType } from '../reducers/templates';
import { payloadType } from '../reducers/payloads';
import {
  openChecklistData,
  openNoteData,
  openLibraryData,
  openTemplateData,
  openPayloadData,
  closeItemData,
  search
} from '../actions/uiState';
import {
  addTargetCheckitem,
  addTargetNote,
  saveTargetCheckitem,
  saveTargetNote,
  removeTargetCheckitem,
  removeTargetNote,
  editTargetCheckitemTitle,
  editTargetCheckitemCheckbox,
  editTargetCheckitemOrder,
  editTargetNoteTitle,
  editTargetNoteOrder
} from '../actions/targets';
import {
  addLibraryItem,
  saveLibraryItem,
  removeLibraryItem,
  editLibraryItemTitle,
  editLibraryItemOrder
} from '../actions/libraries';
import {
  addTemplateItem,
  saveTemplateItem,
  removeTemplateItem,
  editTemplateItemTitle,
  editTemplateItemOrder
} from '../actions/templates';
import {
  addPayloadItem,
  savePayloadItem,
  removePayloadItem,
  editPayloadItemTitle,
  editPayloadItemOrder
} from '../actions/payloads';
import { doNotShowDeleteConfirmation } from '../actions/messages';
import TargetList from '../components/middle/TargetList';
import ItemList from '../components/middle/ItemList';

type Props = {
  openChecklistData: (id?: string) => void,
  openNoteData: (id?: string) => void,
  openLibraryData: (id?: string) => void,
  openTemplateData: (id?: string) => void,
  openPayloadData: (id?: string) => void,
  closeItemData: () => void,
  search: (query: string) => void,

  addTargetCheckitem: (id: string, folderId: string) => void,
  addTargetNote: (id: string, folderId: string) => void,
  addLibraryItem: (id: string, folderId: string) => void,
  addTemplateItem: () => void,
  addPayloadItem: () => void,

  saveTargetCheckitem: (id: string, folderId: string, itemId: string) => void,
  saveTargetNote: (id: string, folderId: string, itemId: string) => void,
  saveLibraryItem: (id: string, folderId: string, itemId: string) => void,
  saveTemplateItem: (id: string) => void,
  savePayloadItem: (id: string) => void,

  removeTargetCheckitem: (id: string, folderId: string, itemId: string) => void,
  removeTargetNote: (id: string, folderId: string, itemId: string) => void,
  removeLibraryItem: (id: string, folderId: string, itemId: string) => void,
  removeTemplateItem: (id: string) => void,
  removePayloadItem: (id: string) => void,

  editTargetCheckitemTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editTargetNoteTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editLibraryItemTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editTemplateItemTitle: (id: string, title: string) => void,
  editPayloadItemTitle: (id: string, title: string) => void,

  editTargetCheckitemCheckbox: (
    id: string,
    folderId: string,
    itemId: string,
    checked: boolean
  ) => void,
  editTargetCheckitemOrder: (
    id: string,
    folderId: string,
    fromIndex: number,
    toIndex: number
  ) => void,
  editTargetNoteOrder: (
    id: string,
    folderId: string,
    fromIndex: number,
    toIndex: number
  ) => void,
  editLibraryItemOrder: (
    id: string,
    folderId: string,
    fromIndex: number,
    toIndex: number
  ) => void,
  editTemplateItemOrder: (fromIndex: number, toIndex: number) => void,
  editPayloadItemOrder: (fromIndex: number, toIndex: number) => void,

  doNotShowDeleteConfirmation: () => void,

  uiState: uiStateType,
  messages: messagesType,
  targets: targetType[],
  libraries: librariesType[],
  templates: templateType[],
  payloads: payloadType[]
};

class MiddlePanelContainer extends React.PureComponent<Props> {
  props: Props;

  getActiveChecklist = () => {
    const { targets } = this.props;
    const { id, folderId } = this.props.uiState.menu;

    const target = targets.find(l => l.id === id);
    const folder = target
      ? target.folders.find(f => f.id === folderId)
      : undefined;

    return folder ? folder.checklist : undefined;
  };

  getActiveNotes = () => {
    const { targets } = this.props;
    const { id, folderId } = this.props.uiState.menu;

    const target = targets.find(l => l.id === id);
    const folder = target
      ? target.folders.find(f => f.id === folderId)
      : undefined;

    return folder ? folder.notes : undefined;
  };

  getActiveChecklistData = () => {
    const { id } = this.props.uiState.main;

    return this.getActiveChecklist().find(c => c.id === id);
  };

  getActiveNoteData = () => {
    const { id } = this.props.uiState.main;

    return this.getActiveNotes().find(c => c.id === id);
  };

  getActiveLibrary = () => {
    const { libraries } = this.props;
    const { id, folderId } = this.props.uiState.menu;

    const library = libraries.find(l => l.id === id);
    const folder = library
      ? library.folders.find(f => f.id === folderId)
      : undefined;

    return folder ? folder.checklist : undefined;
  };

  getActiveLibraryData = () => {
    const { id } = this.props.uiState.main;

    return this.getActiveLibrary().find(c => c.id === id);
  };

  addTargetCheckitem = () => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.addTargetCheckitem(id, folderId);
  };

  addTargetNote = () => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.addTargetNote(id, folderId);
  };

  addLibraryItem = () => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.addLibraryItem(id, folderId);
  };

  saveTargetCheckitem = (itemId: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.saveTargetCheckitem(id, folderId, itemId);
  };

  saveTargetNote = (itemId: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.saveTargetNote(id, folderId, itemId);
  };

  saveLibraryItem = (itemId: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.saveLibraryItem(id, folderId, itemId);
  };

  removeTargetCheckitem = (itemId: string) => {
    const { menu, main } = this.props.uiState;

    if (main.type === 'checklistData' && main.id === itemId) {
      this.props.closeItemData();
    }

    this.props.removeTargetCheckitem(menu.id, menu.folderId, itemId);
  };

  removeTargetNote = (itemId: string) => {
    const { menu, main } = this.props.uiState;

    if (main.type === 'noteData' && main.id === itemId) {
      this.props.closeItemData();
    }

    this.props.removeTargetNote(menu.id, menu.folderId, itemId);
  };

  removeLibraryItem = (itemId: string) => {
    const { menu, main } = this.props.uiState;

    if (main.type === 'libraryData' && main.id === itemId) {
      this.props.closeItemData();
    }

    this.props.removeLibraryItem(menu.id, menu.folderId, itemId);
  };

  removeTemplateItem = (itemId: string) => {
    const { main } = this.props.uiState;

    if (main.type === 'templateData' && main.id === itemId) {
      this.props.closeItemData();
    }

    this.props.removeTemplateItem(itemId);
  };

  removePayloadItem = (itemId: string) => {
    const { main } = this.props.uiState;

    if (main.type === 'payloadData' && main.id === itemId) {
      this.props.closeItemData();
    }

    this.props.removePayloadItem(itemId);
  };

  editTargetCheckitemCheckbox = (itemId: string) => event => {
    event.stopPropagation();

    const { menu } = this.props.uiState;

    this.props.editTargetCheckitemCheckbox(
      menu.id,
      menu.folderId,
      itemId,
      event.target.checked
    );
  };

  editTargetCheckitemOrder = (fromIndex: number, toIndex: number) => {
    const { menu } = this.props.uiState;

    this.props.editTargetCheckitemOrder(
      menu.id,
      menu.folderId,
      fromIndex,
      toIndex
    );
  };

  editTargetNoteOrder = (fromIndex: number, toIndex: number) => {
    const { menu } = this.props.uiState;

    this.props.editTargetNoteOrder(menu.id, menu.folderId, fromIndex, toIndex);
  };

  editLibraryItemOrder = (fromIndex: number, toIndex: number) => {
    const { menu } = this.props.uiState;

    this.props.editLibraryItemOrder(menu.id, menu.folderId, fromIndex, toIndex);
  };

  render() {
    const { uiState, templates, payloads } = this.props;
    const { id, folderId, type } = uiState.menu;

    return (
      <div>
        {type === 'target' && (
          <TargetList
            openChecklistData={this.props.openChecklistData}
            openNoteData={this.props.openNoteData}
            search={this.props.search}
            addCheckitem={this.addTargetCheckitem}
            addNote={this.addTargetNote}
            saveCheckitem={this.saveTargetCheckitem}
            saveNote={this.saveTargetNote}
            renameCheckitem={(itemId, title) =>
              this.props.editTargetCheckitemTitle(id, folderId, itemId, title)
            }
            renameNote={(itemId, title) =>
              this.props.editTargetNoteTitle(id, folderId, itemId, title)
            }
            checkitemCheckbox={this.editTargetCheckitemCheckbox}
            removeCheckitem={this.removeTargetCheckitem}
            removeNote={this.removeTargetNote}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderCheckitem={this.editTargetCheckitemOrder}
            reorderNote={this.editTargetNoteOrder}
            checklist={this.getActiveChecklist()}
            notes={this.getActiveNotes()}
            main={uiState.main}
            showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
          />
        )}
        {type === 'library' && (
          <ItemList
            openItemData={this.props.openLibraryData}
            search={this.props.search}
            addItem={this.addLibraryItem}
            saveItem={this.saveLibraryItem}
            renameItem={(itemId, title) =>
              this.props.editLibraryItemTitle(id, folderId, itemId, title)
            }
            removeItem={this.removeLibraryItem}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderItem={this.editLibraryItemOrder}
            items={this.getActiveLibrary()}
            main={uiState.main}
            showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
          />
        )}
        {type === 'template' && (
          <ItemList
            openItemData={this.props.openTemplateData}
            search={this.props.search}
            addItem={this.props.addTemplateItem}
            saveItem={this.props.saveTemplateItem}
            renameItem={this.props.editTemplateItemTitle}
            removeItem={this.removeTemplateItem}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderItem={this.props.editTemplateItemOrder}
            items={templates}
            main={uiState.main}
            showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
          />
        )}
        {type === 'payload' && (
          <ItemList
            openItemData={this.props.openPayloadData}
            search={this.props.search}
            addItem={this.props.addPayloadItem}
            saveItem={this.props.savePayloadItem}
            renameItem={this.props.editPayloadItemTitle}
            removeItem={this.removePayloadItem}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderItem={this.props.editPayloadItemOrder}
            items={payloads}
            main={uiState.main}
            showDeleteConfirmation={this.props.messages.showDeleteConfirmation}
          />
        )}
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
      openChecklistData,
      openNoteData,
      openLibraryData,
      openTemplateData,
      openPayloadData,
      closeItemData,
      search,

      addTargetCheckitem,
      addTargetNote,
      addLibraryItem,
      addTemplateItem,
      addPayloadItem,

      saveTargetCheckitem,
      saveTargetNote,
      saveLibraryItem,
      saveTemplateItem,
      savePayloadItem,

      removeTargetCheckitem,
      removeTargetNote,
      removeLibraryItem,
      removeTemplateItem,
      removePayloadItem,

      editTargetCheckitemTitle,
      editTargetNoteTitle,
      editLibraryItemTitle,
      editTemplateItemTitle,
      editPayloadItemTitle,

      editTargetCheckitemCheckbox,

      editTargetCheckitemOrder,
      editTargetNoteOrder,
      editLibraryItemOrder,
      editTemplateItemOrder,
      editPayloadItemOrder,
      doNotShowDeleteConfirmation
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  MiddlePanelContainer
);
