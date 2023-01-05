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
exports.findFreeBusyByUsers = exports.findFreeBusyByUsersOnMainCalendar = void 0;
const date_fns_1 = require("date-fns");
const date_fns_timezone_1 = require("date-fns-timezone");
const find_1 = require("./find");
const { google } = require("googleapis");
function findFreeBusyByUsersOnMainCalendar(auth, emailUser, fromDate, toDate, range, timezoneToParseResponse = "UTC") {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield (0, find_1.findEventsUsers)(auth, emailUser, fromDate, toDate);
        if (typeof events === "boolean") {
            return events;
        }
        const { startAvaiableRange, closeAvaiableRange } = getRanges(range);
        let preEvent;
        const freeSpaces = events.reduce((acc, currEvent, index) => {
            console.log(acc);
            const checkEvent = () => {
                const startPreEvent = preEvent.start.dateTime;
                const endPreEvent = preEvent.end.dateTime;
                diff = (0, date_fns_1.differenceInMilliseconds)(new Date(endPreEvent), new Date(start));
                preEvent = currEvent;
                return diff * -1 > 600000
                    ? [...acc, { start: endPreEvent, end: start }]
                    : acc;
            };
            const checkLastEvent = () => {
                diff = (0, date_fns_1.differenceInMilliseconds)(new Date(end), rangeAsSpecificDate(closeAvaiableRange, end));
                preEvent = currEvent;
                return diff * -1 > 600000
                    ? { start: end, end: rangeAsSpecificDate(closeAvaiableRange, end) }
                    : false;
            };
            const isLastEvent = index + 1 === events.length;
            const isFirstEvent = acc.length === 0;
            let diff = 0;
            const start = currEvent.start.dateTime;
            const end = currEvent.end.dateTime;
            if (isFirstEvent) {
                diff = (0, date_fns_1.differenceInMilliseconds)(rangeAsSpecificDate(startAvaiableRange, start), new Date(start));
                preEvent = currEvent;
                const accEvents = diff * -1 > 600000
                    ? [
                        ...acc,
                        {
                            start: rangeAsSpecificDate(startAvaiableRange, start),
                            end: start,
                        },
                    ]
                    : false;
                if (isLastEvent) {
                    const res = checkLastEvent();
                    if (res && accEvents)
                        accEvents.push(res);
                }
                return accEvents ? [...acc, ...accEvents] : acc;
            }
            if (isLastEvent) {
                const accEvents = checkEvent();
                const res = checkLastEvent();
                if (res)
                    return [...accEvents, res];
            }
            return checkEvent();
        }, []);
        return parseFreeSpacesToSpecificTimezone(freeSpaces, timezoneToParseResponse);
    });
}
exports.findFreeBusyByUsersOnMainCalendar = findFreeBusyByUsersOnMainCalendar;
function parseFreeSpacesToSpecificTimezone(freeSpaces, timeZone) {
    return __awaiter(this, void 0, void 0, function* () {
        return freeSpaces.map((freeSpace) => {
            return {
                startDate: (0, date_fns_timezone_1.parseFromTimeZone)(freeSpace.start.toString(), { timeZone }),
                endDate: (0, date_fns_timezone_1.parseFromTimeZone)(freeSpace.end.toString(), { timeZone }),
            };
        });
    });
}
function getRanges(range) {
    const [avaiableAt, closedAt] = range.split("-");
    const startAvaiableRange = {
        hours: avaiableAt.split(":")[0],
        minutes: avaiableAt.split(":")[1] || 0,
    };
    const closeAvaiableRange = {
        hours: closedAt.split(":")[0],
        minutes: closedAt.split(":")[1] || 0,
    };
    return {
        startAvaiableRange,
        closeAvaiableRange,
    };
}
function rangeAsSpecificDate(range, date) {
    let newDate = new Date(date);
    newDate = (0, date_fns_1.setHours)(newDate, range.hours);
    newDate = (0, date_fns_1.setMinutes)(newDate, range.minutes);
    return new Date(newDate);
}
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function findFreeBusyByUsers(auth, emailUser, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: "v3", auth });
        const res = yield calendar.freebusy.query({
            timeMin: fromDate,
            timeMax: toDate,
            items: [{ id: emailUser }],
        });
        if (!res) {
            console.log("Not free space");
            return false;
        }
        return res;
    });
}
exports.findFreeBusyByUsers = findFreeBusyByUsers;
