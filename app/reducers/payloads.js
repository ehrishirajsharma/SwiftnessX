// @flow
import {
  ADD_PAYLOAD_ITEM,
  ADD_PAYLOAD_ITEM_DATA,
  SAVE_PAYLOAD_ITEM,
  EDIT_PAYLOAD_ITEM_TITLE,
  EDIT_PAYLOAD_ITEM_ORDER,
  REMOVE_PAYLOAD_ITEM,
  REMOVE_PAYLOAD_ITEM_DATA,
  IMPORT_PAYLOADS
} from '../actions/payloads';

export type payloadDataType = {
  +id: string,
  +title: string,
  +description: string,
  +content: string
};

export type payloadType = {
  +id: string,
  +title: string,
  +data: payloadDataType[],
  +isNew?: boolean
};

type actionType = {
  +type: string,
  +payload?: {}
};

export default function payloads(
  state: payloadType[] = [],
  action: actionType
) {
  switch (action.type) {
    case ADD_PAYLOAD_ITEM:
      return state.concat({
        id: action.payload.id,
        title: 'New Payload',
        data: [],
        isNew: true
      });
    case REMOVE_PAYLOAD_ITEM: {
      const index = state.findIndex(p => p.id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length)
      ];
    }
    case IMPORT_PAYLOADS: {
      return state.concat(action.payload.payloads);
    }
    case EDIT_PAYLOAD_ITEM_ORDER: {
      const result = [...state];
      const [removed] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, removed);

      return result;
    }
    case ADD_PAYLOAD_ITEM_DATA:
    case SAVE_PAYLOAD_ITEM:
    case EDIT_PAYLOAD_ITEM_TITLE:
    case REMOVE_PAYLOAD_ITEM_DATA: {
      const index = state.findIndex(p => p.id === action.payload.id);

      return modify(state, action, index, editPayload);
    }
    default:
      return state;
  }
}

function editPayload(state = {}, action: actionType) {
  switch (action.type) {
    case ADD_PAYLOAD_ITEM_DATA: {
      const { itemId, title, description, content } = action.payload;

      return {
        ...state,
        data: state.data.concat({ id: itemId, title, description, content })
      };
    }
    case SAVE_PAYLOAD_ITEM: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case REMOVE_PAYLOAD_ITEM_DATA: {
      const index = state.data.findIndex(p => p.id === action.payload.itemId);

      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1, state.data.length)
        ]
      };
    }
    case EDIT_PAYLOAD_ITEM_TITLE:
      return {
        ...state,
        title: action.payload.title
      };
    default:
      return state;
  }
}

function modify(
  state = [],
  action: actionType,
  index: number,
  reducer: (item: {}, action: actionType) => void
) {
  return [
    ...state.slice(0, index),
    reducer(state[index], action),
    ...state.slice(index + 1, state.length)
  ];
}
