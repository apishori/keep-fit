const initialState = []

const resultReducer = (state=initialState,action) => {
    if (action.type === 'storeResult') {
        return { ...state, result: action.payload }
    }
    else if (action.type === 'clearResult') {
        return { ...state, result: [] }
    }
    return state
}

export default resultReducer;