// @flow
export const OPEN_EXPORT = 'OPEN_EXPORT';
export const CLOSE_EXPORT = 'CLOSE_EXPORT';

export function openExport() {
  return {
    type: OPEN_EXPORT
  };
}

export function closeExport() {
  return {
    type: CLOSE_EXPORT
  };
}
