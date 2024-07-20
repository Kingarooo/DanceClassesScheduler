import { useEffect } from 'react';
import { createCalendar, viewMonthGrid, viewDay, viewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createEventRecurrencePlugin } from '@schedule-x/event-recurrence';
import './style.css';

const hipHopColors = {
  main: '#1c7df9',
  container: '#d2e7ff',
  onContainer: '#002859',
};

const zumbaColors = {
  main: '#f91c1c',
  container: '#ffd2d2',
  onContainer: '#590000',
};


const CalendarComponent = () => {
  const eventsServicePlugin = createEventsServicePlugin();
  // const calendarRef = useRef(null);
  const config = {
    locale: 'pt-BR',
    firstDayOfWeek: 1,
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid],
    plugins: [createEventRecurrencePlugin, eventsServicePlugin, createDragAndDropPlugin(), createEventModalPlugin()],
    dayBoundaries: {
      start: '06:00',
      end: '23:00',
    },
    onEventClick(calendarEvent) {
      //Por confirmação de agendamento

      console.log('onEventClick', calendarEvent)
    },
    calendars: {
      hiphop: {
        colorName: 'hiphop',
        lightColors: {
          main: hipHopColors.main,
          container: hipHopColors.container,
          onContainer: hipHopColors.onContainer,
        },
        darkColors: {
          main: hipHopColors.main,
          container: hipHopColors.container,
          onContainer: hipHopColors.onContainer,
        },
      },
      zumba: {
        colorName: 'zumba',
        lightColors: {
          main: zumbaColors.main,
          container: zumbaColors.container,
          onContainer: zumbaColors.onContainer,
        },
        darkColors: {
          main: zumbaColors.main,
          container: zumbaColors.container,
          onContainer: zumbaColors.onContainer,
        },
      }
    },
    events: [
      {
        id: 1,
        title: 'Hip-Hop Class',
        start: '2024-19-07 10:05',
        end: '2024-19-07 13:35',
        rrule: {
          freq: 'WEEKLY',
          byday: ['MO', 'WE', 'FR'],
        },
        description: 'Hip-Hop class',
        people: ['John', 'Jane'],
        location: 'Studio 1',
        calendarId: 'hiphop',
        _options: {
          disableDND: true,
          disableResize: true,
        }
      },
    ],

  };
  useEffect(() => {
    const calendar = createCalendar(config);
    calendar.setTheme('dark')

    calendar.render(document.getElementById('calendar'));

  });
  // console.log(eventsServicePlugin.getAll());

  return <div id="calendar"></div>;
};

export default CalendarComponent;
