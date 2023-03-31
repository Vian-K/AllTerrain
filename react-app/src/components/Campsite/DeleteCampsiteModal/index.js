import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteCampsiteThunk } from "../../../store/Campsites";
import "./deletecampsitemodal.css"

const DeleteButtonModal = ({id}) => {
const dispatch = useDispatch()
const { closeModal } = useModal();
const history = useHistory()


  const handleCancel = () => {
    closeModal();
  };

const handleConfirm = async () => {
   await dispatch(deleteCampsiteThunk(id.id))
   .then(() => history.push('/'))

   closeModal()
}
    return (
        <>
        <div>
            <div>
            <h1 className='deleteheader'>Are you sure you want to delete this Campsite?</h1>

            </div>
            <button className='nobutton' onClick={handleCancel}>No</button>
            <button className='yesbutton'onClick={handleConfirm}>Yes</button>
        </div>
        </>
    )
}

export default DeleteButtonModal;
