'use strict';

$(function() {

var INTERVAL = 100;

console.log('hello world');

var startTime = 0;
var time = 0;
var offset = 0;
var display = '0.0';
var runTimer = false;

function tick() {
  time += 100;

  var currTime = new Date().getTime();
  var elapsed = currTime - startTime + offset - time;

  display = Math.floor(time / 100) / 10;
  if (Math.round(display) == display) {
    display += '.0';
  }
  updateDisplay(display, elapsed);

  if (runTimer) {
    window.setTimeout(tick, INTERVAL - elapsed);
  } else {
    offset += currTime - startTime;
  }
};

function updateDisplay(display, elapsed) {
  $('.timerDisplay').text(display);
  $('.offsetDisplay').text(elapsed);
};

function resetState() {
  stop();

  time = 0;
  offset = 0;
  display = '0.0';
  runTimer = false;

  updateDisplay(display, 0);
};

function start() {
  runTimer = true;
  startTime = new Date().getTime();
  window.setTimeout(tick, INTERVAL);
};

function stop() {
  runTimer = false;
};

$('#startStopButton').on('click', (event) => {
  if (runTimer) {
    stop();
    $('#startStopButton').text('Start');
  } else {
    start();
    $('#startStopButton').text('Stop');
  }
});

$('#resetButton').on('click', (event) => {
  resetState();
});

});
