require('dotenv').config();
const { google } = require('googleapis');

google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    q: 'joji',
}).then((response) => {
    const { data } = response;
    data.items.forEach((item) => {
        console.log(`Title: ${item.snippet.title}\nDescription: ${item.snippet.description}`)
    })
}).catch((err) => console.log(err));