import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css'


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	// const redirect = Redirect()



	return (
		<div className="container">
		  <nav className="navbar">
		  <NavLink className="homebutton"exact to="/">AllTerrain</NavLink>

			<div  className="profile-dropdown">
			{isLoaded && (
				<div>
				<ProfileButton user={sessionUser} />
			  </div>
			)}
			</div>
			<NavLink className="campsitesbutton"exact to="/">Campsites</NavLink>


			<div >
			  <NavLink className="campsitesbutton" exact to="/campsites">Add a Campsite</NavLink>
			</div>
			<div >

			  <button className="myplacesbutton" exact to="/myplaces" >My places</button>
			</div>
			<Toggle />
			<div className="aboutcontainer">
				<h4>About the Developer</h4>
				<NavLink className="campsitesbutton" target="_blank" rel='' to={{pathname: 'https://github.com/Vian-K'}}>Github</NavLink>
				<NavLink className="campsitesbutton" target="_blank" rel='' to={{pathname: 'https://www.linkedin.com/in/viankhachatourian/'}}>Linkedin</NavLink>
			</div>
		  </nav>
		</div>
	  );
	}

export default Navigation;
