require('dotenv').config();
const express = require('express');
const axios = require('axios');
const btoa = require('btoa');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
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

app.get('/api/current-track', async (req, res) => {
  try {
    if (!tokenData.access_token || new Date().getTime() > tokenData.token_expiration) {
      await refreshAccessToken();
    }

    // Check if cached was less than 10 seconds ago
    if (fs.existsSync('./current-track.json')) {
      const cachedData = JSON.parse(fs.readFileSync('./current-track.json'));
      if (new Date().getTime() - cachedData.last_updated < 10000) {
        // If cached data is less than 10 seconds old, return cached data
        res.json(cachedData);
        return;
      }
    }

    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    // if response.data is null, no song is playing so return cached data
    if (response.data) {
      res.json(response.data);
      // cache data in file
      response.data.is_playing = false;
      response.data.last_updated = new Date().getTime();
      // Change is_playing to false
      fs.writeFileSync('./current-track.json', JSON.stringify(response.data));

    } else {
      // if no song is playing, return cached data
      res.json(JSON.parse(fs.readFileSync('./current-track.json')));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting current track');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setInterval(async () => {
  try {
    if (!tokenData.access_token || new Date().getTime() > tokenData.token_expiration) {
      await refreshAccessToken();
    }

    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (response.data) {
      response.data.is_playing = false;
      fs.writeFileSync('./current-track.json', JSON.stringify(response.data));
    }
  } catch (error) {
    console.error(error);
  }
}, 1000 * 60 * 5);