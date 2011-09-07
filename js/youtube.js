$(function() {  
  
  //
  // YouTube JavaScript API Player With Playlist
  // http://911-need-code-help.blogspot.com/2009/10/youtube-javascript-player-with-playlist.html
  // Revision 1 [2009-10-12]
  //
  // Prerequisites
  // 1) Create following elements in your HTML:
  // -- a) ytplayer: a named anchor
  // -- b) ytplayer_div1: placeholder div for YouTube JavaScript Player
  // -- c) ytplayer_div2: container div for playlist
  // 2) Include SWFObject library from http://code.google.com/p/swfobject/
  //
  // Variables
  // -- ytplayer_playlist: an array containing YouTube Video IDs
  // -- ytplayer_playitem: index of the video to be played at any given time
  //
  var ytplayer_playlist = [ ];
  var ytplayer_playitem = 0;
  swfobject.addLoadEvent( ytplayer_render_player );
  swfobject.addLoadEvent( ytplayer_render_playlist );
  function ytplayer_render_player( )
  {
    swfobject.embedSWF
    (
      'http://www.youtube.com/v/' + ytplayer_playlist[ ytplayer_playitem ] + '&enablejsapi=1&rel=0&fs=1',
      'ytplayer_div1',
      '425',
      '344',
      '8',
      null,
      null,
      {
        allowScriptAccess: 'always',
        allowFullScreen: 'true'
      },
      {
        id: 'ytplayer_object'
      }
    );
  }
  function ytplayer_render_playlist( )
  {
    for ( var i = 0; i < ytplayer_playlist.length; i++ )
    {
      var img = document.createElement( "img" );
      img.src = "http://img.youtube.com/vi/" + ytplayer_playlist[ i ] + "/default.jpg";
      var a = document.createElement( "a" );
      a.href = "#ytplayer";
      //
      // Thanks to some nice people who answered this question:
      // http://stackoverflow.com/questions/1552941/variables-in-anonymous-functions-can-someone-explain-the-following
      //
      a.onclick = (
        function( j )
        {
          return function( )
          {
            ytplayer_playitem = j;
            ytplayer_playlazy( 1000 );
          };
        }
      )( i );
      a.appendChild( img );
      document.getElementById( "ytplayer_div2" ).appendChild( a );
    }
  }
  function ytplayer_playlazy( delay )
  {
    //
    // Thanks to the anonymous person posted this tip:
    // http://www.tipstrs.com/tip/1084/Static-variables-in-Javascript
    //
    if ( typeof ytplayer_playlazy.timeoutid != 'undefined' )
    {
      window.clearTimeout( ytplayer_playlazy.timeoutid );
    }
    ytplayer_playlazy.timeoutid = window.setTimeout( ytplayer_play, delay );
  }
  function ytplayer_play( )
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
      o.loadVideoById( ytplayer_playlist[ ytplayer_playitem ] );
    }
  }
  //
  // Ready Handler (this function is called automatically by YouTube JavaScript Player when it is ready)
  // * Sets up handler for other events
  //
  function onYouTubePlayerReady( playerid )
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
      o.addEventListener( "onStateChange", "ytplayer_statechange" );
      o.addEventListener( "onError", "ytplayer_error" );
    }
  }
  //
  // State Change Handler
  // * Sets up the video index variable
  // * Calls the lazy play function
  //
  function ytplayer_statechange( state )
  {
    if ( state == 0 )
    {
      ytplayer_playitem += 1;
      ytplayer_playitem %= ytplayer_playlist.length;
      ytplayer_playlazy( 5000 );
    }
  }
  //
  // Error Handler
  // * Sets up the video index variable
  // * Calls the lazy play function
  //
  function ytplayer_error( error )
  {
    if ( error )
    {
      ytplayer_playitem += 1;
      ytplayer_playitem %= ytplayer_playlist.length;
      ytplayer_playlazy( 5000 );
    }
  }
  //
  // Add items to the playlist one-by-one
  //
  ytplayer_playlist.push( 'tGvHNNOLnCk' );
  ytplayer_playlist.push( '_-8IufkbuD0' );
  ytplayer_playlist.push( 'wvsboPUjrGc' );
  ytplayer_playlist.push( '8To-6VIJZRE' );
  ytplayer_playlist.push( '8pdkEJ0nFBg' );
  
});
