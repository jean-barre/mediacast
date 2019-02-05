/*
*
* The client side youtube player script
*
*/

var tag = document.createElement('script');

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    screenHeight = w.innerHeight || e.clientHeight || g.clientHeight;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube youtubePlayer)
//    after the API code downloads.
var youtubePlayer;
function onYouTubeIframeAPIReady() {
  youtubePlayer = new YT.Player('youtubePlayer', {
    height: 0.7 * screenHeight,
    width: 0.9 * screenWidth,
    videoId: 'jrTMMG0zJyI',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video youtubePlayer is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

// 5. The API calls this function when the youtubePlayer's state changes.
//    The function indicates that when playing a video (state=1),
//    the youtubePlayer should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  /*
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }*/
}