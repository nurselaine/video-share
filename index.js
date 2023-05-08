// // const io = require('socket.io-client');
// import { io } from 'socket.io-client';
// // let socket = io('https://localhost:3000');
// let socket = io();

const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// const messages = document.getElementById('messages');
// const form = document.getElementById('form');
// const input = document.getElementById('input');

// let username;
// let connected = false;
// let typing = flase;
// let currentInput = input.focus();

// // set client username
// const addParticipantsMessage = (data) => {
//   let message = '';
//   if(data.numUsers === 1){
//     message += 'there\'s 1 participant';
//   } else {
//     message += `there are ${data.numUsers} participants`;
//   }
//   console.log(message);
// }

// const setUsername = () => {
//   username = cleanInput(input.val().trim());

//   if(username) {
//     socket.emit('add user', username);
//   }
// }

// const sendMessage = () => {
//   let message = input.val();
//   message = cleanInput(message);
//   if(message && connected){
//     input.val('');
//     socket.emit('new message', message);
//   }
// }

//   // Prevents input from having injected markup
//   const cleanInput = (input) => {
//     return $('<div/>').text(input).html();
//   }

let displayMediaOptions = {
  video: {
    cursor: "always",
    height: 1000,
    width: 1200,
  },
  audio: false,
};

// set up event for start & stop buttons

startElem.addEventListener("click", function(e) {
  startCapture();
}, false);

stopElem.addEventListener("click", function(e) {
  stopCapture();
}, false);

async function startCapture(){
  try{
    // need help understanding this line
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    // navigator: this represents the browser
    // mediaDevices: provides access to connected media input
    // like screen sharing - lets you access any hardware source
    // .getDisplayMedia() prompts user to select and grant
    // 
  } catch (e){
    console.error(`Error has occured: ${e.message}`);
  }
}

function stopCapture(e){
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}

// dumps the media track capbilities to the console
// this is not making sense to me - where does the method get video tracks come from?
function dumpOptionsInfo(){
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];
  console.info("track settings: ");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
