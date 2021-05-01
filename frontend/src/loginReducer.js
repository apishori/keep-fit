const initialState = ''

const loginReducer = (state=initialState,action) => {
    if (action.type === 'setLogin') {
        return { ...state, loginID: action.payload }
    }
    else if (action.type === 'clearLogin') {
        return { ...state, loginID: '' }
    }
    return state
}

export default loginReducer;