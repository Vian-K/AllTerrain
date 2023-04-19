 import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { deletePlacesThunk, loadPlacesThunk } from '../../store/myPlaces'
import ReactStars from 'react-rating-stars-component';
import './myplaces.css'



function MyPlaces() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesReducer.allPlaces || [])
    const placesObj = Object.values(places)
    console.log('placesobj', placesObj)
    let campsitename;
    let imagedata;
    let reviewdata;

    useEffect(() => {
        dispatch(loadPlacesThunk())
    }, [dispatch])
    if(!user) {
        return <h1 className='myplacescontainer'>You must be logged in to see your places</h1>
      }


    const avgReview = () => {
        let ratingsArray = []

        if(reviewdata) {
            let reviewsArray = Object.values(reviewdata)
            if (reviewsArray?.length === 0 ) return null
            reviewsArray?.forEach(review => {
                ratingsArray.push(review.rating)
            })
        }
            let initialValue = 0
            let avgRating = ratingsArray.reduce((a, b) => a + b, initialValue);

        return(avgRating/ratingsArray.length).toFixed(2)
      }
      if(!placesObj || placesObj.length === 0) {
        return <h1 className='myplacescontainer'>You have no places saved!</h1>
      } else
    return (
        <div className='myplacescontainer'>
            <h1 className='myplacestitle'>My Places</h1>
            <div className='myplacesdata'>
            {placesObj?.map(({campsiteid, campsite, campsiteImages, reviews}) => {
                imagedata = campsiteImages
                reviewdata = reviews

                campsite?.map(({name}) => {
                    campsitename = name
                })
                return <div className='myplaces'>
                    <div className='imagerow'>
                    <img className='myplacesimage'src={imagedata && imagedata[0]?.image} alt="campsiteimage" />
                        <NavLink className='infobutton' exact to={`/campsites/${campsiteid}`}>Info</NavLink>
                    </div>
                        <div className='myplacedetails'>
                    <p>{campsitename}</p>
                    {avgReview && avgReview() > 0 ? (

                        <ReactStars
                        count={5}
                        value={avgReview()}
                        size={20}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                        />
                        ) : (
                            <p>No reviews</p>
                            )}


                            <div className='deleteplacesbuttoncontainer'>
                            <button className='deleteplacesbutton' onClick={() => dispatch(deletePlacesThunk(campsiteid))}>Remove</button>
                            </div>
                            </div>

                </div>
    })}

            </div>
            </div>
    )
}

export default MyPlaces;
