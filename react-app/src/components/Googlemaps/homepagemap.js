import React, { useEffect } from 'react';
import { useState, useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { StandaloneSearchBox, GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
import "./googlemaps.css"
import { useSelector, useDispatch } from 'react-redux';
import { loadCampsiteThunk } from '../../store/Campsites';


const HomePageMap = () => {
const [selectedId, setSelectedId] = useState(null);
const libraries = ['places', 'geometry'];
const dispatch = useDispatch()
const history = useHistory()
const campsites = useSelector(state=> state.CampsiteReducer.allCampsites)
const campsitesArr = Object.values(campsites)
console.log( "ENV", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY )
let img;
const avgReview = () => {
  let allRatingsArray = []
  campsitesArr.forEach(({reviews}) => {
    reviews.forEach(review => {
      if (review.length === 0) return null
      allRatingsArray.push(review.rating)
    })
  })
  let initialValue = 0
  let avgRating = allRatingsArray.reduce((a, b) => a + b, initialValue);
  return (avgRating/allRatingsArray.length).toFixed(2)
}



useEffect(() => {
    dispatch(loadCampsiteThunk())
}, [dispatch])

const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDwAOqEBw0h4sSsn1ZBnwyflRNsukW8lek",

    libraries: libraries
})


const center = {
    lat: 34.0522,
    lng: -118.2437
  };
const containerStyle = {
    width: 'calc(100% - 300px)',
    height: '900px',
    left: '300px'

  };
const mapRef = useRef()


if (!isLoaded) {
  return null;
}
return (
  <>
    <div className='mapcontainer'>
      <div>
        <button onClick={() => {}}>Campsites</button>
      </div>
      <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={center} zoom={7}
      options={{disableDoubleClickZoom: true}} ref={mapRef} >

{campsites &&
        campsitesArr.map(({ id, name, location, campsiteImages }) => {
          campsiteImages.map(({ image }) => {
            img = image;
          });

          let pos = location.split(",");
          const posObj = { lat: parseInt(pos[0]), lng: parseInt(pos[1]) };

          return (
            <MarkerF
              key={id}
              position={posObj}
              onClick={() => setSelectedId(id)}
            >
              {selectedId === id && (
                <InfoWindow position={posObj}>
                  <div>
                    <NavLink to={`/campsites/${id}`}>
                      <img className="infowindowimage" src={img} />
                      <h>{name}</h>
                    </NavLink>
                    <p>{avgReview()}</p>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          );
        })}
    </GoogleMap>
    </div>
  </>
);
        }
export default HomePageMap;
