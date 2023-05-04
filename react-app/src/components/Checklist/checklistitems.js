import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { loadchecklistThunk } from '../../store/checklist'
import { createItemThunk, loadItemThunk } from '../../store/checklistitems'
import "./checklist.css"

const AddItem = (checklistid) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState('')
    const [errors, setErrors ] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!item || item.length === 0) {
            setErrors(['Please enter a name for your item'])
        } else if (item.length > 25) {
            setErrors(['Item name must be less than 25 characters'])
        } else {
            setErrors([])
            await dispatch(createItemThunk(item, checklistid.data))
            dispatch(loadchecklistThunk())
        }
        setItem('')
    }
    return (
        <div className='additem'>
            <form className='additemform'>
                <input className='additeminput'
                type='text'
                placeholder='Add an item'
                value={item}
                maxLength="25"
                onChange={(e) => setItem(e.target.value)}
                />
            <button className='additemsubmitbutton'onClick={handleSubmit}>Submit</button>

                {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
            </form>
        </div>
    )
}

export default AddItem;
