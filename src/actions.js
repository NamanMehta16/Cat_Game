export const setPosition = (payload) => {
  return {
    type: "SET_POSITION",
    payload,
  };
};
export const setMidAreaElements = (payload) => ({
  type: "SET_MID_AREA_ELEMENTS",
  payload,
});
export const setBusyFlag = (payload) => ({
  type: "SET_BUSY_FLAG",
  payload,
});
export const setCatClicked = (payload) => ({
  type: "SET_CAT_CLICKED",
  payload,
});
export const setHistory = (payload) => ({
  type: "SET_HISTORY",
  payload,
});
