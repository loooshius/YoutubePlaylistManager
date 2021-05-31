require('dotenv').config();
const { google } = require('googleapis');

// route to grab the playlist id -> need this to start modifying values in the playlistItems column
const playlist = () => {
    google.youtube('v3').playlists.list({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        channelId: 'UCZ1TjI9mP5sEC_S3APAHUZw',
        maxResults: 10,
    }).then((response) => {
        const { data } = response;
        data.items.forEach((item) => {
            console.log(`Playlist Name: ${item.snippet.title}\nDescription: ${item.snippet.description}\nPlaylistID: ${item.id}\n`)
        })
    }).catch((err) => console.log(err));
}

// grabs the items of a particular playlist
const playlistItems = () => {
    google.youtube('v3').playlistItems.list({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        playlistId: 'PLZBCKj_Q3niqSTY0R_1mYlLPZNPpGqA2R',
        maxResults: 10,
    }).then((response) => {
        const { data } = response;
        let trackNumber = 1;
        data.items.forEach((item) => {
            console.log(`Item ${trackNumber} - Item Title: ${item.snippet.title}`);
            trackNumber++;
            /*Description: ${item.snippet.description}*/
        })
    }).catch((err) => console.log(err));
}

playlist();
playlistItems();