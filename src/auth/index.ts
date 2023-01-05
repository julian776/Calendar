
const http = require('http');
const https = require('https');
const url = require('url');
const { google } = require('googleapis');

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
    "224440623840-lu2fev9teuakrpj5up8iam02hbhcftum.apps.googleusercontent.com",
    "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",
    "http://localhost:3000"
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

// import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
// import { Server, IncomingMessage, ServerResponse } from "http";
// import { botsUserAuth } from "./auth-user";

// const server: FastifyInstance = Fastify({});

// server.get("/auth", async (request, reply) => {
//   reply.send(botsUserAuth());
// });

// const start = async () => {
//   try {
//     await server.listen({ port: 3000 });

//     const address = server.server.address();
//     const port = typeof address === "string" ? address : address?.port;
//   } catch (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
// };

// start();

// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
//  * To get these credentials for your application, visit
//  * https://console.cloud.google.com/apis/credentials.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   "224440623840-lu2fev9teuakrpj5up8iam02hbhcftum.apps.googleusercontent.com",
//   "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",
//   "http://localhost:3000"
// );

// // Access scopes for read-only Drive activity.
// const scopes = ["https://www.googleapis.com/auth/calendar"];

// // Generate a url that asks permissions for the Drive activity scope
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: "offline",
//   /** Pass in the scopes array defined above.
//    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//   scope: scopes,
//   // Enable incremental authorization. Recommended as a best practice.
//   include_granted_scopes: true,
// });

// // .then(async (auth) => {
// //   console.log(
// //     await findEventsUsers(
// //       auth,
// //       [//"aura.russill@sofka.com.co",],
// //       "juliancamiloalvarez77@gmail.com"],
// //       subHours(new Date(), 100),
// //       addHours(new Date(), 10).toISOString()
// //       // "2022-12-09T12:00:00-05:00",
// //       // "2022-12-09T20:00:00-05:00"
// //     )
// //   )
// //   return auth
// //     }
// // ).then(
// //   createEvent
// // )
// // .catch(console.error); // then(createEvent)

