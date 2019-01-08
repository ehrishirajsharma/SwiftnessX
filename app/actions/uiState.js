// @flow
export const OPEN_TARGET = 'OPEN_TARGET';
export const OPEN_LIBRARY = 'OPEN_LIBRARY';
export const OPEN_TEMPLATE = 'OPEN_TEMPLATE';
export const OPEN_PAYLOAD = 'OPEN_PAYLOAD';
export const OPEN_CHECKLIST_DATA = 'OPEN_CHECKLIST_DATA';
export const OPEN_NOTE_DATA = 'OPEN_NOTE_DATA';
export const OPEN_LIBRARY_DATA = 'OPEN_LIBRARY_DATA';
export const OPEN_TEMPLATE_DATA = 'OPEN_TEMPLATE_DATA';
export const OPEN_PAYLOAD_DATA = 'OPEN_PAYLOAD_DATA';

export const CLOSE_LIST = 'CLOSE_LIST';
export const CLOSE_ITEM_DATA = 'CLOSE_ITEM_DATA';

export const SEARCH = 'SEARCH';

export function openTarget(id: string, folderId: string) {
  return {
    type: OPEN_TARGET,
    payload: {
      id,
      folderId
    }
  };
}

export function openLibrary(id: string, folderId: string) {
  return {
    type: OPEN_LIBRARY,
    payload: {
      id,
      folderId
    }
  };
}

export function openTemplate() {
  return {
    type: OPEN_TEMPLATE
  };
}

export function openPayload() {
  return {
    type: OPEN_PAYLOAD
  };
}

export function openChecklistData(id?: string, auto?: boolean = false) {
  return {
    type: OPEN_CHECKLIST_DATA,
    payload: {
      id,
      auto
    }
  };
}

export function openNoteData(id?: string) {
  return {
    type: OPEN_NOTE_DATA,
    payload: {
      id
    }
  };
}

export function openLibraryData(id?: string, auto?: boolean = false) {
  return {
    type: OPEN_LIBRARY_DATA,
    payload: {
      id,
      auto
    }
  };
}

export function openTemplateData(id?: string) {
  return {
    type: OPEN_TEMPLATE_DATA,
    payload: {
      id
    }
  };
}

export function openPayloadData(id?: string) {
  return {
    type: OPEN_PAYLOAD_DATA,
    payload: {
      id
    }
  };
}

export function closeList() {
  return {
    type: CLOSE_LIST
  };
}

export function closeItemData() {
  return {
    type: CLOSE_ITEM_DATA
  };
}

export function search(query: string) {
  return {
    type: SEARCH,
    payload: {
      query
    }
  };
}
