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
const { google } = require("googleapis");
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
        // console.log(events.map((event) => event.attendees));
        if (!events || events.length === 0) {
            return false;
        }
        // console.log(events);
        const eventsUser = events.filter((event) => {
            try {
                return event.attendees.find((attende) => emailUsers.includes(attende.email));
            }
            catch (err) {
                return false;
            }
        });
        return eventsUser;
    });
}
exports.findEventsUsers = findEventsUsers;
