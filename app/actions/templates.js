// @flow
import uuidv4 from 'uuid/v4';
import { templateType } from '../reducers/templates';

export const ADD_TEMPLATE_ITEM = 'ADD_TEMPLATE_ITEM';
export const SAVE_TEMPLATE_ITEM = 'SAVE_TEMPLATE_ITEM';
export const EDIT_TEMPLATE_ITEM_TITLE = 'EDIT_TEMPLATE_ITEM_TITLE';
export const EDIT_TEMPLATE_ITEM_CONTENT = 'EDIT_TEMPLATE_ITEM_CONTENT';
export const EDIT_TEMPLATE_ITEM_ORDER = 'EDIT_TEMPLATE_ITEM_ORDER';
export const EDIT_TEMPLATE_ITEM_COLOR = 'EDIT_TEMPLATE_ITEM_COLOR';
export const REMOVE_TEMPLATE_ITEM = 'REMOVE_TEMPLATE_ITEM';

export const IMPORT_TEMPLATES = 'IMPORT_TEMPLATES';

export function addTemplateItem() {
  return {
    type: ADD_TEMPLATE_ITEM,
    payload: {
      id: uuidv4()
    }
  };
}

export function saveTemplateItem(id: string) {
  return {
    type: SAVE_TEMPLATE_ITEM,
    payload: {
      id
    }
  };
}

export function editTemplateItemTitle(id: string, title: string) {
  return {
    type: EDIT_TEMPLATE_ITEM_TITLE,
    payload: {
      id,
      title
    }
  };
}

export function editTemplateItemContent(id: string, content: string) {
  return {
    type: EDIT_TEMPLATE_ITEM_CONTENT,
    payload: {
      id,
      content
    }
  };
}

export function editTemplateItemOrder(fromIndex: number, toIndex: number) {
  return {
    type: EDIT_TEMPLATE_ITEM_ORDER,
    payload: {
      fromIndex,
      toIndex
    }
  };
}

export function editTemplateItemColor(id: string, color: string) {
  return {
    type: EDIT_TEMPLATE_ITEM_COLOR,
    payload: {
      id,
      color
    }
  };
}

export function removeTemplateItem(id: string) {
  return {
    type: REMOVE_TEMPLATE_ITEM,
    payload: {
      id
    }
  };
}

export function importTemplates(templates: templateType[]) {
  return {
    type: IMPORT_TEMPLATES,
    payload: {
      templates: regenerateIds(templates)
    }
  };
}

function regenerateIds(templates: templateType[]) {
  return templates.map(template => {
    const newTemplate = { ...template };

    newTemplate.id = uuidv4();

    return newTemplate;
  });
}
