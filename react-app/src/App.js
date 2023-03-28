import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Campsites from "./components/Campsite";
import SingleCampsite from "./components/Campsite/SingleCampsite"
import MapContainer from "./components/Googlemaps";
import CreateCampsite from "./components/Campsite/AddCampsite";
import EditCampsite from "./components/Campsite/EditCampsite"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Campsites />
          </Route>
          <Route exact path="/campsites/:id">
            <SingleCampsite />
          </Route>
          <Route exact path='/campsites/'>
            <CreateCampsite />
          </Route>
          <Route exact path='/campsites/edit/:id'>
            <EditCampsite />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          <Route path="/campsites/*">
            <NotFound />
          </Route>

        </Switch>
      )}
    </>
  );
}

function NotFound() {

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
    </div>
  );
}

export default App;
