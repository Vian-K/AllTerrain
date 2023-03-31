import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { createCampsiteThunk,loadCampsiteThunk } from '../../store/Campsites'
import MapContainer from '../Googlemaps'
import "../../index.css"
import HomePageMap from '../Googlemaps/homepagemap'
import SingleCampsite from './SingleCampsite'



export const Campsites = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const campsites = useSelector(state=> state.CampsiteReducer.allCampsites)
    const campsitesArr = Object.values(campsites)

    useEffect(() => {
        dispatch(loadCampsiteThunk())
    }, [dispatch])

   
    return (
        <div>
            <Switch>
            <Route path="/">
            <HomePageMap  />
            </Route>
            <Route exact path="/campsite/:id">
            <SingleCampsite  />
            </Route>
            </Switch>
            {/* <MapContainer /> */}
            </div>
    )
}



export default Campsites;
