import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'




function myPlaces() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)



    // useEffect(() => {
    //     dispatch())
    // }, [dispatch])


    return (
        <div>

            </div>
    )
}

export default myPlaces;
