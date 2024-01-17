import { useCallback, useContext, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import RC from './ResultContext';
import MC from './MultiContext';
import SC from './SelectedContext';

export default function Answer({ children, correct }) {
  const isMulti = useContext(MC);
  const selecteds = useContext(SC);
  const [showResult] = useContext(RC);
  const ref = useRef();
  const checked = !!ref.current && selecteds.includes(ref.current);
  const classes = ['nx-my-2 p-4 rounded border border-gray-300'];
  if (showResult) {
    if (correct) {
      // make bold if this is the correct answer
      classes.push('font-bold');
      // if user choose the right answer, show green
      if (checked) {
        classes.push('text-green-500');
      }
    } else {
      // if user choose the wrong answer, show red
      if (checked) {
        classes.push('text-red-500');
      }
    }
  }

  return (
    <div className={twMerge([...classes])}>
      <label>
        <input
          type={isMulti ? 'checkbox' : 'radio'}
          ref={ref}
          checked={checked}
          readOnly
        />
        &nbsp;
        {children}
      </label>
    </div>
  )
}