import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadchecklistThunk, createChecklistThunk, deletechecklistThunk } from '../../store/checklist'
import { deleteItemThunk } from '../../store/checklistitems'
import ChecklistItem from './checklistitems'
import Checkbox from 'rc-checkbox';
import "./checklist.css"

function Checklist() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const checklists = Object.values(useSelector(state => state.checklistReducer))
    const [data, setData] = useState(false)
    const [name, setName] = useState('')
    const [checkedItems, setCheckedItems] = useState([])
    const [errors, setErrors] = useState([]);


    useEffect(() => {
      dispatch(loadchecklistThunk())
    }, [dispatch]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || name.length === 0) {
          setErrors(['Please enter a name for your checklist']);
        } else if (name.length > 255) {
          setErrors(['Name must be less than 255 characters']);
        } else {
          setErrors([]);
          dispatch(createChecklistThunk(name, user.id)).then(() => {
          dispatch(loadchecklistThunk())
          })

          setName('');
        }
      };


      function checkboxToggle(id, isChecked) {
        if (isChecked) {
          setCheckedItems([...checkedItems, id]);
        } else {
          setCheckedItems(checkedItems.filter((item) => item !== id));
        }
      }

      if(!user) {
        return <h1 className="checklistscontainer">Please log in to view and create your checklists</h1>
      }
      return (
        <div className="checklistscontainer">
          <h1>Checklists</h1>
          <div className="checklistdata">

            {checklists.map(({ id, name, userid }) => {
              if(userid === user.id)
              return (
                <div>
                  <button className='checklistbutton'onClick={() => setData(id)}>{name}</button>

                </div>
              );
            })}

            <div>
              <form>
                <input className='addchecklistform'
                  type='text'
                  placeholder='Create a checklist'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            <button onClick={handleSubmit} className='checklistsubmitbutton' type='submit'>Create</button>
            {errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
              </form>

            </div>
          </div>

          <div className="itemdata">

            {data &&
              checklists
                .find((checklist) => checklist.id === data)
                ?.checklistitems.map(({ id, checklistid, item }) => {

                  if(!item || item.length === 0) {
                    return <div className="itemcontainer">
                      <h3>You have no items in this checklist</h3>
                    </div>
                  } else
                  return (
                    <div className="itemcontainer">

                      <div className="item" key={id}>

                          <label>
                          <Checkbox
                            checked={checkedItems.includes(id)}
                            type="checkbox"
                            onChange={(e) => checkboxToggle(id, e.target.checked)}
                                    />
                            &nbsp; {item}
                          </label>
                          &nbsp;&nbsp;
                      </div>
                      <button onClick={() => dispatch(deleteItemThunk(id)).then(() => dispatch(loadchecklistThunk()))}>Delete</button>

                    </div>
                  );
                })}
                <ChecklistItem data={data}/>
          </div>
                <button onClick={() => dispatch(deletechecklistThunk(data)).then(() => dispatch(loadchecklistThunk()))}>Delete this Checklist</button>
        </div>
      );
    }
export default Checklist;
