import './App.css';
import Logo from './logo.svg'
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header>
        <a href="http://localhost:3000/">
          <img src={Logo} alt="" className='logo'/>
        </a>
        <h1>숫자야구게임</h1>
      </header>
        <NumberDisplay />
    </div>
  );
}

const NumberDisplay = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(null);

  const handleClick = (number) => {
    setSelectedNumbers(prevNumbers => {
      if (prevNumbers === null) {
        return [number];
      }
      if (!prevNumbers.includes(number) && prevNumbers.length < 4) {
        return [...prevNumbers, number];
      }
      return prevNumbers;
    });
  };

  const handleRefresh = () => {
    setSelectedNumbers([]);
  }
  return (
    <div className='btns'>
      <div className='display'>
        {selectedNumbers !== null ? selectedNumbers.map((number, index) => (
          <div key={index}>{number}</div>
        )) :''}
      </div>
      <div className='go-refresh'>
        <button 
          className='go'
          disabled={selectedNumbers && selectedNumbers.length === 4 ? false : true}
        >go!</button>
        <button className='refresh' onClick={handleRefresh}>refresh</button>
      </div>
      <div className="number-grid">
        {Array.from({ length : 9}, (_, i) => i + 1).map(number => (
          <button
            className="number-button"
            key={number}
            onClick={() => handleClick(number)}
            disabled={selectedNumbers && selectedNumbers.includes(number)}
            >
            {number}
          </button>
        ))}
      </div>
    </div>
  )


}
export default App;
