import { useState } from 'react';
import RC from './ResultContext';
import MC from './MultiContext';
import SC from './SelectedContext';

export default function Question({ children, multi }) {
  const [selecteds, setSelected] = useState([]);
  const showResultState = useState();

  // record selected input on input change
  const handleChange = (e) => {
    const item = e.target;
    let newSelecteds = [...selecteds];
    if (multi) {
      if (e.target.checked) {
        newSelecteds.push(item);
      } else {
        newSelecteds = newSelecteds.filter(f => f !== item);
      }
    } else {
      newSelecteds = [item];
    }
    setSelected(newSelecteds);
  }

  return (
    <RC.Provider value={showResultState}>
      <MC.Provider value={multi}>
        <SC.Provider value={selecteds}>
          <form onChange={handleChange}>
            {children}
          </form>
        </SC.Provider>
      </MC.Provider>
    </RC.Provider>
  )
}