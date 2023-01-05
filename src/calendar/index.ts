// {'email': 'juliancamiloalvarez77@gmail.com'},
// {'email': 'julian.alvarez@sofka.com.co'},
// {'email': 'david.diazh@sofka.com.co'},
// {'email': 'aura.russill@sofka.com.co'},
// {'email': 'auracris1996@hotmail.com'}

import { addHours } from "date-fns";
import { getAuthUser } from "../auth/auth-user";
import { findEventsUsers } from "./events/find";
import { findFreeBusyByUsersOnMainCalendar } from "./events/freeBusy";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// const event = {
//   summary: "Google I/O 2015",
//   location: "CASA SOFKITA",
//   description: "Szs esa es",
//   start: {
//     dateTime: "2022-12-12T09:00:00-07:00",
//     timeZone: "America/Bogota",
//   },
//   end: {
//     dateTime: "2022-12-12T11:00:00-07:00",
//     timeZone: "America/Bogota",
//   },
//   attendees: ["juliancamiloalvarez77@gmail.com"],
// };

(async () => {
  dotenv.config()
  const auth = await getAuthUser({
    access_token:
      "ya29.a0AX9GBdUNiYbcN630zQy_qslHx-7H-BHdE41Y-6rUSaHKc31s2do95271rd7ceVFm_cqE8adWGsdPK8KrHoiTx4-EmMs9prIbRUzEt7wbsj66wcCaVG5JRltpJuMVxKqMTArY0Jop-FFGlrM2tHbUXC584T02aCgYKAdMSARMSFQHUCsbCNPA8hSI7b91qJw_9YuYzpg0163",
    refresh_token:
      "1//05zus1Xhh5_XSCgYIARAAGAUSNwF-L9Ir5nvK9rhvmumwoWWf5YWtVuIxzYWX2zrt0M4xLlT-UgYlR7nqIJRf6XcYvfvO4F7nmcU",
    scope:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    token_type: "Bearer",
    id_token:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhlMGFjZjg5MWUwOTAwOTFlZjFhNWU3ZTY0YmFiMjgwZmQxNDQ3ZmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMjQ0NDA2MjM4NDAtbHUyZmV2OXRldWFrcnBqNXVwOGlhbTAyaGJoY2Z0dW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMjQ0NDA2MjM4NDAtbHUyZmV2OXRldWFrcnBqNXVwOGlhbTAyaGJoY2Z0dW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAwNDcwMTE4NTE5MzkwMjY1NDUiLCJlbWFpbCI6Imp1bGlhbmNhbWlsb2FsdmFyZXo3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjdHUFNmSE0wUWJ2Y1VsU3ZLVFFvcnciLCJuYW1lIjoianVsaWFuY2FtaWxvIGFsdmFyZXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNXdnZnJSWGhvWnZLU2hjLVMwRmk1bXF0dS1uNWFqNFpoLWFZNTg9czk2LWMiLCJnaXZlbl9uYW1lIjoianVsaWFuY2FtaWxvIiwiZmFtaWx5X25hbWUiOiJhbHZhcmV6IiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NzI3NjMwNDEsImV4cCI6MTY3Mjc2NjY0MX0.YRG22l7P67oiEf7RUqbOCccQOdfwMmx6tDiP7UnOejErei8JSSJXHqBckIxWIk7HxyiIaAbSGjEmhsuEEABarSTFtqkVLiU0xb3oWctFbyUNRWUtjd-By9FGMyzggCp1IZ1i7BveRTA4j6ibfSJn5cHFDOblhJ68fUhaLSx3eFXyjLI1MVcE33CADnQOaZfkPPbuF4BbipD3poZUyjdCTsyn-T9nDUnAvIManujKImUBT2NzH6jLB05AyVGjQFtTei-yfJSChrdD_akzcp9kikostH0O0yzerDXKb6cVUsXPx9VvRzRUAGRufDHfi7t6OUpE2wkeEbwlwJDDTv9lYA",
    expiry_date: 1672766657698,
  });
  // const authorizationUrl = oauth2Client.generateAuthUrl({
  //   // 'online' (default) or 'offline' (gets refresh_token)
  //   access_type: 'offline',
  //   /** Pass in the scopes array defined above.
  //     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  //   //scope: scopes,
  //   // Enable incremental authorization. Recommended as a best practice.
  //   include_granted_scopes: true
  // });
  console.log(
    //await findEventsUsers(auth, ["juliancamiloalvarez77@gmail.com", 'julian.alvarez@sofka.com.co'], new Date(), addHours(new Date(), 20))
    await findFreeBusyByUsersOnMainCalendar(
      auth,
      [
        "julian.ricaurte@sofka.com.co",
        "julian.alvarez@sofka.com.co",
        "juliancamiloalvarez77@gmail.com",
      ],
      "2023-01-05T07:00:00-05:00",
      "2023-01-05T16:00:00-05:00",
      "6:20-18:30"
    )
  );
})();
