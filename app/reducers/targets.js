// @flow
import {
  ADD_TARGET,
  ADD_TARGET_FOLDER,
  ADD_TARGET_CHECKITEM,
  ADD_TARGET_NOTE,
  SAVE_TARGET,
  SAVE_TARGET_FOLDER,
  SAVE_TARGET_CHECKITEM,
  SAVE_TARGET_NOTE,
  EDIT_TARGET_TITLE,
  EDIT_TARGET_ORDER,
  EDIT_TARGET_FOLDER_TITLE,
  EDIT_TARGET_FOLDER_ORDER,
  EDIT_TARGET_CHECKITEM_TITLE,
  EDIT_TARGET_CHECKITEM_CONTENT,
  EDIT_TARGET_CHECKITEM_ORDER,
  EDIT_TARGET_CHECKITEM_CHECKBOX,
  EDIT_TARGET_NOTE_TITLE,
  EDIT_TARGET_NOTE_CONTENT,
  EDIT_TARGET_NOTE_ORDER,
  REMOVE_TARGET,
  REMOVE_TARGET_FOLDER,
  REMOVE_TARGET_CHECKITEM,
  REMOVE_TARGET_NOTE,
  IMPORT_TARGETS
} from '../actions/targets';

export type checklistType = {
  +id: string,
  +title: string,
  +content: string,
  +done?: boolean,
  +isNew?: boolean
};

export type noteType = {
  +id: string,
  +title: string,
  +content: string,
  +isNew?: boolean
};

export type targetType = {
  +id: string,
  +title: string,
  +folders: {
    +id: string,
    +title: string,
    +checklist: checklistType[],
    +notes?: noteType[],
    +isNew?: boolean
  }[],
  +isNew?: boolean
};

type actionType = {
  +type: string,
  +payload?: {}
};

export default function targets(state: targetType[] = [], action: actionType) {
  switch (action.type) {
    case ADD_TARGET: {
      if (action.payload.library) {
        const newTargetFolders = action.payload.library.folders.map(folder => {
          const newFolder = folder;
          newFolder.notes = [];
          return newFolder;
        });

        return state.concat({
          id: action.payload.id,
          title: action.payload.library.title,
          folders: newTargetFolders,
          isNew: true
        });
      }

      return state.concat({
        id: action.payload.id,
        title: 'New Target',
        folders: [
          {
            id: action.payload.folderId,
            title: 'New Folder',
            checklist: [],
            notes: [],
            isNew: true
          }
        ],
        isNew: true
      });
    }
    case REMOVE_TARGET: {
      const index = state.findIndex(l => l.id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length)
      ];
    }
    case EDIT_TARGET_ORDER: {
      const result = [...state];
      const [item] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, item);

      return result;
    }
    case IMPORT_TARGETS: {
      return state.concat(action.payload.targets);
    }
    case ADD_TARGET_FOLDER:
    case ADD_TARGET_CHECKITEM:
    case ADD_TARGET_NOTE:
    case SAVE_TARGET:
    case SAVE_TARGET_FOLDER:
    case SAVE_TARGET_CHECKITEM:
    case SAVE_TARGET_NOTE:
    case EDIT_TARGET_TITLE:
    case EDIT_TARGET_FOLDER_TITLE:
    case EDIT_TARGET_FOLDER_ORDER:
    case EDIT_TARGET_CHECKITEM_TITLE:
    case EDIT_TARGET_CHECKITEM_CONTENT:
    case EDIT_TARGET_CHECKITEM_ORDER:
    case EDIT_TARGET_CHECKITEM_CHECKBOX:
    case EDIT_TARGET_NOTE_TITLE:
    case EDIT_TARGET_NOTE_CONTENT:
    case EDIT_TARGET_NOTE_ORDER:
    case REMOVE_TARGET_FOLDER:
    case REMOVE_TARGET_CHECKITEM:
    case REMOVE_TARGET_NOTE: {
      const index = state.findIndex(l => l.id === action.payload.id);

      return modify(state, action, index, editTarget);
    }
    default:
      return state;
  }
}

