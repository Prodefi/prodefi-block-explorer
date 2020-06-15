import types from './types';
import { END_POINT_API } from '../../constants';

export const blockActions = Object.freeze({
  fetchLatestBlocks: () => async dispatch => {
    dispatch({ type: types.FETCHING_LATEST_BLOCK });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/blocks/latest`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_LATEST_BLOCK_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_LATEST_BLOCK_FAILURE,
      });
    }
  },
});
