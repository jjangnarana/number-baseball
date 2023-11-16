import './App.css';
import Logo from './logo.svg'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

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
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [history, setHistory] = useState(null);
  const [IsProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (guess && guess.length === 4) {
      setIsProcessing(true); 
    }
    try {
      setAttempts(prev => prev + 1);
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          guess:guess,
          attempts:attempts
        }),
      });
      const res = await response.text();
      setResult(res);
      setHistory(prevHistorys => {
        if (prevHistorys === null) {
          return [
            {
            'guess':guess,
            'hint':res
            }
          ]
        } else {
          return [...prevHistorys,
            {
              'guess':guess,
              'hint':res
            }
          ]
        }
      })
      setGuess(null);
      if (attempts >= 9 && res !== "HOMERUN") {
        setIsGameOver(true);
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setIsProcessing(false); 
    }
  }; 

  const handleRestart = () => {
    setGuess(null);
    setResult('');
    setHistory(null);
    setAttempts(0);
    setIsGameOver(false);
  }

  const handleClick = (number) => {
    setResult('')
    setGuess(prevNumbers => {
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
    setGuess([]);
  
  }

  const Overlay = ({ onRestart }) => (
    <div className="overlay">
      <div className="modal">
        <p>게임 오버!</p>
        <button onClick={onRestart}>다시시작</button>
      </div>
    </div>
  );

  const isButtonDisabled = guess !== null && guess.length >= 4;

  return (
    <div className='btns'>
      <div className='display'>
        {Array.from({ length: result.length > 4 ? result.length : 4}).map((_, index) => (
            <div key={index} className='display-item'>
              {result && result.length > index ? result[index]:''}
              {guess && guess.length > index ? guess[index]:''}
            </div>
      ))}
      </div>
      <div className='history'>히스토리
          {history && history.map((history, index) => (<div key={index} className='history-item'>{index+1}번째 타석: {history.guess} - {history.hint}</div>))}
      </div>
      {isGameOver && (<div>gameOver</div>)}
      {isGameOver && <Overlay onRestart={handleRestart} />}
      {result === "HOMERUN" && <button onClick={handleRestart}>한판더!</button>}
      <div className='attempts'>시도 횟수: {attempts}/10</div>
      <div className='swing-refresh'>
        <button 
          className='swing'
          disabled={IsProcessing || !(guess && guess.length === 4)}
          onClick={handleSubmit}
        >Swing!</button>
        <button className='refresh' onClick={handleRefresh}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
      <div className="number-grid">
        {Array.from({ length : 9 }, (_, i) => i + 1).map(number => (
          <button
            className="number-button"
            key={number}
            onClick={() => handleClick(number)}
            disabled={isButtonDisabled || (guess && guess.includes(number))}
            >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App;
