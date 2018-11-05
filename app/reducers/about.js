// @flow
import { OPEN_ABOUT, CLOSE_ABOUT } from '../actions/about';

export type aboutType = boolean;

type actionType = {
  +type: string
};

export default function aboutOpen(state: boolean = false, action: actionType) {
  switch (action.type) {
    case OPEN_ABOUT:
      return true;
    case CLOSE_ABOUT:
      return false;
    default:
      return state;
  }
}
