const express = require('express');
const CONFIG = require('../../config');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const router = express.Router();

const OAuth2 = google.auth.OAuth2;

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    const oauth2client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    )

    const loginLink = oauth2client.generateAuthUrl({
        access_type: 'offline',
        scope: CONFIG.oauth2Credentials.scope
    });

    return res.send(JSON.stringify(loginLink));
})

module.exports = router;