
const { google } = require("googleapis");

export async function getAuthUser(userCredentials: any) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.APP_ID,
    process.env.APP_SECRET,
    process.env.REDIRECT_URI
  );

  oauth2Client.setCredentials(userCredentials);

  return oauth2Client;
}
