import { SET_TOTAL_POINTS } from "./types";

export const setTotalPoints = (value) => {
    return {
      type: SET_TOTAL_POINTS,
      payload: value,
    };
  };