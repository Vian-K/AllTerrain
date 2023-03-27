import React, { useEffect } from 'react';
import { useState, useRef} from 'react';
import { StandaloneSearchBox, GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
import "./googlemaps.css"


const MapContainer = ({setLocation}) => {
const [selected, setSelected] = useState(null);

const libraries = ['places', 'geometry'];


const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDwAOqEBw0h4sSsn1ZBnwyflRNsukW8lek",

    libraries: libraries
})


const center = {
    lat: 34.0522,
    lng: -118.2437
  };
const containerStyle = {
    width: '100%',
    height: '900px',
    left: '300px'

  };
const mapRef = useRef()

const mapClick = (e) => {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()

      // mapRef.current.panTo({lat, lng})
      setSelected({lat, lng});

  }
  const setCoordinates = () => {
    if (selected) {
      const { lat, lng } = selected;
      setLocation(`${lat}, ${lng}`)

    }
  }

const onRightClick = (e) => {
    e.preventDefault()
    setSelected(null);

  }
  console.log("SELECTED", selected)


if (!isLoaded) {
  return null;
}
return (
  <div className="mapcontainer">
    <div  onContextMenu={onRightClick}>
      <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={selected || center} zoom={10} options={{disableDoubleClickZoom: true}} ref={mapRef} onClick={(e) => mapClick(e)}>

      {selected && (
          <MarkerF
            position={selected}>

            <InfoWindow position={selected}>
              <div>

                <p>Latitude: {selected.lat.toFixed(4)}</p>
                <p>Longitude: {selected.lng.toFixed(4)}</p>
                <button onClick={(e) => setCoordinates(e)}>Select</button>
              </div>
            </InfoWindow>
          </MarkerF>
        )}


      </GoogleMap>
    </div>
  </div>
);
        }
export default MapContainer;
