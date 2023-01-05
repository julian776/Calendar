import {
  differenceInMilliseconds,
  isDate,
  setHours,
  setMinutes,
} from "date-fns";
import { parseFromTimeZone } from "date-fns-timezone";
import { freeSpace } from "../models/calendar.models";
import { findEventsUsers } from "./find";
const { google } = require("googleapis");

export async function findFreeBusyByUsersOnMainCalendar(
  auth: any,
  emailUser: Array<string>,
  fromDate: Date | string,
  toDate: Date | string,
  range: string,
  timezoneToParseResponse='UTC'
) {
  const events = await findEventsUsers(auth, emailUser, fromDate, toDate);

  if (typeof events === "boolean") {
    return events;
  }

  const { startAvaiableRange, closeAvaiableRange } = getRanges(range);

  let preEvent
  const freeSpaces = events.reduce(( acc:freeSpace[], currEvent, index)=> {
    const checkLastEvent = () => {
      diff = differenceInMilliseconds(
        new Date(end),
        rangeAsSpecificDate(closeAvaiableRange, end)
      );
      preEvent = currEvent
      return diff*-1 > 600000
        ? { start: end, end: rangeAsSpecificDate(closeAvaiableRange, end) }
        : false;
    }
    
    let diff = 0;
    const start = currEvent.start.dateTime;
    const end = currEvent.end.dateTime;
    if (acc.length === 0) {
      diff = differenceInMilliseconds(
        rangeAsSpecificDate(startAvaiableRange, start),
        new Date(start)
        );
        preEvent = currEvent
        const accEvents = diff*-1 > 600000
        ? [...acc, { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }]
        : false;

        if (index+1 === events.length) {
          const res = checkLastEvent()
          if (res && accEvents) return [...accEvents, res]
        }
      }

    if (index+1 === events.length) {
      const res = checkLastEvent()
      if (res) return [...acc, res]
    }

    const startPreEvent = preEvent.start.dateTime;
    const endPreEvent = preEvent.end.dateTime;

    diff = differenceInMilliseconds(endPreEvent, new Date(start))

    preEvent = currEvent
    return diff*-1 > 600000
        ? [...acc, { start: endPreEvent, end: start }]
        : false;
  }, [])
  return parseFreeSpacesToSpecificTimezone(freeSpaces, '')
}

async function parseFreeSpacesToSpecificTimezone(freeSpaces: any[], timezone) {
  return freeSpaces.map(freeSpace => {
    return {
      startDate: parseFromTimeZone(freeSpace.start.toString(), { timeZone: 'Europe/Berlin' }),
      endDate: parseFromTimeZone(freeSpace.end.toString(), { timeZone: 'Europe/Berlin' })
    }
  })
}

async function validateFreeSpace(
  event,
  preEvent,
  events: freeSpace[],
  startAvaiableRange: string,
  closeAvaiableRange: string
) {
  let diff = 0;
  const start = event.start.dateTime;
  const end = event.end.dateTime;
  if (events.length === 0) {
    diff = differenceInMilliseconds(
      rangeAsSpecificDate(startAvaiableRange, start),
      start
    );
    return diff > 600000
      ? { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }
      : false;
  }

  const startPreEvent = preEvent.start.dateTime;
  const endPreEvent = preEvent.end.dateTime;
}

function getRanges(range: string) {
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

function rangeAsSpecificDate(range, date: Date | string) {
  let newDate = new Date(date);
  newDate = setHours(newDate, range.hours);
  newDate = setMinutes(newDate, range.minutes);
  
  return new Date(newDate);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export async function findFreeBusyByUsers(
  auth: any,
  emailUser: Array<string>,
  fromDate: Date | string,
  toDate: Date | string
) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.freebusy.query({
    timeMin: fromDate,
    timeMax: toDate,
    items: [{ id: emailUser }],
  });

  if (!res) {
    console.log("Not free space");
    return false
  }
  return res
}
