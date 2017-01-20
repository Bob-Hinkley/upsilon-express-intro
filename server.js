var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data.json');

var app = express();

app.use(express.static('public'));
// convert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req, res) {
  // console.log('req.body', req.body);

  if (req.body.title.length === 0) {
    res.status(400).send('invalid song');
  } else if (req.body.artist.length === 0) {
    res.status(400).send('invalid song');
  } else if (req.body.album.length === 0) {
    res.status(400).send('invalid song');
  } else if (isDuplicate(req.body)) {
  res.status(400).send('duplicates song');
  } else {

  // } else if (songs.forEach(uniqueTitle())) {
  //   res.sendStatus(200);

  // } else if (isUnique(req.body.title)) {
  //   console.log('isUnique = '+ isUnique(req.body.title))
  //   res.sendStatus(400);

    req.body.dateAdded = new Date();
    songs.push(req.body);
    res.sendStatus(200);
  }

});

function isDuplicate (newSong) {
  return songs.some(function (song) {
    return song.title === newSong.title &&
    song.artist === newSong.artist &&
    song.album === newSong.album;
  });
};

function isInvalidSong(newSong) {
  return newSong.title.trim() && newSong.artist.trim() && newSong.album.trim();  //false
}

app.listen(3000);

//Failed attempts  :P

// function uniqueTitle() {
//   if req.body.title == songs.title {
//     return false;
//   }
// }

// function isUnique(element, index, array) {
//   return songs.element != element;
// }
