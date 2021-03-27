const initialState = null

const resultReducer = (state=initialState,action) => {
    if (action.type === 'storeResult') {
        return { ...state, userResult: action.payload }
    }
    else if (action.type === 'clearResult') {
        return { ...state, userResult: [] }
    }
    return state
}

export default resultReducer;