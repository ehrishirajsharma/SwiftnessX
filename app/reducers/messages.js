// @flow
import { DO_NOT_SHOW_DELETE_CONFIRMATION } from '../actions/messages';

export type messagesType = {
  +showDeleteConfirmation: boolean
};

type actionType = {
  +type: string
};

export default function aboutOpen(
  state: messagesType = { showDeleteConfirmation: true },
  action: actionType
) {
  switch (action.type) {
    case DO_NOT_SHOW_DELETE_CONFIRMATION:
      return {
        showDeleteConfirmation: false
      };
    default:
      return state;
  }
}
