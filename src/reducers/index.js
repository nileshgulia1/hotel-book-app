const initialState = {
  data: {},
};
export function saveData(state = initialState, action = {}) {
  switch (action.type) {
    case "SAVE_DATA":
      return {
        data: action.result || action.data,
      };

    default:
      return state;
  }
}
const reducers = { saveData };

export default reducers;
