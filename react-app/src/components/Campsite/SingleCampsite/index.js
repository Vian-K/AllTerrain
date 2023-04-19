import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteCampsiteThunk, editCampsiteThunk, singleCampsiteThunk } from "../../../store/Campsites";
import { createPlacesThunk, loadPlacesThunk } from "../../../store/myPlaces";
import OpenModalButton from "../../OpenModalButton";
import DeleteButtonModal from "../DeleteCampsiteModal"
import { useModal } from "../../../context/Modal";
import Reviews from "../../Reviews";
import "./singlecampsite.css"

const SingleCampsite = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const history = useHistory()
    const campsiteDetail = useSelector(state => state.CampsiteReducer.singleCampsite.campsite)
    const myplaces = useSelector(state => state.placesReducer.allPlaces || [])
    const myplacesObj = Object.values(myplaces)
    const user = useSelector(state => state.session.user)
    const [info, showInfo] = useState(true)
    const [reviews, showReviews] = useState(false)
    const { closeModal } = useModal();
    const [showMenu, setShowMenu] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const ulRef = useRef()

    useEffect(() => {
        dispatch(singleCampsiteThunk(id.id))
        dispatch(loadPlacesThunk())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      useEffect(() => {
        const match = myplacesObj.some(({campsiteid}) => campsiteid == id.id)

        if(match) setIsAdded(true)

    }, [myplacesObj, id.id])

    
    if(!campsiteDetail) {
       return <div className="pagenotfound">
       <h1>404 Not Found</h1>
       <div>
       <p>Sorry, the page you are looking for doesn't exist.</p>

       </div>
     </div>
    }

    const closeMenu = () => setShowMenu(false);

    const reviewsVisible = () => {
        showReviews(true)
        showInfo(false)
    }
    const infoVisible = () => {
        showInfo(true)
        showReviews(false)

    }

    const handleCreate = () => {
        dispatch(createPlacesThunk(id.id))
        setIsAdded(true)
    }
    return(
        <div className="maindetailscontainer">
            <div className="inforeviewbuttons">
                <button className="infobutton"onClick={infoVisible}>Info</button>
                <button className="reviewbutton" onClick={reviewsVisible}>Reviews</button>
            </div>

            {info && (
                <div className='infopage'>
                    {campsiteDetail.campsiteimages.map(({image}) => {
                        return <img className="detailsimages" src={image}></img>
                    })}
                </div>
            )}

            {info && (
                <div className="campsitedetailscontainer">
                    <h1>{campsiteDetail.name}</h1>
                    <div>
                        <div>
                            <p>Cost: ${campsiteDetail.cost}/night</p>
                        </div>
                        <div>
                            <p>Details:</p>
                            <p className="details">{campsiteDetail.details}</p>
                        </div>
                        <div>
                            <p>Cleanliness: {campsiteDetail.cleanliness}</p>
                        </div>
                        <div>
                            <p>Road Difficulty: {campsiteDetail.roaddifficulty}</p>
                        </div>
                        <div>
                            <p>Accessibility: {campsiteDetail.accessibility}</p>
                        </div>
                        <div>
                            <p>Cell Data: {campsiteDetail.celldata}</p>
                        </div>
                        <div>
                            <p>Land Type: {campsiteDetail.landtype}</p>
                        </div>
                        <div>
                        {user && campsiteDetail.owner === user?.id ? (
                        <div>
                        <button className="editbutton" onClick={() => history.push(`/campsites/edit/${id.id}`)}>Edit your Campsite</button>
                        <OpenModalButton
                        buttonText="Delete"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteButtonModal id={id} />}
                        />
                        </div>
                        ) : null}

                        </div>
                        <button className="addtoplacesbutton" onClick={handleCreate} disabled={isAdded}>
                        {isAdded ? "Added to My Places" : "Add to My places"}</button>
                    </div>
                </div>
            )}

            {reviews && (

                    <Reviews />

            )}
        </div>
    )
}

export default SingleCampsite;
