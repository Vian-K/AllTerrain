const NEW_CAMPSITE = 'campsite/newCampsite'
const LOAD_CAMPSITE = 'campsite/loadCampsites'
const EDIT_CAMPSITE = 'campsite/editCampsite'
const DELETE_CAMPSITE = 'campsite/deleteCampsite'
const LOAD_ONE_CAMPSITE = 'campsite/loadOneCampsite'
const ADD_IMAGE = 'campsite/addImage'

const creatCampsite = (campsite) => ({
    type: NEW_CAMPSITE,
    payload: campsite
})

const loadCampsite = (campsite) => ({
    type: LOAD_CAMPSITE,
    payload: campsite
})

const editCampsite = (campsite) => ({
    type: EDIT_CAMPSITE,
    payload: campsite
})

const deleteCampsite = (id) => ({
    type: DELETE_CAMPSITE,
    payload: id
})

const singleCampsite = (campsite) => ({
    type: LOAD_ONE_CAMPSITE,
    payload: campsite
})

const addImages = (campsite) => ({
    type: ADD_IMAGE,
    payload: campsite
})
// Thunks

export const createCampsiteThunk = (campsite) => async (dispatch) => {
    const response = await fetch(`/api/campsites/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(campsite)
    })
    let campsiteData;
    if(response.ok){
        campsiteData = await response.json()
        // const productData = await response.json()
        // console.log("PRODUCTDATA", productData)
        const res = await fetch(`/api/campsiteImages/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: campsite.imgData.image,
                previewImage: campsite.imgData.preview,
                campsite_id: campsiteData.id
            })
        })

        if(res.ok){
            const resData = await res.json()
            campsiteData.campsiteImages = [resData]
            // console.log("PRODUCTDATA", ProductData)

            dispatch(creatCampsite(campsiteData))
            return
        }

    }
}

export const loadCampsiteThunk = () => async (dispatch) => {
    const response = await fetch(`/api/campsites/`)
    const data = await response.json()
    dispatch(loadCampsite(data))
    return response
}

export const singleCampsiteThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/campsites/${id}`)
    const data = await response.json()

    dispatch(singleCampsite(data))
    return response
}


export const editCampsiteThunk = (campsiteID, editedCampsite, imgData) => async (dispatch) => {

    const response = await fetch(`/api/campsites/${campsiteID}`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCampsite)
    })

    let data = await response.json()
    let data2;

    if (response.ok && imgData.img_url.length > 5 ) {
        const response2 = await fetch(`/api/campsiteImages/${campsiteID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imgData)
        })
        data2 = await response2.json()
    }

    if (response.ok){

        if(data2) data.campsiteImages = [data2]
        dispatch(editCampsite(data))
    }
    return data

}

export const deleteCampsiteThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/campsites/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(deleteCampsite(id))
        return response
    }
}

const initialState = {allCampsites: {}, singleCampsite: {}}

export const CampsiteReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_CAMPSITE:
            newState = {...state}
            let allCampsitesCopy = {}
            action.payload.campsites.forEach(product => {
                allCampsitesCopy[product.id] = product
            })
            newState.allCampsites = allCampsitesCopy
            return newState
        case NEW_CAMPSITE:
            newState = {...state}
            let newStateCopy = {...newState.allCampsites}
            newStateCopy[action.payload.id] = action.payload
            newState.allCampsites = newStateCopy
            return newState
        case LOAD_ONE_CAMPSITE:
            newState = {...state}
            // console.log("Action", action)
            newState.singleCampsite = action.payload
            return newState
        case EDIT_CAMPSITE:
            return {...state,
                singleCampsite: {
                    ...state.singleCampsite,
                    ...action.payload
                }
            }
        case DELETE_CAMPSITE:
            newState={...state}
            let campsitesCopy = {...newState.allCampsites}
            delete campsitesCopy[action.id]
            newState.allProducts = campsitesCopy
            newState.singleProduct = {}

            return newState
        case ADD_IMAGE:
            newState = {...state}
            const newCampsiteImage = {...state.singleCampsite}
            newCampsiteImage[action.payload.singleCampsite] = action.payload.singleCampsite
            newState.products = newCampsiteImage
            return newState
        default:
            return state;
    }
}

export default CampsiteReducer
