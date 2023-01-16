import { getAuthUser } from "./auth/auth-user";
import { createEvent } from "./calendar/events/create";
import { findEventsUsers } from "./calendar/events/find";
import { findFreeBusyByUsersOnMainCalendar } from "./calendar/events/freeBusy";
import dotenv from "dotenv";
dotenv.config();

const credentialsUser = {
  access_token: process.env.access_token,
  refresh_token: process.env.refresh_token,
  scope: process.env.scope,
  token_type: process.env.token_type,
  expiry_date: process.env.expiry_date,
};

describe("Calendar Test", () => {
  jest.mock("./index.js"); // No

  test("function find test success", async () => {
    const auth = await getAuthUser(credentialsUser);
    const emailUsers = ["julian.ricaurte@sofka.com.co"];
    const fromDate = "2023-01-07T07:00:00-05:00";
    const toDate = "2023-01-07T18:00:00-05:00";

    const expectedEvents = [];

    const eventsUsers = await findEventsUsers(
      auth,
      emailUsers,
      fromDate,
      toDate
    );
    expect(eventsUsers).toEqual(expectedEvents);
  });

  test("function find test fail", async () => {
    const auth = await getAuthUser(credentialsUser);
    const emailUsers = ["julian.ricaurte@sofka.com.co"];
    const fromDate = "2023-01-07T07:00:00-05:00";
    const toDate = "2023-01-07T11:00:00-05:00";

    const eventsUsers = await findEventsUsers(
      auth,
      emailUsers,
      fromDate,
      toDate
    );
    expect(eventsUsers).toEqual(false);
  });

  test("function freeBusy test False", async () => {
    const auth = await getAuthUser(credentialsUser);
    const result = await findFreeBusyByUsersOnMainCalendar(
      auth,
      ["julian.ricaurte@sofka.com.co"],
      "2023-01-07T07:00:00-05:00",
      "2023-01-07T16:00:00-05:00",
      "6:20-18:30"
    );
    expect(result).toEqual(false);
  });

  test("function freeBusy test success", async () => {
    const auth = await getAuthUser(credentialsUser);
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

    const result = await findFreeBusyByUsersOnMainCalendar(
      auth,
      ["julian.ricaurte@sofka.com.co"],
      "2023-01-05T07:00:00-05:00",
      "2023-01-05T16:00:00-05:00",
      "6:20-18:30"
    );
    expect(result).toEqual(expected);
  });

  test("function create test success", async () => {
    const auth = await getAuthUser(credentialsUser);
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

    const eventCreated = await createEvent(auth, evento);
  });

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
