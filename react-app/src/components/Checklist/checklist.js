import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadchecklistThunk } from '../../store/checklist'
import { loadItemThunk } from '../../store/checklistitems'
import Checkbox from 'rc-checkbox';
import "./checklist.css"

function Checklist() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const checklists = Object.values(useSelector(state => state.checklistReducer))
    const items = useSelector(state => state.itemsReducer)
    const [data, setData] = useState(false)
    // const [disabled, setDisabled ] = useState(false)
    const [isComplete, setIsComplete ] = useState()

    useEffect(() => {
        dispatch(loadchecklistThunk())
        // dispatch(loadItemThunk())
    }, [dispatch])

    function checkboxToggle(id, isChecked) {
        console.log(`Checkbox with id ${id} is now ${isChecked ? 'checked' : 'unchecked'}.`);
        setIsComplete(isChecked)
      }

      return (
        <div className="checklistscontainer">
          <h1>Checklists</h1>
          <div className="checklistdata">
            {checklists.map(({ id, name, isComplete }) => {
              return (
                <div>
                  <button onClick={() => setData(id)}>{name}</button>
                </div>
              );
            })}
          </div>
          <div className="itemdata">
            {data &&
              checklists
                .find((checklist) => checklist.id === data)
                ?.checklistitems.map(({ id, checklistid, item }) => {
                  return (
                    <div className="itemcontainer">
                      <div className="item" key={id}>
                        <p>
                          <label>
                            <Checkbox
                              checked={isComplete}
                              type="checkbox"
                              onChange={(e) => checkboxToggle(id, e.target.checked)}

                            />
                            &nbsp; {item}
                          </label>
                          &nbsp;&nbsp;
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      );
    }
export default Checklist;
