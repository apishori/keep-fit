const initialState = []

const videoReducer =(state=initialState,action)=>{
    if(action.type=='addVideo'){
        return action.payload
    }
   return state
}

export default videoReducer;