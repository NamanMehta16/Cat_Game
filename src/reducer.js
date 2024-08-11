// import { SET_POSITION, SET_MID_AREA_ELEMENTS } from "./actions";

const initialState = {
  value: {
    x: 0,
    y: 0,
    angle: 0,
    midAreaElements: [],
    busyFlag: false,
    catClick: 0,
    history: [],
  },
};
const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSITION":
      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload,
        },
      };
    case "SET_MID_AREA_ELEMENTS":
      return {
        ...state,
        value: {
          ...state.value,
          midAreaElements: action.payload,
        },
      };
    case "SET_BUSY_FLAG":
      return {
        ...state,
        value: {
          ...state.value,
          busyFlag: action.payload,
        },
      };
    case "SET_CAT_CLICKED":
      return {
        ...state,
        value: {
          ...state.value,
          catClick: state.value.catClick + 1,
        },
      };
    case "SET_HISTORY":
      return {
        ...state,
        value: {
          ...state.value,
          history: action.payload,
        },
      };

    default:
      return state;
  }
};

export default storeReducer;
