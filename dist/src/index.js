"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsUsers = void 0;
const auth_user_1 = require("./auth/auth-user");
const fs = require("fs").promises;
const path = require("path");
const { google } = require("googleapis");
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function findFreeBusyByUsers(auth, emailUser, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield findEventsUsers(auth, emailUser, fromDate, toDate);
        if (typeof events === 'boolean') {
            return events;
        }
        events.forEach((event) => {
        });
    });
}
function findEventsUsers(auth, emailUsers, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: "v3", auth });
        const res = yield calendar.events.list({
            calendarId: "primary",
            timeMin: fromDate,
            timeMax: toDate,
            maxResults: 150,
            singleEvents: true,
            orderBy: "startTime",
        });
        const events = res.data.items;
        console.log(events.map((event) => event.attendees));
        if (!events || events.length === 0) {
            return false;
        }
        console.log(events);
        const eventsUser = events.filter((event) => {
            return event.attendees.find((attende) => emailUsers.includes(attende.email));
        });
        return eventsUser;
    });
}
exports.findEventsUsers = findEventsUsers;
// {'email': 'juliancamiloalvarez77@gmail.com'},
// {'email': 'julian.alvarez@sofka.com.co'},
// {'email': 'david.diazh@sofka.com.co'},
// {'email': 'aura.russill@sofka.com.co'},
// {'email': 'auracris1996@hotmail.com'}
function createEvent(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = {
            summary: "Google I/O 2015",
            location: "CASA SOFKITA",
            description: "Szs esa es",
            start: {
                dateTime: "2022-12-12T09:00:00-07:00",
                timeZone: "America/Bogota",
            },
            end: {
                dateTime: "2022-12-12T11:00:00-07:00",
                timeZone: "America/Bogota",
            },
            attendees: [
                'juliancamiloalvarez77@gmail.com'
            ],
        };
        const calendar = google.calendar({ version: "v3", auth });
        calendar.events.insert({
            auth,
            calendarId: "primary",
            resource: event,
        }, (err, event) => {
            if (err) {
                console.log("There was an error contacting the Calendar service: " + err);
                return;
            }
            console.log("Event created: %s", event.htmlLink);
        });
        return auth;
    });
}
(0, auth_user_1.botsUserAuth)();
// .then(async (auth) => {
//   console.log(
//     await findEventsUsers(
//       auth,
//       [//"aura.russill@sofka.com.co",],
//       "juliancamiloalvarez77@gmail.com"],
//       subHours(new Date(), 100),
//       addHours(new Date(), 10).toISOString()
//       // "2022-12-09T12:00:00-05:00",
//       // "2022-12-09T20:00:00-05:00"
//     )
//   )
//   return auth
//     }
// ).then(
//   createEvent 
// )
// .catch(console.error); // then(createEvent)
