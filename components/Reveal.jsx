import { useContext } from 'react';
import RC from './ResultContext';

export default function Reveal() {
  const [showResult, setShowResult] = useContext(RC);
  function handleClick() {
    setShowResult(!showResult);
  }
  return (<>
    <button
      className="!bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      data-ripple-light="true"
      type="button"
      onClick={handleClick}
    >
    {showResult ? 'Hide Answer' : 'Show Answer'}
    </button>
  </>
  )
}