import { google } from "googleapis";
import { findEventsUsers } from "./calendar/events/find";

describe('Calendar Test', () => {
    
    jest.mock('./index.js') // No
    const { auth } = require("@google-cloud/local-auth");
    test('test success', () => {
        const emailUsers =  ["aura.russill@sofka.com.co", "juliancamiloalvarez77@gmail.com"]
        const fromDate = "2022-12-07T07:00:00-05:00"
        const toDate = "2022-12-07T18:00:00-05:00"
        const expectedEvent = {

                    //expected result
        }
        const expectedEvents = [expectedEvent]

        const eventsUsers = findEventsUsers(auth, emailUsers, fromDate, toDate)
        expect(eventsUsers).toEqual(expectedEvents)
    })

    test('test fail', ()=>{
        const emailUsers =  ["aura.russill@sofka.com.co", "juliancamiloalvarez77@gmail.com"]
        const fromDate = "2022-12-08T07:00:00-05:00"
        const toDate = "2022-12-08T11:00:00-05:00"

        const eventsUsers = findEventsUsers(auth, emailUsers, fromDate, toDate)
        expect(eventsUsers).toEqual(false)
    })

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
})