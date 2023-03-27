import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteCampsiteThunk, editCampsiteThunk, singleCampsiteThunk } from "../../../store/Campsites";
import "./singlecampsite.css"

const SingleCampsite = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const history = useHistory()
    const campsiteDetail = useSelector(state => state.CampsiteReducer.singleCampsite.campsite)
    console.log("DETAIL", campsiteDetail)
    useEffect(() => {
        dispatch(singleCampsiteThunk(id.id))
    }, [dispatch])

    if(!campsiteDetail) {
        return null;
    }

    return(
        <div className="maindetailscontainer">
            <div>
            <button>Info</button>
                <button>Reviews</button>
            </div>
            <div>
            </div>

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
               <p>Cell Data: {campsiteDetail.celldata}</p>
            </div>
                <div>
                    <button onClick={() => history.push(`/campsites/edit/${id.id}`)}>Edit Campsite</button>
                </div>
                <button onClick={() =>
                    dispatch(deleteCampsiteThunk(id.id))
                    .then(() => history.push('/'))}
                    >Delete Campsite</button>
                </div>
            </div>
        </div>
    )
}

export default SingleCampsite;
