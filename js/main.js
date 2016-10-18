'use strict';

$(function() {

const INTERVAL = 100;

class Timer {

  static get INTERVAL() {
    return INTERVAL;
  }

  constructor(countDownTime) {
    this.startTime = 0;
    this.time = 0;
    this.offset = 0;
    this.display = '0.0';
    this.runTimer = false;
  }

  tick() {
    this.time += 100;

    var currTime = new Date().getTime();
    var elapsed = currTime - this.startTime + this.offset - this.time;

    this.display = Math.floor(this.time / 100) / 10;
    if (Math.round(this.display) == this.display) {
      this.display += '.0';
    }
    this.updateDisplay(this.display, elapsed);

    if (this.runTimer) {
      window.setTimeout(() => {this.tick();}, Timer.INTERVAL - elapsed);
    } else {
      this.offset += currTime - this.startTime;
    }
  }

  updateDisplay(display, elapsed) {
    $('.timerDisplay').text(display);
    $('.offsetDisplay').text(elapsed);
  }

  playBell() {
    var alarmSound = new Audio('/media/ship-bell.mp3');
    alarmSound.play();
  }

  resetState() {
    this.stop();

    this.time = 0;
    this.offset = 0;
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

var timer = new Timer();

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
