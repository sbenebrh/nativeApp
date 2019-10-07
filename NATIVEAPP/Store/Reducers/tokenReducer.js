

const initialState = { level : '' }

function toggleToken(state = initialState, action) {
  switch (action.type) {
    case 'level':
      return { ...state, level : action.value };
    default:
      return state
  }
}









export default toggleToken