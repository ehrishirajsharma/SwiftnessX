// @flow
export const OPEN_ABOUT = 'OPEN_ABOUT';
export const CLOSE_ABOUT = 'CLOSE_ABOUT';

export function openAbout() {
  return {
    type: OPEN_ABOUT
  };
}

export function closeAbout() {
  return {
    type: CLOSE_ABOUT
  };
}
