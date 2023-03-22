

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

export const createPlacesThunk = (places) => async (dispatch) => {

    const response = await fetch(`/api/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(places)
    })
    if(response.ok) {
        dispatch(createPlaces)
    }

    }


export const loadPlacesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/`)
    const data = await response.json()
    dispatch(loadPlaces(data))
    return response
}



export const deletePlacesThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {

        dispatch(deletePlaces(id))
        return response
    }
}



export const placesReducer = (state = {} , action) => {
    let newState;
    switch(action.type){
        case LOAD_PLACES:
            newState = {...state}
            let allProductsCopy = {}
            action.payload.products.forEach(places => {
                allProductsCopy[places.id] = places
            })
            newState.allProducts = allProductsCopy
            // console.log("allproductscopy", allProductsCopy)
            return newState
        case NEW_PLACES:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState


        case DELETE_PLACES:
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

export default placesReducer;
