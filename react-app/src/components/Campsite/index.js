import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { createCampsiteThunk,loadCampsiteThunk } from '../../store/Campsites'
import MapContainer from '../Googlemaps'



export const Campsites = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const campsites = useSelector(state=> state.CampsiteReducer.allCampsites)
    console.log("CAMPSITES", campsites)

    useEffect(() => {
        dispatch(loadCampsiteThunk())
    }, [dispatch])


    return (
        <div>
            <MapContainer data={campsites} />
            </div>
    )
}

export default Campsites;
