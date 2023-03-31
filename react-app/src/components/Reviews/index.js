import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { addReviewThunk, deleteReviewThunk, readReviewThunk } from '../../store/Reviews'
import ReactStars from 'react-rating-stars-component';
import './review.css'

export const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    const [review, setReviews] = useState()
    const [rating, setRating] = useState(5)
    const reviewsObj = useSelector(state => state.reviewsReducer.CampsiteReviews)
    const reviews = Object.values(reviewsObj)
    // console.log("REVIEWSOBJ", reviews)
    // console.log("REVIEWSOBJ", reviewsObj)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const [errors, setErrors] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(readReviewThunk(ID))
    }, [dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (!review || review.length < 3) {
            setErrors(["Please enter a valid review with at least 3 characters"])
        // if(review.length > 255) {
        //   setErrors(["Maximum length 255 characters"])
        // }
            setTimeout(() => {
                setErrors([])
            }, 2000)
            return
        }
        return dispatch(addReviewThunk(ID, { userId, review, rating }))
            .then(() => {
                dispatch(readReviewThunk(id.id))
                setShowForm(false)
                setReviews("")
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                } else if (data && data.message) {
                  setErrors([data.message]);
                }
                setShowForm(true);
                setTimeout(() => {
                  setErrors([]);
                }, 2000);
              });
    }
    const userHasReview = reviews.some(({userid}) => userid === userId)
    const loggedIn = () => {
        if(!user) {
           return <p>Please log in to post a review.</p>
        } else {
            return null;
        }
    }
    const reviewCheck = () => {
        if(Object.keys(reviews).length === 0) {
            return <p>There are no reviews for this product yet!</p>
        } else {
            return null;
        }
    }

    const avgReview = () => {

      let reviewsArray = Object.values(reviews)
      if (reviewsArray.length === 0 ) return null
      let ratingsArray = []
      reviewsArray.forEach(review => {
        ratingsArray.push(review.rating)
      })
      let initialValue = 0
      let avgRating = ratingsArray.reduce((a, b) => a + b, initialValue);

      return(avgRating/ratingsArray.length).toFixed(2)
    }

    const newRating = (newRating) => {
        setRating(newRating)
    }
    return (
        <div className='reviews'>
            
                {reviews.map(({id ,userid, review, rating, created_at}) => {
                    const date =  new Date(created_at).toLocaleDateString('en-US')
                    return <div>
                        <p>{date}</p>
                        <p className="review">{review}</p>

                        <div>
                        {avgReview && avgReview() > 0 ? (
                     <>
                    <ReactStars
                      count={5}
                      value={rating}
                      size={20}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                          />
                          {user && userId === userid ? (
                              <button className="deletereviewbutton"
                              onClick={() =>
                                dispatch(deleteReviewThunk(id))
                                .then(() => dispatch(readReviewThunk(ID)))}>Delete</button>
                              ) : null }


                     </>
                  ) : (
                      <p>No reviews</p>
                      )}
                  </div>
                    </div>
                })
                }
                 <div>
            {/* {console.log("REVIEWSOBJ", reviewsObj)} */}
            {user && reviews.userid !== userId ? (
              userHasReview ? null : (
                showForm ? (
                  <div className='reviews'>
                    <form className="reviewsform" onSubmit={handleSubmit} noValidate>
                      <ul className="ul">
                        {errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                      <textarea
                        className="reviewtextbox"
                        type="textbox"
                        defaultValue="Post a review here!"
                        onFocus={(e) => {
                          if (e.target.defaultValue === "Post a review here!") {
                            setReviews("");
                          }
                        }}
                        value={review}
                        maxLength={255}
                        onChange={(e) => {
                          setReviews(e.target.value);
                        }}
                        required
                      ></textarea>
                     <ReactStars
                        count={5}
                        value={rating}
                        onChange={newRating}
                        size={22}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                      <button className="submitbutton" type="submit">
                        Submit
                      </button>
                    </form>
                    <button className="cancelbutton" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="add-review-btn" onClick={() => setShowForm(true)}>Add a Review</button>
                )
              )
            ) : (
              null
            )}
           <p>{loggedIn()}</p>
           <p>{reviewCheck()}</p>
        </div>
        </div>

      );
    }
export default Reviews;
