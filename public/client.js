$(function(){
  // console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);
});

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}

function addSong(event) {
  // stop the browser from trying to navigate away from our page
  event.preventDefault();

  // get the information out of the form
  var songData = $(this).serialize();

  // console.log(songData);
  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs,
    error: displayError
  })
}

function displayError(response) {
  console.log('error response: ', response);
  $('#error').empty();
  $('#error').append('Could not add song: ' + response.responseText);
}

function displaySongs(songs) {
  // console.log(songs);

  $('#songs').empty();

  songs.forEach(function(song) {
    var addedOn = 'unknown';
    if (song.dateAdded) {
      addedOn = new Date(song.dateAdded).toDateString();
    }
    $('#songs').append('<li>' + song.title + ' by '
    + song.artist + ' from album ' + song.album + ', added on ' + addedOn + '</li>');
  });
}
