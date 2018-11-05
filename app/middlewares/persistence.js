// @flow
import storage from 'electron-json-storage';

export default store => next => action => {
  next(action);

  const {
    targets,
    libraries,
    templates,
    payloads,
    messages
  } = store.getState();
  storage.set('content', { targets, libraries, templates, payloads, messages });
};
