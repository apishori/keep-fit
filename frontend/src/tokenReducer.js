const initialState = null

const tokenReducer = (state=initialState,action) => {
    if (action.type === 'setToken') {
        return { ...state, token: action.payload }
    }
    else if (action.type === 'clearToken') {
        return { ...state, token: [] }
    }
    return state
}

export default tokenReducer;