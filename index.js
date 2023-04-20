const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

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