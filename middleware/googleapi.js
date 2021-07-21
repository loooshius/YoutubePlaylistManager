const app = require('express');
const CONFIG = require('./config');
const google = require('googelapis').google;
const jwt = require('jsonwebtoken');

const OAuth2 = google.auth.OAuth2;

app.get('/', (req, res) => {
    const oauth2client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    )

    const loginLink = oauth2client.generateAuthUrl({
        access_type: 'offline',
        scope: CONFIG.oauth2Credentials.scope
    })

    console.log(loginLink);
    res.send(loginLink);
    //return res.render('index', {loginLink: loginLink}) 
})