import { useContext } from 'react';
import RC from './ResultContext';

export default function Explanation({children}) {
  const [showResult] = useContext(RC);
  return showResult ? <div className="nx-my-2 p-4 rounded-md border border-gray-300 bg-gray-100 dark:bg-slate-600">{children}</div> : null;
}