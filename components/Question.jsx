import { useState, useRef } from 'react';
import RC from './ResultContext';

export default function Question({ children }) {
  const ctxValue = useState();
  return (
    <RC.Provider value={ctxValue}>
      {children}
    </RC.Provider>
  )
}