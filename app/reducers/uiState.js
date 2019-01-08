// @flow
import {
  OPEN_TARGET,
  OPEN_LIBRARY,
  OPEN_TEMPLATE,
  OPEN_PAYLOAD,
  OPEN_CHECKLIST_DATA,
  OPEN_NOTE_DATA,
  OPEN_LIBRARY_DATA,
  OPEN_TEMPLATE_DATA,
  OPEN_PAYLOAD_DATA,
  CLOSE_LIST,
  CLOSE_ITEM_DATA,
  SEARCH
} from '../actions/uiState';

type menuType = {
  +type: string,
  +id?: string,
  +folderId?: string
};

type mainType = {
  +type: string,
  +id?: string
};

export type uiStateType = {
  +menu: menuType,
  +main: mainType,
  +search: string,
  +active: string
};

type actionType = {
  +type: string,
  +payload?: {}
};

export default function uiState(
  state: uiStateType = {
    menu: {
      type: 'undefined'
    },
    main: {
      type: 'undefined'
    },
    search: '',
    active: ''
  },
  action: actionType
) {
  switch (action.type) {
    case OPEN_TARGET:
    case OPEN_LIBRARY: {
      if (
        action.payload.id !== state.menu.id ||
        action.payload.folderId !== state.menu.folderId
      ) {
        return {
          ...state,
          menu: menu(state.menu, action),
          main: { type: 'undefined' },
          active: 'menu'
        };
      }

      return state;
    }
    case OPEN_TEMPLATE: {
      if (state.menu.type !== 'template') {
        return {
          ...state,
          menu: menu(state.menu, action),
          main: { type: 'undefined' },
          active: 'menu'
        };
      }

      return state;
    }
    case OPEN_PAYLOAD: {
      if (state.menu.type !== 'payload') {
        return {
          ...state,
          menu: menu(state.menu, action),
          main: { type: 'undefined' },
          active: 'menu'
        };
      }

      return state;
    }
    case OPEN_CHECKLIST_DATA:
    case OPEN_NOTE_DATA:
    case OPEN_LIBRARY_DATA:
    case OPEN_TEMPLATE_DATA:
    case OPEN_PAYLOAD_DATA: {
      return {
        ...state,
        main: main(state.main, action),
        active: action.payload.auto ? state.active : 'list'
      };
    }
    case CLOSE_LIST:
      return {
        ...state,
        menu: { type: 'undefined' },
        main: { type: 'undefined' },
        active: 'menu'
      };
    case CLOSE_ITEM_DATA:
      return {
        ...state,
        main: { type: 'undefined' },
        active: 'list'
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload.query
      };
    default:
      return state;
  }
}

function menu(state: menuType = {}, action: actionType) {
  switch (action.type) {
    case OPEN_TARGET:
      return {
        type: 'target',
        id: action.payload.id,
        folderId: action.payload.folderId
      };
    case OPEN_LIBRARY:
      return {
        type: 'library',
        id: action.payload.id,
        folderId: action.payload.folderId
      };
    case OPEN_TEMPLATE:
      return {
        type: 'template'
      };
    case OPEN_PAYLOAD:
      return {
        type: 'payload'
      };
    default:
      return state;
  }
}

function main(state: mainType = {}, action: actionType) {
  switch (action.type) {
    case OPEN_CHECKLIST_DATA:
      return {
        type: 'checklistData',
        id: action.payload.id
      };
    case OPEN_NOTE_DATA:
      return {
        type: 'noteData',
        id: action.payload.id
      };
    case OPEN_LIBRARY_DATA:
      return {
        type: 'libraryData',
        id: action.payload.id
      };
    case OPEN_TEMPLATE_DATA:
      return {
        type: 'templateData',
        id: action.payload.id
      };
    case OPEN_PAYLOAD_DATA:
      return {
        type: 'payloadData',
        id: action.payload.id
      };
    default:
      return state;
  }
}
