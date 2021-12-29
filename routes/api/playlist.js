require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const { cookie } = require('express-validator');

const CONFIG = require('../../config');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

/** things to consider 
 *  - Must find the user's YT Channel (channelID) based on user input
 *  - From the channelId, we must find the playlistId
 *  - From the playlistID, we must be able to view the playlistItems
 *  - Upon viewing the playlist items, items must be mutable -> add, update, remove, etc. (requires OAuth2 to do this)
 */

// @route   GET api/playlist
// @desc    Test route
// @access  Public
router.get('/', function (req, res) {
    // May need refactoring to ensure cookie data is secure.
    console.log("RIP");
    if (req.headers.cookie === undefined) return res.redirect('/')
    const parsedJWTCookie = req.headers.cookie.split('=');

    if (parsedJWTCookie[0] != 'jwt') {
        return res.redirect('/');
    }

    // Get OAuth2 web token
    const oauth2client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    )
    
    oauth2client.credentials = jwt.verify(parsedJWTCookie[1], process.env.JWT_SECRET);
    
    // Get channel data
    google.youtube('v3').playlists.list({
        auth: oauth2client,
        part: 'snippet',
        mine: true,
        maxResults: 10,
    }).then((response) => {
        const { data } = response;
        //console.log(data);
        let items = "";
        data.items.forEach((item) => {
            items += `Playlist Name: ${item.snippet.title}\nDescription: ${item.snippet.description}\nPlaylistID: ${item.id}\n\n`;
        })
        res.send(data.items);
        //return items;
    }).catch((err) => console.log(err));

    //playlist.playlistsByChannel();
    //playlist.playlistItems();
});

router.get('/:_id', 
    async (req, res) => {
    // May need refactoring to ensure cookie data is secure.

        if (req.headers.cookie === undefined) return res.redirect('/')
        const parsedJWTCookie = req.headers.cookie.split('=');
    
        if (parsedJWTCookie[0] != 'jwt') {
            return res.redirect('/');
        }
    
        // Get OAuth2 web token
        const oauth2client = new OAuth2(
            CONFIG.oauth2Credentials.client_id,
            CONFIG.oauth2Credentials.client_secret,
            CONFIG.oauth2Credentials.redirect_uris[0]
        )
        
        oauth2client.credentials = jwt.verify(parsedJWTCookie[1], process.env.JWT_SECRET);

        // Get channel data
        google.youtube('v3').playlistItems.list({
            auth: oauth2client,
            part: 'snippet',
            playlistId: req.params._id,
            maxResults: 10,
        }).then((response) => {
            const { data } = response;
            //console.log(data);
            let items = "";
            data.items.forEach((item) => {
                items += `Playlist Name: ${item.snippet.title}\nDescription: ${item.snippet.description}\nPlaylistID: ${item.id}\n\n`;
            })
            res.send(data.items);
            //return items;
        }).catch((err) => console.log(err));
    
    }
);

module.exports = router;