// @flow
import React from 'react';
import { checklistType, noteType } from '../../reducers/targets';
import MiddlePanelHeader from './MiddlePanelHeader';
import ItemList from './ItemList';
import ProgressBar from '../ProgressBar';

type Props = {
  +openChecklistData: (id?: string) => void,
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

    if (this.props.checklist.length > 0) {
      this.props.openChecklistData(this.props.checklist[0].id);
    } else {
      this.props.openChecklistData();
    }
  };

  showNotes = () => {
    this.setState({ showChecklist: false, showNotes: true });

    if (this.props.notes.length > 0) {
      this.props.openNoteData(this.props.notes[0].id);
    } else {
      this.props.openNoteData();
    }
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
          <div>
            <ItemList
              openItemData={openChecklistData}
              search={this.props.search}
              addItem={addCheckitem}
              saveItem={saveCheckitem}
              renameItem={renameCheckitem}
              checkboxState={checkitemCheckbox}
              removeItem={removeCheckitem}
              doNotShowDeleteConfirmation={
                this.props.doNotShowDeleteConfirmation
              }
              reorderItem={reorderCheckitem}
              items={checklist}
              checkbox
              main={main}
              showDeleteConfirmation={this.props.showDeleteConfirmation}
            />
            <ProgressBar
              value={checklist.filter(item => item.done).length}
              max={checklist.length}
            />
          </div>
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
