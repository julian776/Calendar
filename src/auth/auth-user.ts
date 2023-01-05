import { authenticate } from "@google-cloud/local-auth";
import { addHours } from "date-fns";
import path from "path";
import { findEventsUsers } from "../calendar/events/find";
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

export async function botsUserAuth() {
  return { refresh_token: await authorize() };
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    return {
      type: "authorized_user",
      refresh_token: client.credentials.refresh_token,
    };
  }
  return {
    message: "Not possible to authorize",
  };
}

export async function getAuthUser(userCredentials: any) {
  const oauth2Client = new google.auth.OAuth2(
    "224440623840-lu2fev9teuakrpj5up8iam02hbhcftum.apps.googleusercontent.com",
    "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",
    "http://localhost:3000"
  );
  
  oauth2Client.setCredentials(userCredentials);
  
  return oauth2Client;
}
