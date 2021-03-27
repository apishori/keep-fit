const initialState = 'user'

const searchReducer = (state=initialState,action) => {
    if (action.type === 'setType') {
        return { ...state, searchType: action.payload }
    }
    return state
}

export default searchReducer;