const NEW_CAMPSITE = 'product/newProduct'
const LOAD_CAMPSITE = 'product/loadProducts'
const EDIT_CAMPSITE = 'product/editCampsite'
const DELETE_CAMPSITE = 'product/deleteCampsite'
const LOAD_ONE_CAMPSITE = 'product/loadOneProduct'
const ADD_IMAGE = 'product/addImage'

const creatCampsite = (product) => ({
    type: NEW_CAMPSITE,
    payload: product
})

const loadCampsite = (products) => ({
    type: LOAD_CAMPSITE,
    payload: products
})

const editCampsite = (product) => ({
    type: EDIT_CAMPSITE,
    payload: product
})

const deleteCampsite = (id) => ({
    type: DELETE_CAMPSITE,
    payload: id
})

const singleCampsite = (product) => ({
    type: LOAD_ONE_CAMPSITE,
    payload: product
})

const addImages = (product) => ({
    type: ADD_IMAGE,
    payload: product
})
// Thunks

export const createCampsiteThunk = (campsite) => async (dispatch) => {
    const response = await fetch(`/api/campsites/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    })
    let ProductData;
    if(response.ok){
        ProductData = await response.json()
        // const productData = await response.json()
        // console.log("PRODUCTDATA", productData)
        const res = await fetch(`/api/campsiteImages/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // image: product.imgData.image,
                // previewImage: product.imgData.preview,
                // product_id: ProductData.id
            })
        })

        if(res.ok){
            const resData = await res.json()
            ProductData.productImages = [resData]
            // console.log("PRODUCTDATA", ProductData)

            dispatch(creatCampsite(ProductData))
            return
        }

    }
}

export const loadCampsiteThunk = () => async (dispatch) => {
    const response = await fetch(`/api/products/`)
    const data = await response.json()
    dispatch(loadCampsite(data))
    return response
}

export const singleCampsiteThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    const data = await response.json()

    dispatch(singleCampsite(data))
    return response
}


export const editCampsiteThunk = (currentProductID, editedProduct, imgData) => async (dispatch) => {
    // console.log('CURRENT PRODUCT ID', currentProductID)
    // console.log("EDIT PRODUCT", editedProduct)
    const response = await fetch(`/api/products/${currentProductID}`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedProduct)
    })
    // console.log("RESOK", response)
    let data = await response.json()
    let data2;
    // console.log("IMAGE DATA========", imgData)
    if (response.ok && imgData.img_url.length > 5 ) {
        const response2 = await fetch(`/api/productImages/${currentProductID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imgData)
        })
        data2 = await response2.json()
    }

    if (response.ok){

        // console.log("DATA==================", data)
        // console.log("DATA2===================", data2)
        if(data2) data.productImages = [data2]
        dispatch(editCampsite(data))
    }
    return data

}

export const deleteCampsiteThunk = (id) => async (dispatch) => {
    // console.log("ID", id)
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(deleteCampsite(id))
        return response
    }
}

const initialState = {allCampsite: {}, singleCampsite: {}}

export const CampsiteReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_CAMPSITE:
            newState = {...state}
            let allProductsCopy = {}
            action.payload.products.forEach(product => {
                allProductsCopy[product.id] = product
            })
            newState.allProducts = allProductsCopy
            // console.log("allproductscopy", allProductsCopy)
            return newState
        case NEW_CAMPSITE:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState
        case LOAD_ONE_CAMPSITE:
            newState = {...state}
            // console.log("Action", action)
            newState.singleProduct = action.payload
            return newState
        case EDIT_CAMPSITE:
            return {...state,
                singleProduct: {
                    ...state.singleProduct,
                    ...action.payload
                }
            }
        case DELETE_CAMPSITE:
            newState={...state}
            let productsCopy = {...newState.allProducts}
            delete productsCopy[action.id]
            newState.allProducts = productsCopy
            newState.singleProduct = {}

            return newState
        case ADD_IMAGE:
            newState = {...state}
            const newProductImage = {...state.singleProduct}
            newProductImage[action.payload.singleProduct] = action.payload.singleProduct
            newState.products = newProductImage
            return newState
        default:
            return state;
    }
}

export default CampsiteReducer
