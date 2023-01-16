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
exports.createEvent = void 0;
const { google } = require("googleapis");
function createEvent(auth, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: "v3", auth });
        calendar.events.insert({
            auth,
            calendarId: "primary",
            resource: event,
        }, (err, event) => {
            if (err) {
                console.log("There was an error contacting the Calendar service: " + err);
                return false;
            }
            console.log("Event created: %s", event.htmlLink);
            return true;
        });
    });
}
exports.createEvent = createEvent;
//# sourceMappingURL=create.js.map