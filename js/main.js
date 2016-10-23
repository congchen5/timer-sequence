'use strict';

$(function() {

// Interval in ms to tick.
const INTERVAL = 1000;

var eyeTherapyTimers = [1,2,3,4,5];
//  [1,1,1,1,1,1,3,1,1,3,5,2,2,2,5];

var timer = null;
var timerSequence = null;

class Timer {
  static get INTERVAL() {
    return INTERVAL;
  }

  constructor(countDownTime) {
    this.countDownTime = this.convertCountDownTime(countDownTime);

    this.startTime = 0;
    this.time = 0;
    this.elapsedTime = 0;
    this.displayTime = '0.0';
    this.runTimer = false;

    this.updateDisplay(this.time, 0);
  }

  // Convert the initial countDownTime from minutes to seconds
  convertCountDownTime(countDownTime) {
    return countDownTime * 60;
  }

  tick() {
    this.time += Timer.INTERVAL;

    var currTime = new Date().getTime();
    var offset = currTime - this.startTime + this.elapsedTime - this.time;

    this.updateDisplay(this.time, offset);

    if (this.runTimer) {
      // Check if it's the end.
      // We need to convert countDownTime to ms; thus we multiply by 1000.
      if (this.time >= (this.countDownTime * 1000)) {
        this.playBell();
      }

      window.setTimeout(() => {this.tick();}, Timer.INTERVAL - offset);
    } else {
      this.elapsedTime += currTime - this.startTime;
    }
  }

  updateDisplay(time, offset) {
    var rawPassedTime = this.countDownTime - Math.floor(time / 1000);

    // Prepend with 0 if is a single digit.
    var secDisplay = Math.abs(rawPassedTime % 60);
    if (secDisplay < 10) {
      secDisplay = '0' + secDisplay;
    }

    // Fix issue with negative number showing.
    this.displayTime = Math.floor(rawPassedTime / 60) + ' ' +
        secDisplay;
    if (rawPassedTime < 0) {
      this.displayTime = '-' + this.displayTime;
    }

    $('.timerDisplay').text(this.displayTime);
    $('.offsetDisplay').text(offset);
  }

  playBell() {
    var alarmSound = new Audio('/media/ship-bell.mp3');
    alarmSound.play();
  }

  resetState() {
    this.stop();

    this.time = 0;
    this.elapsedTime = 0;
    this.display = '0.0';
    this.runTimer = false;

    this.updateDisplay(this.display, 0);
  }

  setCountDownTime(countDownTime) {
    this.countDownTime = this.convertCountDownTime(countDownTime);
    this.resetState();
  }

  start() {
    $('#startStopButton').text('Stop');
    this.runTimer = true;
    this.startTime = new Date().getTime();
    window.setTimeout(() => {this.tick();}, Timer.INTERVAL);
  }

  stop() {
    $('#startStopButton').text('Start');
    this.runTimer = false;
  }
}

class TimerSequence {
  constructor(timer, sequence) {
    this.timer = timer;
    this.sequence = sequence;

    this.currIndex = 0;

    // Set up the first timer
    this.setTimer(this.currIndex);
  }

  /*
   * Set up the next timer if there is one. If this succeeds, return true.
   * Otherwise, return false.
   */
  nextTimer() {
    // If we've reached the end of the sequence, return false.
    if (this.currIndex >= this.sequence.length) {
      return false;
    }
    this.timer.stop();
    this.currIndex++;
    this.setTimer(this.currIndex);
    return true;
  }

  /*
   * Set up the prev timer if there is one. If this succeeds, return true.
   * Otherwise, return false.
   */
  prevTimer() {
    // If we're already at the front of the sequence, return false
    if (this.currIndex == 0) {
      return false
    }
    this.timer.stop();
    this.currIndex--;
    this.setTimer(this.currIndex);
    return true;
  }

  // Set up the new timer corresponding to the index
  setTimer(index) {
    this.timer.stop();
    this.timer.setCountDownTime(this.sequence[index]);
  }
}

function init() {
  timer = new Timer(0.1);
  timerSequence = new TimerSequence(timer, eyeTherapyTimers);
};
init();

//======================Button Click Listeners======================
$('#startStopButton').on('click', (event) => {
  if (timer.runTimer) {
    timer.stop();
  } else {
    timer.start();
  }
});

$('#resetButton').on('click', (event) => {
  timer.resetState();
});

$('#prevTimerButton').on('click', (event) => {
  timerSequence.prevTimer();
});

$('#nextTimerButton').on('click', (event) => {
  timerSequence.nextTimer();
});

});
