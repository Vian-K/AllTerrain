import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { createCampsiteThunk } from '../../../store/Campsites'
import MapContainer from '../../Googlemaps'
import "./addcampsite.css"

const CreateCampsite = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [name, setName ] = useState('')
    const [details, setDetails ] = useState('')
    const [location, setLocation ] = useState('')
    const [landtype, setLandtype ] = useState('')
    const [cost, setCost ] = useState('')
    const [roaddifficulty, setRoaddifficulty ] = useState('')
    const [cleanliness, setCleanliness ] = useState('')
    const [celldata, setCelldata ] = useState('')
    const [accessibility, setAccessibility ] = useState('')
    const [image, setImage ] = useState('')
    const [errors, setErrors ] = useState([])
    const [showMap, setShowMap] = useState(false)

    const campsiteData = {
        name,
        details,
        location,
        landtype,
        cost,
        roaddifficulty,
        cleanliness,
        celldata,
        accessibility

    }

    const imgData = {
        image,
        preview: true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        if (name.length === 0 || name.length > 25) {
            setErrors(errors => [...errors, 'Please enter a valid name (less than 25 characters)'])
            return
        }
        if (details.length === 0 || details.length > 255) {
            setErrors(errors => [...errors, 'Please enter a valid description (less than 255 characters)'])
            return
        }
        if (cost <= 0 || !cost || cost > 50000) {
            setErrors(errors => [...errors, 'Please enter a cost (must be a positive number between 0 and 50000'])
            return
        }
        if (!Number(cost)) {
            setErrors(errors => [...errors, "Cost must be a number"])
            return
        }
        if (location.length === 0 || location.length > 30) {
            setErrors(errors => [...errors, "Please enter a valid location (less than 30 characters)"])
            return
        }
        if (!landtype || !roaddifficulty || !cleanliness || !accessibility) {
            setErrors(errors => [...errors, 'Please select an option for all drop-downs'])
            return
        }
        if (image.length === 0) {
            setErrors(errors => [...errors, 'Please include a image url'])
            return
        }
        try {
        const imageUrl = new URL(image)
          if (imageUrl.protocol !== 'http:' && imageUrl.protocol !== 'https:') {
            setErrors(errors => [...errors, 'Please enter a valid image link (http/https protocol)']);
            return;
          }
            } catch (error) {
                  setErrors(errors => [...errors, 'Please enter a valid image link']);
                  return;
              }

              dispatch(createCampsiteThunk({campsiteData, imgData}))
              .then(() => history.push('/'))
              .catch(async (res) => {
                console.log("RES", res)
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
              });
            }

        const openMap = () => {
            setShowMap(!showMap);
        }


    if(!user) {
        return <h3>You must be logged in to create a Campsite.</h3>
    }
    return(
        <div className="createmaincontainer">
            <form className="campsiteform" onSubmit={handleSubmit} noValidate>
            <h1>New Campground</h1>
            <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>
            <label className="namelabel">
            Name
            <input className="name-form"
            type="text"
            value={name}
            placeholder="Name"
            maxLength={50}
            onChange={(e) => {
                setName(e.target.value)
            }}
            required

            ></input>
            </label>

            <label className="locationlabel">
            Location
            <input className="location-form"
            type="text"
            value={location}
            placeholder="Coordinates"
            maxLength={50}
            onChange={(e) => {
                setLocation(e.target.value)
            }}
            ></input> Or
            <div>
            <button className="openmapbutton" onClick={openMap}>Find on Map</button>
            {showMap && (
                <MapContainer
                    setLocation={(newLocation) => {
                    setLocation(newLocation);
                    setShowMap(false);
                    }}
                    />)}
            </div>

            </label>
            <label className="detailslabel">
            Details
            <input className="details-form"
            type="text"
            value={details}
            placeholder="Details"
            maxLength={50}
            onChange={(e) => {
                setDetails(e.target.value)
            }}
            required
            ></input>
            </label>
            <label className="costlabel">
            Cost
            <input className="cost-form"
            type="text"
            value={cost}
            placeholder="Cost"
            maxLength={50}
            onChange={(e) => {
                setCost(e.target.value)
            }}
            required
            ></input>

            <label className="celldatalabel">
            Cell
            <select className="celldataselect"
            value={celldata}
            onChange={(e) => setCelldata(e.target.value)}>
                    <option value="" disabled>Select Available Cell Data</option>
                    <option value="AT&T">AT&T</option>
                    <option value="Verizon">Verizon</option>
                    <option value="T-Mobile">T-Mobile</option>
                    <option value="Sprint">Sprint</option>
                    </select>

            </label>




            </label>
            <label className="landtypelabel">
            Landtype
            <select className="landtypeselect" value={landtype} onChange={(e) => setLandtype(e.target.value)}>
                    <option value="" disabled>Select Land Type</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    </select>
            </label>
            <label className="cleanlinesslabel">
            Cleanliness
            <select className="cleanlinessselect" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)}>
                    <option value="" disabled>Select Level of Cleanliness</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                    </select>

            </label>
            <label className="roaddifficultylabel">
            Road Difficulty
            <select className="roaddifficultyselect" value={roaddifficulty} onChange={(e) => setRoaddifficulty(e.target.value)}>
                    <option value="" disabled>Select Road Difficulty Level</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                    </select>

            </label>
            <label className="accessibilitylabel">
            Accessibility
            <select className="accessibilityselect" value={accessibility} onChange={(e) => setAccessibility(e.target.value)}>
                    <option value="" disabled>Select level of Accessibility</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                    </select>

            </label>
            <label className="imagelabel">
            Image
            <input className="image-form"
            type="text"
            value={image}
            placeholder="Image Url"
            maxLength={50}
            onChange={(e) => {
                setImage(e.target.value)
            }}
            required
            ></input>
            </label>
            <button className="submit-form" type="Submit">Submit</button>
            </form>




        </div>
    )
}

export default CreateCampsite;
