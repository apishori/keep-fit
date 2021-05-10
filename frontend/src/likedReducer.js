const initialState = []

const likedReducer =(state=initialState,action)=>{
    if (action.type === 'add2') {
        return action.payload
    }
   return state
}

export default likedReducer;