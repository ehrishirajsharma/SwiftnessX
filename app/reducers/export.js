// @flow
import { OPEN_EXPORT, CLOSE_EXPORT } from '../actions/export';

export type exportType = {
  +open: boolean
};

type actionType = {
  +type: string
};

export default function open(state: boolean = false, action: actionType) {
  switch (action.type) {
    case OPEN_EXPORT:
      return true;
    case CLOSE_EXPORT:
      return false;
    default:
      return state;
  }
}
