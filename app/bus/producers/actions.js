import types from './types';

export const producerActions = Object.freeze({
  fetchProducers: () => async dispatch => {
    const response = await fetch();
    const producers = await response.json();

    return dispatch({
      type: types.FETCH_PRODUCERS_SUCCESS,
      payload: {
        producers,
      },
    });
  },

  fetchBlackList: () => async dispatch => {
    const response = await fetch();
    const blackList = await response.json();

    return dispatch({
      type: types.FETCH_BLACK_LIST_SUCCESS,
      payload: {
        blackList,
      },
    });
  },

  producersReload: data => ({
    type: types.PRODUCERS_RELOAD,
    payload: {
      producers: data,
    },
  }),

  producersUpdate: data => ({
    type: types.PRODUCERS_UPDATE,
    payload: {
      data,
    },
  }),

  blackListUpdate: data => ({
    type: types.PRODUCERS_UPDATE,
    payload: {
      data,
    },
  }),

  toggleProducerSelection: producerName => ({
    type: types.TOGGLE_PRODUCER_SELECTION,
    payload: producerName,
  }),

  // Filter input value
  setFilterInputValue: filterInputValue => ({
    type: types.SET_FILTER_INPUT_VALUE,
    payload: filterInputValue,
  }),
});