function editTarget(state = {}, action) {
  switch (action.type) {
    case ADD_TARGET_FOLDER: {
      return {
        ...state,
        folders: state.folders.concat({
          id: action.payload.folderId,
          title: 'New Folder',
          checklist: [],
          notes: [],
          isNew: true
        })
      };
    }
    case SAVE_TARGET: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_TARGET_TITLE: {
      return {
        ...state,
        title: action.payload.title
      };
    }
    case EDIT_TARGET_FOLDER_ORDER: {
      const newFoldersOrder = [...state.folders];
      const [folder] = newFoldersOrder.splice(action.payload.fromIndex, 1);
      newFoldersOrder.splice(action.payload.toIndex, 0, folder);

      return {
        ...state,
        folders: newFoldersOrder
      };
    }
    case REMOVE_TARGET_FOLDER: {
      const index = state.folders.findIndex(
        f => f.id === action.payload.folderId
      );

      return {
        ...state,
        folders: [
          ...state.folders.slice(0, index),
          ...state.folders.slice(index + 1, state.length)
        ]
      };
    }
    case ADD_TARGET_CHECKITEM:
    case ADD_TARGET_NOTE:
    case SAVE_TARGET_FOLDER:
    case SAVE_TARGET_CHECKITEM:
    case SAVE_TARGET_NOTE:
    case EDIT_TARGET_FOLDER_TITLE:
    case EDIT_TARGET_CHECKITEM_TITLE:
    case EDIT_TARGET_CHECKITEM_CONTENT:
    case EDIT_TARGET_CHECKITEM_ORDER:
    case EDIT_TARGET_CHECKITEM_CHECKBOX:
    case EDIT_TARGET_NOTE_TITLE:
    case EDIT_TARGET_NOTE_CONTENT:
    case EDIT_TARGET_NOTE_ORDER:
    case REMOVE_TARGET_CHECKITEM:
    case REMOVE_TARGET_NOTE: {
      const index = state.folders.findIndex(
        f => f.id === action.payload.folderId
      );

      return {
        ...state,
        folders: modify(state.folders, action, index, editTargetFolder)
      };
    }
    default:
      return state;
  }
}

function editTargetFolder(state = {}, action) {
  switch (action.type) {
    case ADD_TARGET_CHECKITEM:
      return {
        ...state,
        checklist: state.checklist.concat({
          id: action.payload.checkItemId,
          title: 'New List Item',
          content: '',
          isNew: true
        })
      };
    case ADD_TARGET_NOTE:
      return {
        ...state,
        notes: state.notes.concat({
          id: action.payload.noteId,
          title: 'New Note',
          content: '',
          isNew: true
        })
      };
    case SAVE_TARGET_FOLDER: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_TARGET_FOLDER_TITLE: {
      return {
        ...state,
        title: action.payload.title
      };
    }
    case REMOVE_TARGET_CHECKITEM: {
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
    case REMOVE_TARGET_NOTE: {
      const index = state.notes.findIndex(f => f.id === action.payload.itemId);

      return {
        ...state,
        notes: [
          ...state.notes.slice(0, index),
          ...state.notes.slice(index + 1, state.notes.length)
        ]
      };
    }
    case EDIT_TARGET_CHECKITEM_ORDER: {
      const result = [...state.checklist];
      const [removed] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, removed);

      return {
        ...state,
        checklist: result
      };
    }
    case EDIT_TARGET_NOTE_ORDER: {
      const result = [...state.notes];
      const [removed] = result.splice(action.payload.fromIndex, 1);
      result.splice(action.payload.toIndex, 0, removed);

      return {
        ...state,
        notes: result
      };
    }
    case SAVE_TARGET_CHECKITEM:
    case EDIT_TARGET_CHECKITEM_TITLE:
    case EDIT_TARGET_CHECKITEM_CONTENT:
    case EDIT_TARGET_CHECKITEM_CHECKBOX: {
      const index = state.checklist.findIndex(
        f => f.id === action.payload.itemId
      );

      return {
        ...state,
        checklist: modify(state.checklist, action, index, editTargetItem)
      };
    }
    case SAVE_TARGET_NOTE:
    case EDIT_TARGET_NOTE_TITLE:
    case EDIT_TARGET_NOTE_CONTENT: {
      const index = state.notes.findIndex(f => f.id === action.payload.itemId);

      return {
        ...state,
        notes: modify(state.notes, action, index, editTargetItem)
      };
    }
    default:
      return state;
  }
}

function editTargetItem(state = {}, action) {
  switch (action.type) {
    case SAVE_TARGET_CHECKITEM:
    case SAVE_TARGET_NOTE: {
      const { isNew, ...newState } = state;

      return newState;
    }
    case EDIT_TARGET_CHECKITEM_TITLE:
    case EDIT_TARGET_NOTE_TITLE:
      return {
        ...state,
        title: action.payload.title
      };
    case EDIT_TARGET_CHECKITEM_CONTENT:
    case EDIT_TARGET_NOTE_CONTENT:
      return {
        ...state,
        content: action.payload.content
      };
    case EDIT_TARGET_CHECKITEM_CHECKBOX:
      return {
        ...state,
        done: action.payload.checked
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
