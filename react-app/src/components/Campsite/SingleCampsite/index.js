import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteCampsiteThunk, editCampsiteThunk, singleCampsiteThunk } from "../../../store/Campsites";
import Reviews from "../../Reviews";
import "./singlecampsite.css"

const SingleCampsite = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const history = useHistory()
    const campsiteDetail = useSelector(state => state.CampsiteReducer.singleCampsite.campsite)
    const user = useSelector(state => state.session.user)
    const [info, showInfo] = useState(false)
    const [reviews, showReviews] = useState(false)
    // console.log("DETAIL", campsiteDetail)
    useEffect(() => {
        dispatch(singleCampsiteThunk(id.id))
    }, [dispatch])

    if(!campsiteDetail) {
        return null;
    }
    const reviewsVisible = () => {
        showReviews(true)
        showInfo(false)
    }
    const infoVisible = () => {
        showInfo(true)
        showReviews(false)
    }
    return(
        <div className="maindetailscontainer">
            <div className="inforeviewbuttons">
                <button onClick={infoVisible}>Info</button>
                <button onClick={reviewsVisible}>Reviews</button>
            </div>

            {info && (
                <div className='infopage'>
                    {campsiteDetail.campsiteimages.map(({image}) => {
                        return <img className="detailsimages" src={image}></img>
                    })}
                </div>
            )}

            {info && (
                <div>
                    <h1>{campsiteDetail.name}</h1>
                    <div>
                        <div>
                            <p>Details: {campsiteDetail.details}</p>
                        </div>
                        <div>
                            <p>Cost: ${campsiteDetail.cost}/night</p>
                        </div>
                        <div>
                            <p>Cleanliness: {campsiteDetail.cleanliness}</p>
                        </div>
                        <div>
                            <p>Road Difficulty: {campsiteDetail.roaddifficulty}</p>
                        </div>
                        <div>
                            <p>Accessibility: {campsiteDetail.accessibility}</p>
                        </div>
                        <div>
                            <p>Cell Data: {campsiteDetail.celldata}</p>
                        </div>
                        <div>
                            <p>Land Type: {campsiteDetail.landtype}</p>
                        </div>
                        <div>
                            {user && campsiteDetail.owner === user?.id ? (
                                <div>
                                    <button onClick={() => history.push(`/campsites/edit/${id.id}`)}>Edit Campsite</button>
                                    <button onClick={() => dispatch(deleteCampsiteThunk(id.id)).then(() => history.push('/'))}>Delete Campsite</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {reviews && (
                <div>
                    <Reviews />
                </div>
            )}
        </div>
    )
}

export default SingleCampsite;
