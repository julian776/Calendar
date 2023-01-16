export declare function findFreeBusyByUsersOnMainCalendar(auth: any, emailUser: Array<string>, fromDate: Date | string, toDate: Date | string, range: string, timezoneToParseResponse?: string): Promise<boolean | {
    startDate: Date;
    endDate: Date;
}[]>;
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export declare function findFreeBusyByUsers(auth: any, emailUser: Array<string>, fromDate: Date | string, toDate: Date | string): Promise<any>;
//# sourceMappingURL=freeBusy.d.ts.map