// @flow
export const DO_NOT_SHOW_DELETE_CONFIRMATION =
  'DO_NOT_SHOW_DELETE_CONFIRMATION';

export function doNotShowDeleteConfirmation() {
  return {
    type: DO_NOT_SHOW_DELETE_CONFIRMATION
  };
}
