import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { readReviewThunk, addReviewThunk, deleteReviewThunk } from '../../store/reviews'
import TrashIcon from '../Icons/trashcan'
import './review.css'

export const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    const [review, setReviews] = useState()
    const [rating, setRating] = useState(5)
    const reviewsObj = useSelector(state => state.reviewsReducer.ProductReviews)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const reviews = Object.values(reviewsObj)
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
            setTimeout(() => {
                setErrors([])
            }, 2000)
            return
        }
        return dispatch(addReviewThunk(ID, { userId, id, review, rating }))
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
    const userHasReview = reviews.some(({user_id}) => user_id === userId)
    const loggedIn = () => {
        if(!user) {
           return <p>Please log in to post a review.</p>
        } else {
            return null;
        }
    }
    const reviewCheck = () => {
        if(Object.keys(reviewsObj).length === 0) {
            return <p>There are no reviews for this product yet!</p>
        } else {
            return null;
        }
    }

    // const avgReview = () => {
    //   console.log("REVIEWOBJ==========>", Object.values(reviewsObj))
    //   let reviewsArray = Object.values(reviewsObj)
    //   if (reviewsArray.length === 0 ) return null
    //   let ratingsArray = []
    //   reviewsArray.forEach(review => {
    //     ratingsArray.push(review.rating)
    //   })
    //   let initialValue = 0
    //   let avgRating = ratingsArray.reduce((a, b) => a + b, initialValue);

    //   return(avgRating/ratingsArray.length).toFixed(2)
    }
    return (
        <div></div>
      );




