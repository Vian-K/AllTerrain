const ADD_REVIEW = 'reviews/addReview'
const READ_REVIEW = 'reviews/readReview'
const DELETE_REVIEW = 'reviews/deleteReview'
const EDIT_REVIEWS = 'reviews/editReviews'


const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})
const readReview = (reviews) => ({
    type: READ_REVIEW,
    payload: reviews
})
export const updateReview = (reviews) => ({
    type: EDIT_REVIEWS,
    payload: reviews
})
const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

//THUNKS
export const addReviewThunk = (id, review) => async (dispatch) => {


    const response = await fetch("/api/reviews/" , {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: review.userId,
            campsiteid: id,
            review: review.review,
            rating: review.rating
        })
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review))
        return review
    }
}

export const readReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/campsites/${id}`)
    const reviews = await response.json()
    dispatch(readReview(reviews))
}

// export const editReviewThunk = (review) => async (dispatch) => {
//     const response = await fetch(`/api/reviews/${review.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(review)
//     })
//     if (response.ok) {
//         const data = await response.json()
//         dispatch(updateReview(data))
//         return data
//     }
// }



export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
        return data
    }
}

//initial state

let initialState = {
    CampsiteReviews:{},
    UserReviews:{}
}
//REDUCER

export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_REVIEW:
            newState = { ...state}
            let reviewsCopy = {}
            action.payload.campsite.reviews.forEach(review => {
                reviewsCopy[review.id] = review
            })
            newState.CampsiteReviews = reviewsCopy
            return newState
        case ADD_REVIEW:
            newState = {...state}
            let newStateCopy = {...newState.CampsiteReviews}

            newStateCopy[action.payload.id] = action.payload
            newState.CampsiteReviews = newStateCopy

            return newState

        case EDIT_REVIEWS:
            const updatedReviews = { ...state.reviews }
            updatedReviews[action.payload.id] = action.payload
            return { ...state, reviews: updatedReviews }
        case DELETE_REVIEW:
            newState = {...state}
            let reviewCopy = {...newState.CampsiteReviews}
            

            delete reviewCopy[action.payload.id]
            newState.CampsiteReviews = reviewCopy
            return newState
        default:
            return state;
    }
}

export default reviewsReducer;
