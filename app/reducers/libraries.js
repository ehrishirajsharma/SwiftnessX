// @flow
import {
  ADD_LIBRARY,
  ADD_LIBRARY_FOLDER,
  ADD_LIBRARY_ITEM,
  SAVE_LIBRARY,
  SAVE_LIBRARY_FOLDER,
  SAVE_LIBRARY_ITEM,
  EDIT_LIBRARY_TITLE,
  EDIT_LIBRARY_ORDER,
  EDIT_LIBRARY_COLOR,
  EDIT_LIBRARY_FOLDER_TITLE,
  EDIT_LIBRARY_FOLDER_ORDER,
  EDIT_LIBRARY_ITEM_TITLE,
  EDIT_LIBRARY_ITEM_CONTENT,
  EDIT_LIBRARY_ITEM_ORDER,
  EDIT_LIBRARY_ITEM_COLOR,
  REMOVE_LIBRARY,
  REMOVE_LIBRARY_FOLDER,
  REMOVE_LIBRARY_ITEM,
  IMPORT_LIBRARIES
} from '../actions/libraries';

export type checklistType = {
  +id: string,
  +title: string,
  +content: string,
  +color?: string,
  +isNew?: boolean
};

export type libraryType = {
  +id: string,
  +title: string,
  +folders: {
    +id: string,
    +title: string,
    +checklist: checklistType[],
    +isNew?: boolean
  }[],
  +color?: string,
  +isNew?: boolean
};

type actionType = {
  +type: string,
  +payload?: {}
};

export default function libraries(
  state: libraryType[] = [],
  action: actionType
) {
  switch (action.type) {
    case ADD_LIBRARY:
      return state.concat({
        id: action.payload.id,
        title: 'New Library',
        folders: [
          {
            id: action.payload.folderId,
            title: 'New Folder',
            checklist: [],
            isNew: true
          }
        ],
        isNew: true
      });
    case REMOVE_LIBRARY: {
      const index = state.findIndex(l => l.id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length)
      ];
    }
    case EDIT_LIBRARY_ORDER: {
      const result = [...state];
      const [item] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, item);

      return result;
    }
    case IMPORT_LIBRARIES: {
      return state.concat(action.payload.libraries);
    }
    case ADD_LIBRARY_FOLDER:
    case ADD_LIBRARY_ITEM:
    case SAVE_LIBRARY:
    case SAVE_LIBRARY_FOLDER:
    case SAVE_LIBRARY_ITEM:
    case EDIT_LIBRARY_TITLE:
    case EDIT_LIBRARY_COLOR:
    case EDIT_LIBRARY_FOLDER_TITLE:
    case EDIT_LIBRARY_FOLDER_ORDER:
    case EDIT_LIBRARY_ITEM_TITLE:
    case EDIT_LIBRARY_ITEM_CONTENT:
    case EDIT_LIBRARY_ITEM_ORDER:
    case EDIT_LIBRARY_ITEM_COLOR:
    case REMOVE_LIBRARY_FOLDER:
    case REMOVE_LIBRARY_ITEM: {
      const index = state.findIndex(l => l.id === action.payload.id);

      return modify(state, action, index, editLibrary);
    }
    default:
      return state;
  }
}

function editLibrary(state = {}, action) {
  switch (action.type) {
    case ADD_LIBRARY_FOLDER: {
      return {
        ...state,
        folders: state.folders.concat({
          id: action.payload.folderId,
          title: 'New Folder',
          checklist: [],
          isNew: true
        })
      };
    }
    case SAVE_LIBRARY: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_LIBRARY_TITLE: {
      return {
        ...state,
        title: action.payload.title
      };
    }
    case EDIT_LIBRARY_COLOR: {
      return {
        ...state,
        color: action.payload.color
      };
    }
    case EDIT_LIBRARY_FOLDER_ORDER: {
      const newFoldersOrder = [...state.folders];
      const [folder] = newFoldersOrder.splice(action.payload.fromIndex, 1);
      newFoldersOrder.splice(action.payload.toIndex, 0, folder);

      return {
        ...state,
        folders: newFoldersOrder
      };
    }
    case REMOVE_LIBRARY_FOLDER: {
      const index = state.folders.findIndex(
        f => f.id === action.payload.folderId
      );

      return {
        ...state,
        folders: [
          ...state.folders.slice(0, index),
          ...state.folders.slice(index + 1, state.folders.length)
        ]
      };
    }
    case ADD_LIBRARY_ITEM:
    case SAVE_LIBRARY_FOLDER:
    case SAVE_LIBRARY_ITEM:
    case EDIT_LIBRARY_FOLDER_TITLE:
    case EDIT_LIBRARY_ITEM_TITLE:
    case EDIT_LIBRARY_ITEM_CONTENT:
    case EDIT_LIBRARY_ITEM_ORDER:
    case EDIT_LIBRARY_ITEM_COLOR:
    case REMOVE_LIBRARY_ITEM: {
      const index = state.folders.findIndex(
        f => f.id === action.payload.folderId
      );

      return {
        ...state,
        folders: modify(state.folders, action, index, editLibraryFolder)
      };
    }
    default:
      return state;
  }
}

function editLibraryFolder(state = {}, action) {
  switch (action.type) {
    case ADD_LIBRARY_ITEM:
      return {
        ...state,
        checklist: state.checklist.concat({
          id: action.payload.itemId,
          title: 'New List Item',
          content: '',
          isNew: true
        })
      };
    case SAVE_LIBRARY_FOLDER: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_LIBRARY_FOLDER_TITLE: {
      return {
        ...state,
        title: action.payload.title
      };
    }
    case REMOVE_LIBRARY_ITEM: {
      const index = state.checklist.findIndex(
        f => f.id === action.payload.itemId
      );

      return {
        ...state,
        checklist: [
          ...state.checklist.slice(0, index),
          ...state.checklist.slice(index + 1, state.checklist.length)
        ]
      };
    }
    case EDIT_LIBRARY_ITEM_ORDER: {
      const result = [...state.checklist];
      const [removed] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, removed);

      return {
        ...state,
        checklist: result
      };
    }
    case SAVE_LIBRARY_ITEM:
    case EDIT_LIBRARY_ITEM_TITLE:
    case EDIT_LIBRARY_ITEM_CONTENT:
    case EDIT_LIBRARY_ITEM_COLOR: {
      const index = state.checklist.findIndex(
        f => f.id === action.payload.itemId
      );

      return {
        ...state,
        checklist: modify(state.checklist, action, index, editLibraryItem)
      };
    }
    default:
      return state;
  }
}

function editLibraryItem(state = {}, action) {
  switch (action.type) {
    case SAVE_LIBRARY_ITEM: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_LIBRARY_ITEM_TITLE:
      return {
        ...state,
        title: action.payload.title
      };
    case EDIT_LIBRARY_ITEM_CONTENT:
      return {
        ...state,
        content: action.payload.content
      };
    case EDIT_LIBRARY_ITEM_COLOR:
      return {
        ...state,
        color: action.payload.color
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
