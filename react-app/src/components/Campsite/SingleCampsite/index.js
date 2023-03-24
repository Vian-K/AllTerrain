import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { singleCampsiteThunk } from "../../../store/Campsites";

const SingleCampsite = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const campsiteDetail = useSelector(state => state.CampsiteReducer.singleCampsite.campsite)
    console.log("DETAIL", campsiteDetail)
    useEffect(() => {
        dispatch(singleCampsiteThunk(id.id))
    }, [dispatch])
    if(!campsiteDetail) {
        return null;
    }
    return(
        <div>
            <h1>Test</h1>
            <div>
               <h1>{campsiteDetail.name}</h1>
               <div>
               <p>Details: {campsiteDetail.details}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleCampsite;
