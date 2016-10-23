'use strict';

$(function() {

// Interval in ms to tick.
const INTERVAL = 1000;

class Timer {

  static get INTERVAL() {
    return INTERVAL;
  }

  constructor(countDownTime) {
    this.countDownTime = this.convertCountDownTime(countDownTime);
    this.countDownTimeMs = this.countDownTime * 1000;

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
      if (this.time >= this.countDownTimeMs) {
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

    this.displayTime = Math.round(rawPassedTime / 60) + ' ' +
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

var timer = new Timer(0.1);

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

});
