require('dotenv').config();
const express = require('express');
const axios = require('axios');
const btoa = require('btoa');
const fs = require('fs');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
app.use(cors());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const authString = btoa(`${clientId}:${clientSecret}`);

let tokenData;

if (fs.existsSync('./tokens.json')) {
  tokenData = JSON.parse(fs.readFileSync('./tokens.json'));
} else {
  tokenData = {};
}

async function refreshAccessToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=refresh_token&refresh_token=' + tokenData.refresh_token,
      {
        headers: {
          Authorization: 'Basic ' + authString,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    tokenData.access_token = response.data.access_token;
    tokenData.token_expiration = new Date().getTime() + response.data.expires_in * 1000;

    fs.writeFileSync('./tokens.json', JSON.stringify(tokenData));

    console.log(`Access token refreshed. New expiration time: ${new Date(tokenData.token_expiration)}`);
  } catch (error) {
    console.error(error);
    console.log('Error refreshing access token');
  }
}

if (!tokenData.refresh_token) {
  console.log('Refresh token not found in tokens.json file');
} else {
  if (!tokenData.access_token || new Date().getTime() > tokenData.token_expiration) {
    refreshAccessToken();
  } else {
    console.log(`Access token valid until: ${new Date(tokenData.token_expiration)}`);
  }
}

setInterval(async () => {
  try {
    if (!tokenData.access_token || new Date().getTime() > tokenData.token_expiration) {
      await refreshAccessToken();
    }

    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (response.data) {
      fs.writeFileSync('./current-track.json', JSON.stringify(response.data));
    } else {
      const data = JSON.parse(fs.readFileSync('./current-track.json'));
      data.is_playing = false;
      fs.writeFileSync('./current-track.json', JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
  }
}, 3000);


module.exports = {
  currentTrack: async function (ws, req) {
    let data = JSON.parse(fs.readFileSync('./current-track.json'));
    let newData = {};
    newData.progress = data.progress_ms;
    newData.duration = data.item.duration_ms;
    newData.is_playing = data.is_playing;
    newData.title = data.item.name;
    newData.artist = data.item.artists[0].name;
    newData.album = data.item.album.name;
    newData.album_art = data.item.album.images[0].url;
    newData.release_date = data.item.album.release_date;
    newData.external_url = data.item.external_urls.spotify;
    newData.preview_url = data.item.preview_url;
    ws.send(JSON.stringify(newData));
    setInterval(async () => {
      let data = JSON.parse(fs.readFileSync('./current-track.json'));
      let newData = {};
      newData.progress = data.progress_ms;
      newData.duration = data.item.duration_ms;
      newData.is_playing = data.is_playing;
      newData.title = data.item.name;
      newData.artist = data.item.artists[0].name;
      newData.album = data.item.album.name;
      newData.album_art = data.item.album.images[0].url;
      newData.release_date = data.item.album.release_date;
      newData.external_url = data.item.external_urls.spotify;
      newData.preview_url = data.item.preview_url;
      ws.send(JSON.stringify(newData));
    }, 3000);
  }
};
