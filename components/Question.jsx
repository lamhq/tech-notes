import { useState } from 'react';
import RC from './ResultContext';
import MC from './MultiContext';

export default function Question({ children, multi }) {
  const ctxValue = useState();
  return (
    <RC.Provider value={ctxValue}>
      <MC.Provider value={multi}>
        {children}
      </MC.Provider>
    </RC.Provider>
  )
}