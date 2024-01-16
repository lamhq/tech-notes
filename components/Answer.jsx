import { useCallback, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import RC from './ResultContext';
import MC from './MultiContext';

export default function Answer({ children, correct }) {
  const isMulti = useContext(MC);
  const [showResult] = useContext(RC);
  const [selected, setSelected] = useState(false);
  const classes = ['nx-my-2 p-4 rounded border border-gray-300'];
  if (showResult) {
    if (correct) {
      // make bold if this is the correct answer
      classes.push('font-bold');
      if (selected) {
        classes.push('text-green-500');
      }
    } else {
      if (selected) {
        classes.push('text-red-500');
      }
    }
  }

  const handleChange = useCallback((e) => {
    setSelected(e.target.checked);
  }, [setSelected]);

  return (
    <div className={twMerge([...classes])}>
      <label>
        {isMulti ? (
          <input
            type="checkbox"
            defaultChecked={selected}
            onChange={handleChange}
          />
        ) : (
          <input
            type="radio"
            name="answer"
            defaultChecked={selected}
            onChange={handleChange}
          />
        )}
        &nbsp;
        {children}
      </label>
    </div>
  )
}