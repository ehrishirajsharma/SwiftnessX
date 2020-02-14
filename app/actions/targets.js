// @flow
import uuidv4 from 'uuid/v4';
import { targetType } from '../reducers/targets';
import { libraryType } from '../reducers/libraries';

export const ADD_TARGET = 'ADD_TARGET';
export const ADD_TARGET_FOLDER = 'ADD_TARGET_FOLDER';
export const ADD_TARGET_CHECKITEM = 'ADD_TARGET_CHECKITEM';
export const ADD_TARGET_NOTE = 'ADD_TARGET_NOTE';

export const SAVE_TARGET = 'SAVE_TARGET';
export const SAVE_TARGET_FOLDER = 'SAVE_TARGET_FOLDER';
export const SAVE_TARGET_CHECKITEM = 'SAVE_TARGET_CHECKITEM';
export const SAVE_TARGET_NOTE = 'SAVE_TARGET_NOTE';

export const EDIT_TARGET_TITLE = 'EDIT_TARGET_TITLE';
export const EDIT_TARGET_ORDER = 'EDIT_TARGET_ORDER';

export const EDIT_TARGET_FOLDER_TITLE = 'EDIT_TARGET_FOLDER_TITLE';
export const EDIT_TARGET_FOLDER_ORDER = 'EDIT_TARGET_FOLDER_ORDER';
export const EDIT_TARGET_FOLDER_COLOR = 'EDIT_TARGET_FOLDER_COLOR';

export const EDIT_TARGET_CHECKITEM_TITLE = 'EDIT_TARGET_CHECKITEM_TITLE';
export const EDIT_TARGET_CHECKITEM_CONTENT = 'EDIT_TARGET_CHECKITEM_CONTENT';
export const EDIT_TARGET_CHECKITEM_ORDER = 'EDIT_TARGET_CHECKITEM_ORDER';
export const EDIT_TARGET_CHECKITEM_CHECKBOX = 'EDIT_TARGET_CHECKITEM_CHECKBOX';
export const EDIT_TARGET_CHECKITEM_COLOR = 'EDIT_TARGET_CHECKITEM_COLOR';

export const EDIT_TARGET_NOTE_TITLE = 'EDIT_TARGET_NOTE_TITLE';
export const EDIT_TARGET_NOTE_CONTENT = 'EDIT_TARGET_NOTE_CONTENT';
export const EDIT_TARGET_NOTE_ORDER = 'EDIT_TARGET_NOTE_ORDER';
export const EDIT_TARGET_NOTE_COLOR = 'EDIT_TARGET_NOTE_COLOR';

export const REMOVE_TARGET = 'REMOVE_TARGET';
export const REMOVE_TARGET_FOLDER = 'REMOVE_TARGET_FOLDER';
export const REMOVE_TARGET_CHECKITEM = 'REMOVE_TARGET_CHECKITEM';
export const REMOVE_TARGET_NOTE = 'REMOVE_TARGET_NOTE';

export const IMPORT_TARGETS = 'IMPORT_TARGETS';

export function addTarget(library?: libraryType) {
  return {
    type: ADD_TARGET,
    payload: {
      id: uuidv4(),
      folderId: uuidv4(),
      library: library ? regenerateItem(library) : undefined
    }
  };
}

export function addTargetFolder(id: string) {
  return {
    type: ADD_TARGET_FOLDER,
    payload: {
      id,
      folderId: uuidv4()
    }
  };
}

export function addTargetCheckitem(id: string, folderId: string) {
  return {
    type: ADD_TARGET_CHECKITEM,
    payload: {
      id,
      folderId,
      checkItemId: uuidv4()
    }
  };
}

export function addTargetNote(id: string, folderId: string) {
  return {
    type: ADD_TARGET_NOTE,
    payload: {
      id,
      folderId,
      noteId: uuidv4()
    }
  };
}

export function saveTarget(id: string) {
  return {
    type: SAVE_TARGET,
    payload: {
      id
    }
  };
}

export function saveTargetFolder(id: string, folderId: string) {
  return {
    type: SAVE_TARGET_FOLDER,
    payload: {
      id,
      folderId
    }
  };
}

