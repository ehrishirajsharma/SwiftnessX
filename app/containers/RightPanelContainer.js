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
  editTargetCheckitemTitle,
  editTargetCheckitemContent,
  editTargetNoteTitle,
  editTargetNoteContent
} from '../actions/targets';
import {
  editLibraryItemTitle,
  editLibraryItemContent
} from '../actions/libraries';
import {
  editTemplateItemTitle,
  editTemplateItemContent
} from '../actions/templates';
import {
  addPayloadItemData,
  editPayloadItemTitle,
  removePayloadItemData
} from '../actions/payloads';
import { doNotShowDeleteConfirmation } from '../actions/messages';
import ItemData from '../components/right/ItemData';
import PayloadData from '../components/right/PayloadData';

type Props = {
  editTargetCheckitemTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editTargetCheckitemContent: (
    id: string,
    folderId: string,
    itemId: string,
    content: string
  ) => void,
  editTargetNoteTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editTargetNoteContent: (
    id: string,
    folderId: string,
    itemId: string,
    content: string
  ) => void,
  editLibraryItemTitle: (
    id: string,
    folderId: string,
    itemId: string,
    title: string
  ) => void,
  editLibraryItemContent: (
    id: string,
    folderId: string,
    itemId: string,
    content: string
  ) => void,
  editTemplateItemTitle: (id: string, title: string) => void,
  editTemplateItemContent: (id: string, title: string) => void,
  editPayloadItemTitle: (id: string, title: string) => void,

  addPayloadItemData: (
    id: string,
    title: string,
    description: string,
    content: string
  ) => void,
  removePayloadItemData: (id: string, itemId: string) => void,

  doNotShowDeleteConfirmation: () => void,

  uiState: uiStateType,
  messages: messagesType,
  targets: targetType[],
  libraries: librariesType[],
  templates: templateType[],
  payloads: payloadType[]
};

class RightPanel extends React.PureComponent<Props> {
  props: Props;

  editTargetCheckitemTitle = (itemId: string, title: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editTargetCheckitemTitle(id, folderId, itemId, title);
  };

  editTargetCheckitemContent = (itemId: string, content: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editTargetCheckitemContent(id, folderId, itemId, content);
  };

  editTargetNoteTitle = (itemId: string, title: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editTargetNoteTitle(id, folderId, itemId, title);
  };

  editTargetNoteContent = (itemId: string, content: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editTargetNoteContent(id, folderId, itemId, content);
  };

  editLibraryItemTitle = (itemId: string, title: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editLibraryItemTitle(id, folderId, itemId, title);
  };

  editLibraryItemContent = (itemId: string, content: string) => {
    const { id, folderId } = this.props.uiState.menu;

    this.props.editLibraryItemContent(id, folderId, itemId, content);
  };

  getActiveChecklist = () => {
    const { targets } = this.props;
    const { id, folderId } = this.props.uiState.menu;

    return targets.find(l => l.id === id).folders.find(f => f.id === folderId)
      .checklist;
  };

  getActiveNotes = () => {
    const { targets } = this.props;
    const { id, folderId } = this.props.uiState.menu;

    return targets.find(l => l.id === id).folders.find(f => f.id === folderId)
      .notes;
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

    return libraries.find(l => l.id === id).folders.find(f => f.id === folderId)
      .checklist;
  };

  getActiveLibraryData = () => {
    const { id } = this.props.uiState.main;

    return this.getActiveLibrary().find(c => c.id === id);
  };

  render() {
    const { uiState, templates, payloads } = this.props;

    return (
      <div>
        {uiState.menu.type === 'target' &&
          uiState.main.type === 'checklistData' && (
            <ItemData
              editTitle={this.editTargetCheckitemTitle}
              editContent={this.editTargetCheckitemContent}
              item={this.getActiveChecklistData()}
            />
          )}
        {uiState.menu.type === 'target' &&
          uiState.main.type === 'noteData' && (
            <ItemData
              editTitle={this.editTargetNoteTitle}
              editContent={this.editTargetNoteContent}
              item={this.getActiveNoteData()}
            />
          )}

        {uiState.menu.type === 'library' &&
          uiState.main.type === 'libraryData' && (
            <ItemData
              editTitle={this.editLibraryItemTitle}
              editContent={this.editLibraryItemContent}
              item={this.getActiveLibraryData()}
            />
          )}
        {uiState.menu.type === 'template' &&
          uiState.main.type === 'templateData' && (
            <ItemData
              editTitle={this.props.editTemplateItemTitle}
              editContent={this.props.editTemplateItemContent}
              item={templates.find(t => t.id === uiState.main.id)}
            />
          )}
        {uiState.menu.type === 'payload' &&
          uiState.main.type === 'payloadData' && (
            <PayloadData
              addItemData={this.props.addPayloadItemData}
              renameItem={this.props.editPayloadItemTitle}
              removeItemData={this.props.removePayloadItemData}
              doNotShowDeleteConfirmation={
                this.props.doNotShowDeleteConfirmation
              }
              payloadData={payloads.find(p => p.id === uiState.main.id)}
              showDeleteConfirmation={
                this.props.messages.showDeleteConfirmation
              }
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
      editTargetCheckitemTitle,
      editTargetCheckitemContent,
      editTargetNoteTitle,
      editTargetNoteContent,
      editLibraryItemTitle,
      editLibraryItemContent,
      editTemplateItemTitle,
      editTemplateItemContent,
      addPayloadItemData,
      editPayloadItemTitle,
      removePayloadItemData,
      doNotShowDeleteConfirmation
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
