import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import RC from './ResultContext';

export default function Explanation({children, correct}) {
  const [showResult] = useContext(RC);
  const cls = twMerge('nx-my-2 p-4 rounded-md border border-gray-300',
    correct ? 'bg-green-100' : 'bg-gray-100');
  return showResult ? <div className={cls}>{children}</div> : null;
}