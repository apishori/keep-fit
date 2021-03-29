const initialState = 8

const exerciseReducer = (state=initialState,action) => {
    if (action.type === 'setExercise') {
        return { ...state, exercise: action.payload }
    }
    return state
}

export default exerciseReducer;