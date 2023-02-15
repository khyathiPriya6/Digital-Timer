import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeRange: 25, numberOfSeconds: 0}

  changeIsTimerRunning = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  increaseTimeRange = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({timeRange: prevState.timeRange + 1}))
    }
  }

  decreaseTimeRange = () => {
    const {isTimerRunning, timeRange} = this.state
    if (isTimerRunning === false && timeRange > 1) {
      this.setState(prevState => ({timeRange: prevState.timeRange - 1}))
    }
  }

  resetTimer = () => {
    this.setState({isTimerRunning: false, timeRange: 25, numberOfSeconds: 0})
    this.clearTimer()
  }

  startOrPause = () => {
    const {isTimerRunning, timeRange, numberOfSeconds} = this.state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    const timerCompleted = numberOfSeconds === timeRange * 60
    if (timerCompleted) {
      this.setState({isTimerRunning: false})
      this.clearTimer()
    }
    if (isTimerRunning) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  startTimerCountDown = () => {
    const {numberOfSeconds, timeRange} = this.state
    const timerCompleted = numberOfSeconds === timeRange * 60
    if (timerCompleted) {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        numberOfSeconds: prevState.numberOfSeconds + 1,
      }))
    }
  }

  convertTimeToTimerFormat = () => {
    const {timeRange, numberOfSeconds} = this.state
    const timeInSeconds = timeRange * 60 - numberOfSeconds

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  render() {
    console.log(this.state)
    const {isTimerRunning, timeRange} = this.state
    const playBtnText = isTimerRunning ? 'Pause' : 'Start'
    const playBtnImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="main-container">
        <h1>Digital Timer</h1>
        <div className="app-container">
          <div className="digital-timer-container">
            <div className="timer-container">
              <h1 className="timer">{this.convertTimeToTimerFormat()}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-operations">
            <div className="buttons-container">
              <button
                type="submit"
                className="buttons"
                onClick={this.startOrPause}
              >
                <img
                  src={playBtnImg}
                  alt="play icon"
                  className="pass-play-img"
                />
                <p className="button-names">{playBtnText}</p>
              </button>
              <button
                type="submit"
                className="buttons"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="pass-play-img"
                />
                <p className="button-names">Reset</p>
              </button>
            </div>
            <div className="set-timer-container">
              <p className="set-timer-text">Set Timer limit</p>
              <div className="time-control-container">
                <button
                  className="inc-dec-btn"
                  type="submit"
                  onClick={this.decreaseTimeRange}
                >
                  -
                </button>
                <div className="timing-container">
                  <p className="timeRange">{timeRange}</p>
                </div>
                <button
                  className="inc-dec-btn"
                  type="submit"
                  onClick={this.increaseTimeRange}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
