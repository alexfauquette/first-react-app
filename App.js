import React, { Component } from 'react';
import './App.css';

import Letter from './Letter'

const VISUAL_PAUSE_MSECS=750


class App extends Component {
  state = {
    secretMessage : "HELLO WORLD",
    testedLetters : new Set(),
    letters : "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    currentLetter: ""
  }

  computeDisplay() {
    const { secretMessage, testedLetters, letters, currentLetter } = this.state
    return secretMessage.replace(/\w/g,
      (letter) => (testedLetters.has(letter) ? letter : '_')
    )
  }

  //arrow to get the this
  handleLetterClick = letter => {
    const { secretMessage, testedLetters, letters, currentLetter } = this.state
    if(currentLetter==="" && !testedLetters.has(letter)){
      testedLetters.add(letter)
      this.setState({testedLetters: testedLetters})
      this.setState({currentLetter: letter})
      setTimeout(() => this.setState({ currentLetter: "" }), VISUAL_PAUSE_MSECS)
    }
  }

  getFeedbackForLetter(letter){
    const { secretMessage, testedLetters, letters, currentLetter } = this.state
    if(currentLetter === letter){return "current"}
    else if (testedLetters.has(letter)) {return secretMessage.indexOf(letter)>=0 ? "testedGood" : "testedBad"}
    else{return "toTest"}
  }


  render() {
    const {secretMessage, testedLetters, letters } = this.state

    return (
      <div className="pendu">
        <p>{this.computeDisplay()}</p>
        <div className="alphabet">
          {letters.map((letter, index) => (
            <Letter
            letter={letter}
            feedback={this.getFeedbackForLetter(letter)}
            index={index}
            key={index}
            onClick={this.handleLetterClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
