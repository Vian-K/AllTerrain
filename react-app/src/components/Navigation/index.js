import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import HomePageMap from '../Googlemaps/homepagemap';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	// const redirect = Redirect()
	return (
		<div className="container">
		  <nav className="navbar">
			<NavLink exact to="/">Home</NavLink>

			{isLoaded && (
			  <div className="profile-dropdown">
				<ProfileButton user={sessionUser} />
			  </div>
			)}

			<div className="addbutton">
			  <button onClick={() => history.push("/campsites")}>Add a Campsite</button>
			</div>
			<div className='Myplacesbutton'>

			  <button>My places</button>
			</div>
		  </nav>
		</div>
	  );
	}

export default Navigation;
