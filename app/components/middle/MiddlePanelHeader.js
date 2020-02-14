// @flow
import React from 'react';
import className from 'classnames';
import styles from '../css/MiddlePanelHeader.css';
import ChecklistIcon from '../../assets/icons/ChecklistIcon';
import NotesIcon from '../../assets/icons/NotesIcon';

type Props = {
  showChecklist: () => void,
  showNotes: () => void
};

export default class MiddlePanelHeader extends React.PureComponent<Props> {
  props: Props;

  state = {
    checklistSelected: true,
    notesSelected: false
  };

  onChecklistClick = () => {
    this.setState({ checklistSelected: true, notesSelected: false });
    this.props.showChecklist();
  };

  onNotesClick = () => {
    this.setState({ checklistSelected: false, notesSelected: true });
    this.props.showNotes();
  };

  render() {
    return (
      <div className={styles.middlePanelDataHeader}>
        <div
          className={className(styles.checklistListHeader, {
            [`${styles.selected}`]: this.state.checklistSelected
          })}
          onClick={this.onChecklistClick}
          onKeyPress={this.onChecklistClick}
          role="menuitem"
          tabIndex={0}
        >
          <ChecklistIcon />
          <span>Checklist</span>
        </div>
        <div
          className={className(styles.notesListHeader, {
            [`${styles.selected}`]: this.state.notesSelected
          })}
          onClick={this.onNotesClick}
          onKeyPress={this.onNotesClick}
          role="menuitem"
          tabIndex={0}
        >
          <NotesIcon />
          <span>Notes</span>
        </div>
      </div>
    );
  }
}
