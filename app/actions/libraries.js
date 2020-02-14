// @flow
import uuidv4 from 'uuid/v4';
import { libraryType } from '../reducers/libraries';

export const ADD_LIBRARY = 'ADD_LIBRARY';
export const ADD_LIBRARY_FOLDER = 'ADD_LIBRARY_FOLDER';
export const ADD_LIBRARY_ITEM = 'ADD_LIBRARY_ITEM';

export const SAVE_LIBRARY = 'SAVE_LIBRARY';
export const SAVE_LIBRARY_FOLDER = 'SAVE_LIBRARY_FOLDER';
export const SAVE_LIBRARY_ITEM = 'SAVE_LIBRARY_ITEM';

export const EDIT_LIBRARY_TITLE = 'EDIT_LIBRARY_TITLE';
export const EDIT_LIBRARY_ORDER = 'EDIT_LIBRARY_ORDER';
export const EDIT_LIBRARY_COLOR = 'EDIT_LIBRARY_COLOR';

export const EDIT_LIBRARY_FOLDER_TITLE = 'EDIT_LIBRARY_FOLDER_TITLE';
export const EDIT_LIBRARY_FOLDER_ORDER = 'EDIT_LIBRARY_FOLDER_ORDER';

export const EDIT_LIBRARY_ITEM_TITLE = 'EDIT_LIBRARY_ITEM_TITLE';
export const EDIT_LIBRARY_ITEM_CONTENT = 'EDIT_LIBRARY_ITEM_CONTENT';
export const EDIT_LIBRARY_ITEM_ORDER = 'EDIT_LIBRARY_ITEM_ORDER';
export const EDIT_LIBRARY_ITEM_COLOR = 'EDIT_LIBRARY_ITEM_COLOR';

export const REMOVE_LIBRARY = 'REMOVE_LIBRARY';
export const REMOVE_LIBRARY_FOLDER = 'REMOVE_LIBRARY_FOLDER';
export const REMOVE_LIBRARY_ITEM = 'REMOVE_LIBRARY_ITEM';

export const IMPORT_LIBRARIES = 'IMPORT_LIBRARIES';

export function addLibrary() {
  return {
    type: ADD_LIBRARY,
    payload: {
      id: uuidv4(),
      folderId: uuidv4()
    }
  };
}

export function addLibraryFolder(id: string) {
  return {
    type: ADD_LIBRARY_FOLDER,
    payload: {
      id,
      folderId: uuidv4()
    }
  };
}

export function addLibraryItem(id: string, folderId: string) {
  return {
    type: ADD_LIBRARY_ITEM,
    payload: {
      id,
      folderId,
      itemId: uuidv4()
    }
  };
}

export function saveLibrary(id: string) {
  return {
    type: SAVE_LIBRARY,
    payload: {
      id
    }
  };
}

export function saveLibraryFolder(id: string, folderId: string) {
  return {
    type: SAVE_LIBRARY_FOLDER,
    payload: {
      id,
      folderId
    }
  };
}

export function saveLibraryItem(id: string, folderId: string, itemId: string) {
  return {
    type: SAVE_LIBRARY_ITEM,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function editLibraryTitle(id: string, title: string) {
  return {
    type: EDIT_LIBRARY_TITLE,
    payload: {
      id,
      title
    }
  };
}

export function editLibraryOrder(fromIndex: number, toIndex: number) {
  return {
    type: EDIT_LIBRARY_ORDER,
    payload: {
      fromIndex,
      toIndex
    }
  };
}

export function editLibraryColor(id: string, color: string) {
  return {
    type: EDIT_LIBRARY_COLOR,
    payload: {
      id,
      color
    }
  };
}

export function editLibraryFolderTitle(
  id: string,
  folderId: string,
  title: string
) {
  return {
    type: EDIT_LIBRARY_FOLDER_TITLE,
    payload: {
      id,
      folderId,
      title
    }
  };
}

export function editLibraryFolderOrder(
  id: string,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: EDIT_LIBRARY_FOLDER_ORDER,
    payload: {
      id,
      fromIndex,
      toIndex
    }
  };
}

export function editLibraryItemTitle(
  id: string,
  folderId: string,
  itemId: string,
  title: string
) {
  return {
    type: EDIT_LIBRARY_ITEM_TITLE,
    payload: {
      id,
      folderId,
      itemId,
      title
    }
  };
}

export function editLibraryItemContent(
  id: string,
  folderId: string,
  itemId,
  content: string
) {
  return {
    type: EDIT_LIBRARY_ITEM_CONTENT,
    payload: {
      id,
      folderId,
      itemId,
      content
    }
  };
}

export function editLibraryItemOrder(
  id: string,
  folderId: string,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: EDIT_LIBRARY_ITEM_ORDER,
    payload: {
      id,
      folderId,
      fromIndex,
      toIndex
    }
  };
}

export function editLibraryItemColor(
  id: string,
  folderId: string,
  itemId: string,
  color: string
) {
  return {
    type: EDIT_LIBRARY_ITEM_COLOR,
    payload: {
      id,
      folderId,
      itemId,
      color
    }
  };
}

export function removeLibrary(id: string) {
  return {
    type: REMOVE_LIBRARY,
    payload: {
      id
    }
  };
}

export function removeLibraryFolder(id: string, folderId: string) {
  return {
    type: REMOVE_LIBRARY_FOLDER,
    payload: {
      id,
      folderId
    }
  };
}

export function removeLibraryItem(
  id: string,
  folderId: string,
  itemId: string
) {
  return {
    type: REMOVE_LIBRARY_ITEM,
    payload: {
      id,
      folderId,
      itemId
    }
  };
}

export function importLibraries(libraries: libraryType[]) {
  return {
    type: IMPORT_LIBRARIES,
    payload: {
      libraries: regenerateIds(libraries)
    }
  };
}

function regenerateIds(libraries: libraryType[]) {
  return libraries.map(library => {
    const newLibrary = library;

    newLibrary.id = uuidv4();
    newLibrary.folders = library.folders.map(folder => {
      const newFolder = folder;

      newFolder.id = uuidv4();
      newFolder.checklist = folder.checklist.map(item => {
        const newItem = item;

        newItem.id = uuidv4();

        return newItem;
      });

      return newFolder;
    });

    return newLibrary;
  });
}
