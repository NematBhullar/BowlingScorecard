import './App.css';
import React, { useState } from 'react';

function App() {
  let [frame, setFrame] = useState(1);
  let [roll, setRoll] = useState(1);
  let [playerScore, setPlayerScore] = useState(0);
  const listButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let [strike, setStrike] = useState(false);
  let [prevStrike, setPrevStrike] = useState(false);
  const [spare, setSpare] = useState(false);

  const displayValue = (e) => {
    // The message box 
    document.getElementById('thisframe').innerText = "You knocked down " + e.target.value + " pin(s)";
    
    // If it is the first roll of the frame, set the value of the current roll
    if (roll === 1) {
      const currRoll = document.getElementById('F' + frame + 'r1');
      currRoll.value = parseInt(e.target.value);
      currRoll.innerText = currRoll.value;
      
      if (spare) {
        let prevFrameNo = frame - 1;
        const prevFrame = document.getElementById('F' + prevFrameNo + 'score');
        prevFrame.value = prevFrame.value + currRoll.value;
        prevFrame.innerText = playerScore + prevFrame.value;
        setPlayerScore(playerScore + prevFrame.value);
        setSpare(false);
      }

      if (strike) {
        let prevFrameNo = frame - 1;
        const prevFrame = document.getElementById('F' + prevFrameNo + 'score');
        prevFrame.value = prevFrame.value + currRoll.value;
        
        if (prevStrike) {
          let strikeFrameNo = frame - 2;
          const strikeFrame = document.getElementById('F' + strikeFrameNo + 'score');
          strikeFrame.value = strikeFrame.value + currRoll.value;
          strikeFrame.innerText = playerScore + strikeFrame.value;
          setPlayerScore(playerScore + strikeFrame.value);
          setStrike(false);
        } 
        setPrevStrike(false);
      }

      // Update the current frame value
      const frameScore = document.getElementById('F' + frame + 'score');
      frameScore.value = currRoll.value;

      // If it is a strike, then skip to the next frame
      // Otherwise, move to the next roll of the current frame
      if (currRoll.value === 10) {
        
        // Check if there is an ongoing strike
        if (strike) {
          setPrevStrike(true);
        }
        setStrike(true);
        
        if (frame === 10) {
          setRoll(2);
        } else {
          setRoll(1);
          setFrame(frame + 1);
        }
        
      } else {
        setRoll(2);
      }

    // If it is the second roll of the frame
    } else if (roll === 2) {
      
      // If the total pins in the current frame are more than 10, then throw an error
      if ((parseInt(e.target.value) + parseInt(document.getElementById('F' + frame + 'r1').value) > 10) && frame !== 10) {
        document.getElementById('thisframe').innerText = "Invalid Input";
      
      } else {
        const currRoll = document.getElementById('F' + frame + 'r2');
        currRoll.value = parseInt(e.target.value);
        currRoll.innerText =  currRoll.value;

        if (strike) {
          let prevFrameNo = frame - 1;
          const prevFrame = document.getElementById('F' + prevFrameNo + 'score');
          prevFrame.value = prevFrame.value + currRoll.value;
          prevFrame.innerText = playerScore + prevFrame.value
          setPlayerScore(playerScore + prevFrame.value);
          setStrike(false);
        }
  
        // Update the current frame value
        let r1Val = parseInt(document.getElementById('F' + frame + 'r1').value);
        let r2Val = parseInt(document.getElementById('F' + frame + 'r2').value);

        if (r1Val + r2Val === 10) {
          setSpare(true);
        } 

        if (frame === 10 && r2Val === 10) {
          setStrike(true);
        }

        const frameScore = document.getElementById('F' + frame + 'score');
        frameScore.value = r1Val + r2Val;

        if (r1Val + r2Val === 10 || prevStrike || strike) {
          if (frame === 10) {
            setRoll(3);
          } else {
            setRoll(1);
            setFrame(frame + 1);
          }
        } else {
          if (frame === 10) {
            setPlayerScore(playerScore + frameScore.value);
            document.getElementById('thisframe').innerText = "End Game";
            listButtons.map(ea => document.getElementById(ea).disabled = true);
          } else {
            frameScore.innerText = playerScore + frameScore.value;
            setPlayerScore(playerScore + frameScore.value);
            setRoll(1);
            setFrame(frame + 1);
          }
        }
      }

    } else {
      const currRoll = document.getElementById('F' + frame + 'r3');
      currRoll.value = parseInt(e.target.value);
      currRoll.innerText = currRoll.value;

      const frameScore = document.getElementById('F' + frame + 'score');
      
      if (spare || prevStrike || strike) {
        frameScore.value = frameScore.value + currRoll.value; 
      }

      frameScore.innerText = playerScore + frameScore.value;
      setPlayerScore(playerScore + frameScore.value);
      
      document.getElementById('thisframe').innerText = "End Game";
      listButtons.map(ea => document.getElementById(ea).disabled = true);
    }
  }

  return (
    <div>
      <div id='thisframe'></div>
      <div id='scoreboard' className='scoreboard'>
        {frames.map(ea => 
          <div value={0} id={'F' + ea} key={'F' + ea} className='frame'>
            {ea}
            <div className='pins'>
              <div id={'F' + ea + 'r1'}></div>
              <div id={'F' + ea + 'r2'}></div>
            </div>
            <div className='frame-score' value={0} id={'F' + ea + 'score'} key={'F' + ea + 'score'}></div>
          </div>
        )}
        <div value={0} id={'F' + 10} key={'F' + 10} className='frame'>
            {10}
            <div className='pins'>
              <div id={'F' + 10 + 'r1'}></div>
              <div id={'F' + 10 + 'r2'}></div>
              <div id={'F' + 10 + 'r3'}></div>
            </div>
            <div className='frame-score' value={0} id={'F' + 10 + 'score'} key={'F' + 10 + 'score'}></div>
          </div>
      </div>
      <div id='score'>Score: {playerScore}</div>
      <div className='buttons'>
        {listButtons.map(ea => 
          <button value={ea} id={ea} key={ea} onClick={(e) => displayValue(e)}>{ea}</button>
        )}
      </div>
    </div>
  );
}

export default App;
