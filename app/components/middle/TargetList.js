// @flow
import React from 'react';
import { checklistType, noteType } from '../../reducers/targets';
import MiddlePanelHeader from './MiddlePanelHeader';
import ItemList from './ItemList';

type Props = {
  +openChecklistData: (id: string) => void,
  +openNoteData: (id: string) => void,
  search: (query: string) => void,
  +addCheckitem: () => void,
  +addNote: () => void,
  +saveCheckitem: (id: string) => void,
  +saveNote: (id: string) => void,
  +renameCheckitem: (id: string, title: string) => void,
  +renameNote: (id: string, title: string) => void,
  +checkitemCheckbox: (id: string) => void,
  +removeCheckitem: (id: string) => void,
  +removeNote: (id: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +reorderCheckitem: (fromIndex: number, toIndex: number) => void,
  +reorderNote: (fromIndex: number, toIndex: number) => void,
  +checklist: checklistType[],
  +notes: noteType[],
  +main: {
    id: string | undefined
  },
  +showDeleteConfirmation: boolean
};

class TargetList extends React.PureComponent<Props> {
  props: Props;

  state = {
    showChecklist: true,
    showNotes: false
  };

  showChecklist = () => {
    this.setState({ showChecklist: true, showNotes: false });
  };

  showNotes = () => {
    this.setState({ showChecklist: false, showNotes: true });
  };

  render() {
    const {
      openChecklistData,
      openNoteData,
      addCheckitem,
      addNote,
      saveCheckitem,
      saveNote,
      renameCheckitem,
      renameNote,
      checkitemCheckbox,
      removeCheckitem,
      removeNote,
      reorderCheckitem,
      reorderNote,
      checklist,
      notes,
      main
    } = this.props;
    const { showChecklist, showNotes } = this.state;

    return (
      <div>
        <MiddlePanelHeader
          showChecklist={this.showChecklist}
          showNotes={this.showNotes}
        />
        {showChecklist && (
          <ItemList
            openItemData={openChecklistData}
            search={this.props.search}
            addItem={addCheckitem}
            saveItem={saveCheckitem}
            renameItem={renameCheckitem}
            checkboxState={checkitemCheckbox}
            removeItem={removeCheckitem}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderItem={reorderCheckitem}
            items={checklist}
            checkbox
            main={main}
            showDeleteConfirmation={this.props.showDeleteConfirmation}
          />
        )}
        {showNotes && (
          <ItemList
            openItemData={openNoteData}
            addItem={addNote}
            saveItem={saveNote}
            renameItem={renameNote}
            removeItem={removeNote}
            doNotShowDeleteConfirmation={this.props.doNotShowDeleteConfirmation}
            reorderItem={reorderNote}
            items={notes}
            main={main}
            showDeleteConfirmation={this.props.showDeleteConfirmation}
          />
        )}
      </div>
    );
  }
}

export default TargetList;
