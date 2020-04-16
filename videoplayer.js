var player = videojs("my-video");

player.logo({
  image: "logo.png",
  position:"bottom-left",
  width:27,
  height:28,
  offsetH:102
});
player.seekButtons({
  forward: 30,
  back: 10
});
var options = {
  plugins: {
    httpSourceSelector: {
      default: "auto",
      HD:1080,
      SD:480,

    }
  }
};

var player = videojs("my-video", options);
player.httpSourceSelector();
// player.hlsQualitySelector();

var player = videojs("my-video", {
  playbackRates: [-10, -5, -2, -1, -0.5, 0.5, 1, 2, 5, 10]
});

player.shuttleControls({
  playPauseKeys: [" ", "k"],
  backwardKeys: ["j"],
  forwardKey: ["l"],
  backwardFrameKey: ["ArrowLeft"],
  forwardFrameKey: ["ArrowRight"],
  shiftMagnification: 10,
  fps: 30
});
player.dvr();

var options;

options = {
   controls: true,
   plugins: {
      airPlay: {
         addButtonToControlBar: true, // defaults to `true`
      }
   }
};


var player = videojs( 'my-video',
  {
    controlBar: {
      volumeMenuButton: {
          inline: false
      }
    },
    plugins: {
      responsiveLayout: {}
    }
  },
  function() {
    console.log('Good to go!');
    this.play();
  }
);

var myButton = player.controlBar.addChild("button");
var myButtonDom = myButton.el();
myButtonDom.innerHTML = "Donar";
myButtonDom.onclick = function(){
  window.location.href = "https://donaciones.avivamiento.com/"
}  
