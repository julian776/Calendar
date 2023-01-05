const { google } = require("googleapis");

export async function findEventsUsers(
  auth: any,
  emailUsers: Array<string>,
  fromDate: Date | string,
  toDate: Date | string
): Promise<any[] | boolean> {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
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

  const eventsUser = events.filter((event: any) => {
    try {
      return event.attendees.find((attende) =>
        emailUsers.includes(attende.email)
      );
    } catch (err) {
      return false;
    }
  });
  return eventsUser;
}
