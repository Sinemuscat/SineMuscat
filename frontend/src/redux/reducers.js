import { SET_TOTAL_POINTS } from './types';

const initialState = {
  totalPoints: 10,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_POINTS:
      return {
        ...state,
        totalPoints: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
