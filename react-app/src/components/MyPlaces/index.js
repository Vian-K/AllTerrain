import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadPlacesThunk } from '../../store/myPlaces'
import './myplaces.css'



function MyPlaces() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesReducer.allPlaces || [])
    const placesObj = Object.values(places)
    console.log("PLACES", placesObj)
    let campsitedata;
    let imagedata;
    placesObj.map(({campsite, campsiteImages}) => {
        campsitedata = campsite
        imagedata = campsiteImages
    })
    useEffect(() => {
        dispatch(loadPlacesThunk())
    }, [dispatch])


    return (
        <div className='myplacescontainer'>
            <h1>My Places</h1>
            <div className='myplacesdata'>
            {campsitedata.map(({name}) => {
                return <div>
                    <p>{name}</p>
                    </div>
            })}


            </div>
            </div>
    )
}

export default MyPlaces;
