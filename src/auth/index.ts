
const http = require('http');
const url = require('url');
const { google } = require('googleapis');

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.APP_ID,
  process.env.APP_SECRET,
  process.env.REDIRECT_URI
);

// Access scopes for read-only Drive activity.
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/drive'
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});

/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */
let userCredential = null;

async function main() {
  const server = http.createServer(async function (req, res) {
    // Example on redirecting user to Google's OAuth 2.0 server.
    if (req.url == '/') {
      res.writeHead(301, { "Location": authorizationUrl });
    }

    // Receive the callback from Google's OAuth 2.0 server.
    if (req.url.includes('?code')) {
      // Handle the OAuth 2.0 server response
      let q = url.parse(req.url, true).query;

      if (q.error) { // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
      } else { // Get access and refresh tokens (if access_type is offline)
        let { tokens } = await oauth2Client.getToken(q.code);
        oauth2Client.setCredentials(tokens);
      }
    }
    
    res.end();
  }).listen(3000);
}

main().catch(console.error);
