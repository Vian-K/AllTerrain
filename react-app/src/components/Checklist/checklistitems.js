import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { loadchecklistThunk } from '../../store/checklist'
import { createItemThunk, loadItemThunk } from '../../store/checklistitems'


const AddItem = (checklistid) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState('')
    const [errors, setErrors ] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!item || item.length === 0) {
            setErrors(['Please enter a name for your item'])
        } else if (item.length > 100) {
            setErrors(['Item name must be less than 100 characters'])
        } else {
            setErrors([])
            await dispatch(createItemThunk(item, checklistid.data))
            dispatch(loadchecklistThunk())
        }
        setItem('')
    }
    return (
        <div>
            {errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
            <form>
                <input className='additemform'
                type='text'
                placeholder='Add an item'
                value={item}
                onChange={(e) => setItem(e.target.value)}
                />
            <button onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default AddItem;
