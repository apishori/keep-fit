const initialState = []

const reducer =(state=initialState,action) => {
    if(action.type=='clear'){
        return { ...state, data: [] }
    }
    if(action.type=='add'){
        return { ...state, data: action.payload }
    }
    return state
}

export default reducer;