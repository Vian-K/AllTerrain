

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



export const createChecklistThunk = (checklist) => async (dispatch) => {

    const response = await fetch(`/api/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(checklist.ProductData)
    })
    const data = await response.json()

    if(response.ok) {
        dispatch(createChecklist(data))
    }

    }


export const loadchecklistThunk = () => async (dispatch) => {
    const response = await fetch(`/api/`)
    const data = await response.json()
    dispatch(loadChecklist(data))
    return response
}



export const deletechecklistThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/${id}`, {
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
            let allProductsCopy = {}
            action.payload.products.forEach(checklist => {
                allProductsCopy[checklist.id] = checklist
            })
            newState.allProducts = allProductsCopy
            
            return newState
        case NEW_CHECKLIST:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState


        case DELETE_CHECKLIST:
            newState={...state}
            let productsCopy = {...newState.allProducts}
            delete productsCopy[action.id]
            newState.allProducts = productsCopy
            newState.singleProduct = {}

            return newState

        default:
            return state;
    }
}

export default checklistReducer
