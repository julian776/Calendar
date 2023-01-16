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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_user_1 = require("./auth/auth-user");
const create_1 = require("./calendar/events/create");
const find_1 = require("./calendar/events/find");
const freeBusy_1 = require("./calendar/events/freeBusy");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const credentialsUser = {
    access_token: process.env.access_token,
    refresh_token: process.env.refresh_token,
    scope: process.env.scope,
    token_type: process.env.token_type,
    expiry_date: process.env.expiry_date,
};
describe("Calendar Test", () => {
    jest.mock("./index.js"); // No
    test("function find test success", () => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield (0, auth_user_1.getAuthUser)(credentialsUser);
        const emailUsers = ["julian.ricaurte@sofka.com.co"];
        const fromDate = "2023-01-07T07:00:00-05:00";
        const toDate = "2023-01-07T18:00:00-05:00";
        const expectedEvents = [];
        const eventsUsers = yield (0, find_1.findEventsUsers)(auth, emailUsers, fromDate, toDate);
        expect(eventsUsers).toEqual(expectedEvents);
    }));
    test("function find test fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield (0, auth_user_1.getAuthUser)(credentialsUser);
        const emailUsers = ["julian.ricaurte@sofka.com.co"];
        const fromDate = "2023-01-07T07:00:00-05:00";
        const toDate = "2023-01-07T11:00:00-05:00";
        const eventsUsers = yield (0, find_1.findEventsUsers)(auth, emailUsers, fromDate, toDate);
        expect(eventsUsers).toEqual(false);
    }));
    test("function freeBusy test False", () => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield (0, auth_user_1.getAuthUser)(credentialsUser);
        const result = yield (0, freeBusy_1.findFreeBusyByUsersOnMainCalendar)(auth, ["julian.ricaurte@sofka.com.co"], "2023-01-07T07:00:00-05:00", "2023-01-07T16:00:00-05:00", "6:20-18:30");
        expect(result).toEqual(false);
    }));
    test("function freeBusy test success", () => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield (0, auth_user_1.getAuthUser)(credentialsUser);
        const expected = [
            {
                endDate: new Date("2023-01-05T11:00:00.000Z"),
                startDate: new Date("2023-01-05T06:20:00.000Z"),
            },
            {
                endDate: new Date("2023-01-05T18:30:00.000Z"),
                startDate: new Date("2023-01-05T14:00:00.000Z"),
            },
        ];
        const result = yield (0, freeBusy_1.findFreeBusyByUsersOnMainCalendar)(auth, ["julian.ricaurte@sofka.com.co"], "2023-01-05T07:00:00-05:00", "2023-01-05T16:00:00-05:00", "6:20-18:30");
        expect(result).toEqual(expected);
    }));
    test("function create test success", () => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield (0, auth_user_1.getAuthUser)(credentialsUser);
        const evento = {
            summary: "test",
            location: "800 Howard St., San Francisco, CA 94103",
            description: "A chance to hear more about Google's developer products.",
            start: {
                dateTime: "2023-01-07T09:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: "2023-01-07T17:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        };
        const eventCreated = yield (0, create_1.createEvent)(auth, evento);
    }));
    /////////otra////////////////////////////////////////////////////////////////////////////////////////////////
    // const calendar = google.calendar({ version: "v3", auth });
    // test ('event list', async =>{
    //     expectRes = {
    //         //expected result
    //     }
    //     const res = await calendar.events.list({
    //         calendarId: "primary",
    //         timeMin: "2022-12-08T07:00:00-05:00",
    //         timeMax: "2022-12-08T11:00:00-05:00",
    //         maxResults: 150,
    //         singleEvents: true,
    //         orderBy: "startTime",
    //     })
    //     expect(res).toEqual(expectRes);
    // })
});
//# sourceMappingURL=index.test.js.map