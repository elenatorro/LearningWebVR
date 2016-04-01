'use strict'

// Capture video, code from: https://davidwalsh.name/browser-camera
// Put event listeners into place

window.addEventListener('DOMContentLoaded', function () {
  // Grab elements, create settings, etc.
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var video = document.getElementById('video')
  var videoObj = {
    'video': true
  }
  var errBack = function (error) {
    console.log('Video capture error: ', error.code)
  }

  // Put video listeners into place
  if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function (stream) {
      video.src = stream
      video.play()
    }, errBack)
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function (stream) {
      video.src = window.webkitURL.createObjectURL(stream)
      video.play()
    }, errBack)
  } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function (stream) {
      video.src = window.URL.createObjectURL(stream)
      video.play()
    }, errBack)
  }

  var capture = new craftar.Capture(video)
  console.log(capture)
}, false)
