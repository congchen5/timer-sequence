'use strict';

$(function() {

var INTERVAL = 100;

console.log('hello world');

var startTime = new Date().getTime();
var time = 0;
var display = '0.0';
var runTimer = false;

function tick() {
  time += 100;

  var currTime = new Date().getTime();
  var offset = currTime - startTime - time;

  display = Math.floor(time / 100) / 10;
  if (Math.round(display) == display) {
    display += '.0';
  }
  $('.timerDisplay').text(display);

  if (runTimer) {
    window.setTimeout(tick, INTERVAL - offset);
  }
};

function resetState() {
  runTimer = false;

};

$('#startStopButton').on('click', (event) => {
  if (runTimer) {
    runTimer = false;
  } else {
    runTimer = true;
    window.setTimeout(tick, INTERVAL);
  }
});

$('#resetButton').on('click', (event) => {
});

});
