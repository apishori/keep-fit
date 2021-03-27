const initialState = ''

const loginReducer = (state=initialState,action) => {
    if (action.type === 'setLogin') {
        return { ...state, loginID: action.payload }
    }
    return state
}

export default loginReducer;