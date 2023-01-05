const { google } = require("googleapis");

export async function createEvent(auth, event) {
    const calendar = google.calendar({ version: "v3", auth });
  
    calendar.events.insert(
      {
        auth,
        calendarId: "primary",
        resource: event,
      },
      (err, event) => {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return false;
        }
        console.log("Event created: %s", event.htmlLink);
        return true;
      }
    );
  }