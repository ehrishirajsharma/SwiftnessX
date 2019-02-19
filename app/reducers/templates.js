// @flow
import {
  ADD_TEMPLATE_ITEM,
  SAVE_TEMPLATE_ITEM,
  EDIT_TEMPLATE_ITEM_TITLE,
  EDIT_TEMPLATE_ITEM_CONTENT,
  EDIT_TEMPLATE_ITEM_ORDER,
  EDIT_TEMPLATE_ITEM_COLOR,
  REMOVE_TEMPLATE_ITEM,
  IMPORT_TEMPLATES
} from '../actions/templates';

export type templateType = {
  +id: string,
  +title: string,
  +content: string,
  +isNew?: boolean,
  +color?: string
};

type actionType = {
  +type: string,
  +payload?: {}
};

export default function templates(
  state: templateType[] = [],
  action: actionType
) {
  switch (action.type) {
    case ADD_TEMPLATE_ITEM:
      return state.concat({
        id: action.payload.id,
        title: 'New Template',
        content: '',
        isNew: true
      });
    case REMOVE_TEMPLATE_ITEM: {
      const index = state.findIndex(item => item.id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length)
      ];
    }
    case IMPORT_TEMPLATES: {
      return state.concat(action.payload.templates);
    }
    case EDIT_TEMPLATE_ITEM_ORDER: {
      const result = [...state];
      const [removed] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, removed);

      return result;
    }
    case SAVE_TEMPLATE_ITEM:
    case EDIT_TEMPLATE_ITEM_TITLE:
    case EDIT_TEMPLATE_ITEM_CONTENT:
    case EDIT_TEMPLATE_ITEM_COLOR: {
      const index = state.findIndex(item => item.id === action.payload.id);

      return [
        ...state.slice(0, index),
        editItem(state[index], action),
        ...state.slice(index + 1, state.length)
      ];
    }
    default:
      return state;
  }
}

function editItem(state = {}, action: actionType) {
  switch (action.type) {
    case SAVE_TEMPLATE_ITEM: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_TEMPLATE_ITEM_TITLE:
      return {
        ...state,
        title: action.payload.title
      };
    case EDIT_TEMPLATE_ITEM_CONTENT:
      return {
        ...state,
        content: action.payload.content
      };
    case EDIT_TEMPLATE_ITEM_COLOR:
      return {
        ...state,
        color: action.payload.color
      };
    default:
      return state;
  }
}
