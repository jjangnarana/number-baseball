import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
        <h1>숫자야구게임</h1>
        <NumberDisplay />
    </div>
  );
}

const NumberDisplay = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleClick = (number) => {
    setSelectedNumber(number);
  }

  return (
    <div className='btns'>
      <div className='display'>
        {selectedNumber !== null ? selectedNumber : ''}
      </div>
      <div className='go-refresh'>
        <button className='go'>go</button>
        <button className='refresh'>refresh</button>
      </div>
      <div className="number-grid">
        {Array.from({ length : 9}, (_, i) => i + 1).map(number => (
          <button className="number-button" key={number} onClick={() => handleClick(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )


}
export default App;
