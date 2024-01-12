import { useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import RC from './ResultContext';

export default function Answer({children, correct}) {
  const [showResult] = useContext(RC);
  const classes = ['nx-my-2 p-4 rounded border border-gray-300'];
  if (showResult && correct) {
    // make bold if this is the correct answer
    classes.push('font-bold');
  }

  return (
    <div className={twMerge([...classes])}>
      {children}
    </div>
  )
}