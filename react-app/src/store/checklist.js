
const NEW_CHECKLIST = 'checklist/newChecklist'
const LOAD_CHECKLIST = 'checklist/loadChecklist'
const DELETE_CHECKLIST = 'checklist/deleteChecklist'

const createChecklist = (checklist) => ({
    type: NEW_CHECKLIST,
    payload: checklist
})

const loadChecklist = (checklists) => ({
    type: LOAD_CHECKLIST,
    payload: checklists
})


const deleteChecklist = (id) => ({
    type: DELETE_CHECKLIST,
    payload: id
})



export const createChecklistThunk = (name, userid) => async (dispatch) => {

    const response = await fetch(`/api/checklists/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, userid})
    })
    const data = await response.json()
    // console.log("DATA", data)
    if(response.ok) {
        dispatch(createChecklist(data))
    }

    }


export const loadchecklistThunk = () => async (dispatch) => {
    const response = await fetch(`/api/checklists/`)
    const data = await response.json()
    dispatch(loadChecklist(data))
    return response
}



export const deletechecklistThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/checklists/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {

        dispatch(deleteChecklist(id))
        return response
    }
}



export const checklistReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case LOAD_CHECKLIST:
            newState = {...state}
            let checklistsCopy = {}
            action.payload.checklists.forEach(checklist => {
                checklistsCopy[checklist.name] = checklist
            })
            newState = checklistsCopy
            return newState;

        case NEW_CHECKLIST:
            newState = { ...state};
            let newStateCopy = { ...newState};
            newStateCopy[action.payload.id] = action.payload;
            newState = newStateCopy;
            return newState;

        case DELETE_CHECKLIST:
            newState={...state}
            let checklistCopy = {...newState.checklists}
            delete checklistCopy[action.payload.id]
            newState.checklists = checklistCopy
            return newState;

        default:
            return state;
    }
}

export default checklistReducer
