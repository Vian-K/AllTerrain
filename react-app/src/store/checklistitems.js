const NEW_ITEM = 'ITEM/newItem'
const LOAD_ITEM = 'ITEM/loadItem'
const DELETE_ITEM = 'ITEM/deleteItem'

const createItem = (item) => ({
    type: NEW_ITEM,
    payload: item
})

const loadItem = (items) => ({
    type: LOAD_ITEM,
    payload: items
})


const deleteItem = (id) => ({
    type: DELETE_ITEM,
    payload: id
})

export const createItemThunk = (item, checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklistitems/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({item, checklistid})
    })
    const data = await response.json()
    if(response.ok) {
        dispatch(createItem(data))
    }
}


export const loadItemThunk = () => async (dispatch) => {
    const response = await fetch(`/api/checklistitems/`)
    const data = await response.json()
    dispatch(loadItem(data))
    return response
}

export const deleteItemThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/checklistitems/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {

        dispatch(deleteItem(id))
        return response
    }
}

export const itemsReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case LOAD_ITEM:
            newState = {...state}
            let checklistsCopy = {}
            action.payload.checklistitems.forEach(checklist => {
                checklistsCopy[checklist.id] = checklist
            })
            newState = checklistsCopy
            return newState
        case NEW_ITEM:
            newState = {...state}
            let newitemcopy = {...newState}
            newitemcopy[action.payload.id] = action.payload
            newitemcopy = newState
            return newState


        case DELETE_ITEM:
            newState={...state}
            let itemsCopy = {...newState.checklistitems}
            delete itemsCopy[action.payload.id]
            newState.checklistitems = itemsCopy
            newState.checklistitems = {}

            return newState

        default:
            return state;
    }
}

export default itemsReducer;
