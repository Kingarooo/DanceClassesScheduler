// src/events.js

import moment from 'moment';
import { RRule } from 'rrule';

export const defaultEvents = [
  {
    title: 'Hip-Hop Class',
    start: moment().day(1).hour(10).minute(0).second(0).toDate(), // Monday 10:00 AM
    end: moment().day(1).hour(11).minute(0).second(0).toDate(),   // Monday 11:00 AM
    rrule: new RRule({
      freq: RRule.WEEKLY,
      byweekday: [RRule.MO],
    }),
    type: 'HipHop',
  },
  {
    title: 'Zumba Class',
    start: moment().day(3).hour(14).minute(0).second(0).toDate(), // Wednesday 2:00 PM
    end: moment().day(3).hour(15).minute(0).second(0).toDate(),   // Wednesday 3:00 PM
    rrule: new RRule({
      freq: RRule.WEEKLY,
      byweekday: [RRule.WE],
    }),
    type: 'Zumba',
  },
  {
    title: 'Yoga Class',
    start: moment().day(5).hour(18).minute(0).second(0).toDate(), // Friday 6:00 PM
    end: moment().day(5).hour(19).minute(0).second(0).toDate(),   // Friday 7:00 PM
    rrule: new RRule({
      freq: RRule.WEEKLY,
      byweekday: [RRule.FR],
    }),
    type: 'Yoga',
  },
];
