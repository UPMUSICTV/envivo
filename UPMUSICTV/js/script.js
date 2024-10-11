// In order for this demo to work, duration must be included for each playlist item.

var player = jwplayer("player");

const playerInstance = player.setup({
  'playlist': 'https://cdn.jwplayer.com/v2/playlists/Rc7zTwZd',
  logo: {
file: 'img/logo.png',
link: 'http://google.com'
},
controls:true,

});

var myseconds=0;
var playBtn = document.getElementById('play');
var pauseBtn = document.getElementById('pause');

playBtn.addEventListener('click', function() {
  // player.play(true);
  
  runApp()
});

pauseBtn.addEventListener('click', function() {
  player.pause(true);
  
});

//playerInstance.on('displayClick', playerInstance.pause);
playerInstance.on('playlistComplete', runApp())


playerInstance.on('ready', function() {
  
  runApp()
  

});

function runApp()
{
  var seconds = processTime()
  var video=getVideo(seconds);
  //playVideo(video);
  playVideo(video);
}
function processTime()
{
  var playlist = playerInstance.getPlaylist();
var playlistduration = 0;
for (var myindex = 0; myindex < playlist.length; myindex++) {
    var videoduration = Math.round(playlist[myindex]['duration']);    
    playlistduration += videoduration;
    
  }


  const thisDate = new Date();
  
  //const seconds = (thisDate.getMinutes() * 60) + thisDate.getSeconds(); 


///////////////////////////////////////////////////////////////////////////////////////////
  const seconds = (thisDate.getHours()*60*60) + (thisDate.getMinutes() * 60) + thisDate.getSeconds(); 
  
  if(playlistduration<seconds)
  {
    const repeating = (seconds/playlistduration);    
    
    //alert(repeating)

    var decimal = repeating - Math.floor(repeating)

    //alert(decimal)

    const finalSeconds = parseInt(Math.trunc((decimal*playlistduration)))

    return finalSeconds;

    
  }
  else
  {
    return seconds;

  }

  
  ///////////////////////////////////////////////////////////////////////////////////////////
}

function playVideo(video)
{
 
  
  setTimeout(function(){ playerInstance.playlistItem(video.index); player.pause(true);}, 1000);
    //alert(video.sencond)
  setTimeout(function(){ player.seek(video.sencond); player.play()}, 5000);

  setTimeout(function(){ 

    if(player.getState()!="playing"){
      player.stop(true)  
   }

  }, 10000);

  
  
  customPlayer();
}

function customPlayer()
{
  $(".jw-slider-time.jw-background-color.jw-reset.jw-slider-horizontal.jw-reset").remove()
  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-rewind").remove()
  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-playback").remove()
  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-next").remove()

  $(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").remove()
  $(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-countdown").remove()
  $(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration").remove()


  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-related-btn").remove()
  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-settings.jw-settings-submenu-button").remove()

  $(".jw-nextup.jw-background-color.jw-reset.jw-nextup-thumbnail-visible").remove();

  $(".jw-display-icon-container.jw-display-icon-display.jw-reset").remove();

  $(".jw-display-icon-container.jw-display-icon-display.jw-reset").remove();

  $(".jw-nextup-tooltip jw-reset").remove(); 

  $(".jw-display-controls.jw-reset").remove();   

  $(".jw-nextup-body jw-reset").remove();   

  $(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-settings-sharing").hide();   

  $(".jw-nextup-tooltip.jw-reset").remove()

  $(".jw-logo").css({ "margin-top": "30%", "margin-right": "5%" });
  
  

}

function getVideo(senconds)
{
  var playlist = playerInstance.getPlaylist();
  var offset = 0;

  for (var index = 0; index < playlist.length; index++) {
    var duration = Math.round(playlist[index]['duration']);
       if (offset + duration > senconds) {
         //alert(index)
        // alert(senconds - offset)
        // alert(playlist[index]['title'])
         myseconds=(senconds - offset);
         myVideo=index;
         //console.log(playlist)   
         return {index:myVideo,sencond:myseconds}      
      //playerInstance.playlistItem(index);
      //playerInstance.seek(senconds - offset);
      } else {
      offset += duration;
    }
  }
}

//setTimeout(function(){ custom_player() }, 1000);



//<div class="jw-reset jw-button-container"></div>






