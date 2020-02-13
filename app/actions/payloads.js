// @flow
import uuidv4 from 'uuid/v4';
import { payloadType } from '../reducers/payloads';

export const ADD_PAYLOAD_ITEM = 'ADD_PAYLOAD_ITEM';
export const ADD_PAYLOAD_ITEM_DATA = 'ADD_PAYLOAD_ITEM_DATA';

export const SAVE_PAYLOAD_ITEM = 'SAVE_PAYLOAD_ITEM';

export const EDIT_PAYLOAD_ITEM_TITLE = 'EDIT_PAYLOAD_ITEM_TITLE';
export const EDIT_PAYLOAD_ITEM_ORDER = 'EDIT_PAYLOAD_ITEM_ORDER';

export const REMOVE_PAYLOAD_ITEM = 'REMOVE_PAYLOAD_ITEM';
export const REMOVE_PAYLOAD_ITEM_DATA = 'REMOVE_PAYLOAD_ITEM_DATA';

export const IMPORT_PAYLOADS = 'IMPORT_PAYLOADS';

export function addPayloadItem() {
  return {
    type: ADD_PAYLOAD_ITEM,
    payload: {
      id: uuidv4()
    }
  };
}

export function addPayloadItemData(
  id: string,
  title: string,
  description: string,
  content: string
) {
  return {
    type: ADD_PAYLOAD_ITEM_DATA,
    payload: {
      id,
      itemId: uuidv4(),
      title,
      description,
      content
    }
  };
}

export function savePayloadItem(id: string) {
  return {
    type: SAVE_PAYLOAD_ITEM,
    payload: {
      id
    }
  };
}

export function editPayloadItemTitle(id: string, title: string) {
  return {
    type: EDIT_PAYLOAD_ITEM_TITLE,
    payload: {
      id,
      title
    }
  };
}

export function editPayloadItemOrder(fromIndex: number, toIndex: number) {
  return {
    type: EDIT_PAYLOAD_ITEM_ORDER,
    payload: {
      fromIndex,
      toIndex
    }
  };
}

export function removePayloadItem(id: string) {
  return {
    type: REMOVE_PAYLOAD_ITEM,
    payload: {
      id
    }
  };
}

export function removePayloadItemData(id: string, itemId: string) {
  return {
    type: REMOVE_PAYLOAD_ITEM_DATA,
    payload: {
      id,
      itemId
    }
  };
}

export function importPayloads(payloads: payloadType[]) {
  return {
    type: IMPORT_PAYLOADS,
    payload: {
      payloads: regenerateIds(payloads)
    }
  };
}

function regenerateIds(payloads: payloadType[]) {
  return payloads.map(payload => {
    const newPayload = { ...payload };

    newPayload.id = uuidv4();

    return newPayload;
  });
}
