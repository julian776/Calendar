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
  timezoneToParseResponse = "UTC"
) {
  const events = await findEventsUsers(auth, emailUser, fromDate, toDate);

  if (typeof events === "boolean") {
    return events;
  }

  const { startAvaiableRange, closeAvaiableRange } = getRanges(range);

  let preEvent;
  const freeSpaces = events.reduce((acc: freeSpace[], currEvent, index) => {
    console.log(acc);

    const checkEvent = () => {
      const startPreEvent = preEvent.start.dateTime;
      const endPreEvent = preEvent.end.dateTime;

      diff = differenceInMilliseconds(new Date(endPreEvent), new Date(start));

      preEvent = currEvent;
      return diff * -1 > 600000
        ? [...acc, { start: endPreEvent, end: start }]
        : acc;
    };

    const checkLastEvent = () => {
      diff = differenceInMilliseconds(
        new Date(end),
        rangeAsSpecificDate(closeAvaiableRange, end)
      );
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
      diff = differenceInMilliseconds(
        rangeAsSpecificDate(startAvaiableRange, start),
        new Date(start)
      );
      preEvent = currEvent;
      const accEvents =
        diff * -1 > 600000
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
        if (res && accEvents) accEvents.push(res);
      }
      return accEvents ? [...acc, ...accEvents] : acc;
    }

    if (isLastEvent) {
      const accEvents = checkEvent();

      const res = checkLastEvent();

      if (res) return [...accEvents, res];
    }

    return checkEvent();
  }, []);

  return parseFreeSpacesToSpecificTimezone(freeSpaces, timezoneToParseResponse);
}

async function parseFreeSpacesToSpecificTimezone(
  freeSpaces: any[],
  timeZone: string
) {
  return freeSpaces.map((freeSpace) => {
    return {
      startDate: parseFromTimeZone(freeSpace.start.toString(), { timeZone }),
      endDate: parseFromTimeZone(freeSpace.end.toString(), { timeZone }),
    };
  });
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
    return false;
  }
  return res;
}
