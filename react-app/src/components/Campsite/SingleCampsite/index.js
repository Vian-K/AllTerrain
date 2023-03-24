import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { singleCampsiteThunk } from "../../../store/Campsites";
const SingleCampsite = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const campsiteDetail = useSelector(state => state.CampsiteReducer.singleCampsite)

    useEffect(() => {
        dispatch(singleCampsiteThunk(id.id))
    })

    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default SingleCampsite;
