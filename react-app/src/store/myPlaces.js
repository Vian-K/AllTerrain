

const NEW_PLACES = 'places/newPlaces'
const LOAD_PLACES = 'places/loadPlaces'
const DELETE_PLACES = 'places/deletePlaces'

const createPlaces = (places) => ({
    type: NEW_PLACES,
    payload: places
})

const loadPlaces = (places) => ({
    type: LOAD_PLACES,
    payload: places
})


const deletePlaces = (id) => ({
    type: DELETE_PLACES,
    payload: id
})



// Thunks

export const createPlacesThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/myplaces/${id}`, {
        method: 'POST'
    })
    const data = await response.json()

    if(response.ok) {
        dispatch(createPlaces(data))
    }
    return response
    }


export const loadPlacesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/myplaces/`)
    const data = await response.json()
    if(data || response) {
        dispatch(loadPlaces(data))
    } else {
        return []
    }

    return response
}


export const deletePlacesThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/myplaces/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deletePlaces(id))
    }
    return response
}



export const placesReducer = (state = {} , action) => {
    let newState;
    switch(action.type){
        case LOAD_PLACES:

            newState = {...state}
            console.log()
            let allPlacesCopy = {}
            action.payload?.myplaces.forEach(places => {
                allPlacesCopy[places.id] = places
            })
            newState.allPlaces = allPlacesCopy

            return newState
        case NEW_PLACES:
            newState = {...state}
            let newStateCopy = {...newState.allPlaces}
            newStateCopy[action.payload.id] = action.payload
            newState.allPlaces = newStateCopy
            return newState

        case DELETE_PLACES:
            newState={...state}
            
            let placesCopy = {...newState.allPlaces}
            for (let id in placesCopy) {
                if(placesCopy[id].campsiteid === action.payload) {
                    delete placesCopy[id]
                    break
                }
            }

            newState.allPlaces = placesCopy

            return newState

        default:
            return state;
    }
}

export default placesReducer;