export function saveTargetCheckitem(
  id: string,
  folderId: string,
  itemId: string
) {
  return {
    type: SAVE_TARGET_CHECKITEM,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function saveTargetNote(id: string, folderId: string, itemId: string) {
  return {
    type: SAVE_TARGET_NOTE,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function editTargetTitle(id: string, title: string) {
  return {
    type: EDIT_TARGET_TITLE,
    payload: {
      id,
      title
    }
  };
}

export function editTargetOrder(fromIndex: number, toIndex: number) {
  return {
    type: EDIT_TARGET_ORDER,
    payload: {
      fromIndex,
      toIndex
    }
  };
}

export function editTargetFolderTitle(
  id: string,
  folderId: string,
  title: string
) {
  return {
    type: EDIT_TARGET_FOLDER_TITLE,
    payload: {
      id,
      folderId,
      title
    }
  };
}

export function editTargetFolderOrder(
  id: string,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: EDIT_TARGET_FOLDER_ORDER,
    payload: {
      id,
      fromIndex,
      toIndex
    }
  };
}

export function editTargetFolderColor(
  id: string,
  folderId: string,
  color: string
) {
  return {
    type: EDIT_TARGET_FOLDER_COLOR,
    payload: {
      id,
      folderId,
      color
    }
  };
}

export function editTargetCheckitemTitle(
  id: string,
  folderId: string,
  itemId: string,
  title: string
) {
  return {
    type: EDIT_TARGET_CHECKITEM_TITLE,
    payload: {
      id,
      folderId,
      itemId,
      title
    }
  };
}

export function editTargetCheckitemContent(
  id: string,
  folderId: string,
  itemId: string,
  content: string
) {
  return {
    type: EDIT_TARGET_CHECKITEM_CONTENT,
    payload: {
      id,
      folderId,
      itemId,
      content
    }
  };
}

export function editTargetCheckitemOrder(
  id: string,
  folderId: string,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: EDIT_TARGET_CHECKITEM_ORDER,
    payload: {
      id,
      folderId,
      fromIndex,
      toIndex
    }
  };
}

export function editTargetCheckitemCheckbox(
  id: string,
  folderId: string,
  itemId: string,
  checked: boolean
) {
  return {
    type: EDIT_TARGET_CHECKITEM_CHECKBOX,
    payload: {
      id,
      folderId,
      itemId,
      checked
    }
  };
}

export function editTargetCheckitemColor(
  id: string,
  folderId: string,
  itemId: string,
  color: string
) {
  return {
    type: EDIT_TARGET_CHECKITEM_COLOR,
    payload: {
      id,
      folderId,
      itemId,
      color
    }
  };
}

export function editTargetNoteTitle(
  id: string,
  folderId: string,
  itemId: string,
  title: string
) {
  return {
    type: EDIT_TARGET_NOTE_TITLE,
    payload: {
      id,
      folderId,
      itemId,
      title
    }
  };
}

export function editTargetNoteContent(
  id: string,
  folderId: string,
  itemId: string,
  content: string
) {
  return {
    type: EDIT_TARGET_NOTE_CONTENT,
    payload: {
      id,
      folderId,
      itemId,
      content
    }
  };
}

export function editTargetNoteOrder(
  id: string,
  folderId: string,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: EDIT_TARGET_NOTE_ORDER,
    payload: {
      id,
      folderId,
      fromIndex,
      toIndex
    }
  };
}

export function editTargetNoteColor(
  id: string,
  folderId: string,
  itemId: string,
  color: string
) {
  return {
    type: EDIT_TARGET_NOTE_COLOR,
    payload: {
      id,
      folderId,
      itemId,
      color
    }
  };
}

export function removeTarget(id: string) {
  return {
    type: REMOVE_TARGET,
    payload: {
      id
    }
  };
}

export function removeTargetFolder(id: string, folderId: string) {
  return {
    type: REMOVE_TARGET_FOLDER,
    payload: {
      id,
      folderId
    }
  };
}

export function removeTargetCheckitem(
  id: string,
  folderId: string,
  itemId: string
) {
  return {
    type: REMOVE_TARGET_CHECKITEM,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function removeTargetNote(id: string, folderId: string, itemId: string) {
  return {
    type: REMOVE_TARGET_NOTE,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function importTargets(targets: targetType[]) {
  return {
    type: IMPORT_TARGETS,
    payload: {
      targets: regenerateItems(targets)
    }
  };
}

function regenerateItems(targets: targetType[]) {
  return targets.map(regenerateItem);
}

function regenerateItem(target: targetType) {
  const newTarget = { ...target };

  newTarget.id = uuidv4();
  newTarget.folders = target.folders.map(folder => {
    const newFolder = { ...folder };

    newFolder.id = uuidv4();

    const { checklist } = folder;
    if (checklist) {
      newFolder.checklist = checklist.map(item => {
        const newItem = { ...item };

        newItem.id = uuidv4();

        return newItem;
      });
    }

    const { notes } = folder;
    if (notes) {
      newFolder.notes = notes.map(item => {
        const newItem = { ...item };

        newItem.id = uuidv4();

        return newItem;
      });
    }

    return newFolder;
  });

  return newTarget;
}
