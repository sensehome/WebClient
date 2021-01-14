const AudioService = {
  alert: () => {
    let audio = new Audio('assets/beep.mp3');
    audio.play();
  }
};


export default AudioService;