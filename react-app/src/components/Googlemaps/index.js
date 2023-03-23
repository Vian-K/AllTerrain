import React, { useEffect } from 'react';
import { useState, useRef,} from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { StandaloneSearchBox, GoogleMap, useJsApiLoader, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
import "./googlemaps.css"
const google = window.google ? window.google : {}

const MapContainer = ({data}) => {

const [selected, setSelected] = useState(null);
const ref = useRef()
const libraries = ['places', 'geometry'];

const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDwAOqEBw0h4sSsn1ZBnwyflRNsukW8lek",

    libraries: libraries
})
if (!isLoaded) {
  return null;
}

const center = {
    lat: 34.0522,
    lng: -118.2437
  };
const containerStyle = {
    width: '100%',
    height: '810px'
  };

  let map;
  let marker;
  let geocoder;
  let responseDiv;
  let response;



      function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        mapTypeControl: false,
      });
      geocoder = new google.maps.Geocoder();

      const inputText = document.createElement("input");

      inputText.type = "text";
      inputText.placeholder = "Enter a location";

      const submitButton = document.createElement("input");

      submitButton.type = "button";
      submitButton.value = "Geocode";
      submitButton.classList.add("button", "button-primary");

      const clearButton = document.createElement("input");

      clearButton.type = "button";
      clearButton.value = "Clear";
      clearButton.classList.add("button", "button-secondary");
      response = document.createElement("pre");
      response.id = "response";
      response.innerText = "";
      responseDiv = document.createElement("div");
      responseDiv.id = "response-container";
      responseDiv.appendChild(response);

      const instructionsElement = document.createElement("p");

      instructionsElement.id = "instructions";
      instructionsElement.innerHTML =
      "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(
        instructionsElement
        );
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
        marker = new google.maps.Marker({
          map,
        });
        map.addListener("click", (e) => {
          geocode({ location: e.latLng });
        });
        submitButton.addEventListener("click", () =>
        geocode({ address: inputText.value })
        );
        clearButton.addEventListener("click", () => {
          clear();
        });
    clear();
  }

  function clear() {
    marker.setMap(null);
  }
  function geocode(request) {
    console.log("GEOCODE", geocode)
    clear();
    geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
  }

  window.initMap = initMap;



return (
  <>
    <div>
      <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={center} zoom={10} onClick={() => setSelected(selected)}>

      <MarkerF position={{lat:34.0522, lng: -118.2437 }} />
      </GoogleMap>
    </div>
  </>
);
        }
export default MapContainer;
