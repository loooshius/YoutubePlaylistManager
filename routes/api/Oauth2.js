const express = require('express');
const router = express.Router();
const app = express();

const CONFIG = require('../../config');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const OAuth2 = google.auth.OAuth2;

router.get('/', (req, res) => {

    const oauth2client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    )

    if (req.query.error) {
        // User did not grant permission to access
        return res.redirect('/');
    }
    else {
        oauth2client.getToken(req.query.code, (err, token) => {
            if (err) return res.redirect('/');
            
            res.cookie('jwt', jwt.sign(token, process.env.JWT_SECRET));

            return res.redirect('/api/channels');
        })
    }
})

module.exports = router;