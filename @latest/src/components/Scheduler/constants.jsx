import moment from 'moment';
// Date and Time Formats for Calendar
export const formats = {
  // timeGutterFormat: 'H:mm',
  eventTimeRangeFormat: ({ start, end }) => `${moment(start).format('H:mm')} - ${moment(end).format('H:mm')}`,
  agendaTimeRangeFormat: ({ start, end }) => `${moment(start).format('H:mm')} - ${moment(end).format('H:mm')}`,
};

// Custom Messages for Calendar
export const messages = {
  today: 'Today',
  previous: '<',
  next: '>',
  month: 'Month',
  week: 'Week',
  day: 'Day',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Time',
  event: 'Event',
  noEventsInRange: 'No events in this range',
  showMore: (total) => `+${total} more`,
};

//Dance styles and keys for map
export const danceStyles = [
  { key: 'HipHop', value: 'HipHop' },
  { key: 'Zumba', value: 'Zumba' },
  { key: 'Yoga', value: 'Yoga' },
  { key: 'OpenDay', value: 'OpenDay' },
];

// Styles for Calendar
export const styles = {
  currentDayColors: {
    background: 'linear-gradient(to right, darkgreen, lime)',
    // innerHeight: '100%',
    color: '#fff',
    border: '2px solid lime',
  },
  hipHopColors: {
    background: 'linear-gradient(to right, black, purple)',
    color: '#fff',
  },
  zumbaColors: {
    background: 'linear-gradient(to right, black, red)',
    color: '#fff',
  },
  yogaColors: {
    background: 'linear-gradient(to right, black, blue)',
    color: '#fff',
  },
  openDayColors: {
    background: 'linear-gradient(to right, black, green)',
    color: '#fff',
  },
  weekendColors: {
    background: 'linear-gradient(to right, orange, red)',
    color: '#fff',
  },
  defaultEventColors: {
    background: 'linear-gradient(to right, black, grey)',
    color: '#fff',
  },
  defaultBackgroundColors: {
    background: 'linear-gradient(to right, darkblue, skyblue)',
    color: '#fff',
  },
};
