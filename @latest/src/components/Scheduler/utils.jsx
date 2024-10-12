import moment from 'moment';
import { styles } from './constants';
import { v4 as uuidv4 } from 'uuid';

// Custom day color depending on the day of the week
export const customDayPropGetter = (date) => {
  const dayOfMonth = moment(date).format('YYYY-MM-DD');
  const currentDay = moment().format('YYYY-MM-DD');
  const dayOfWeek = moment(date).day();
  let style = {};

  switch (dayOfWeek) {
    // case 0: style = styles.openDayColors; break;
    // case 1: style = styles.hipHopColors; break;
    // case 3: style = styles.zumbaColors; break;
    case 6: style = styles.weekendColors; break;
    case 0: style = styles.weekendColors; break;
    default: style = styles.defaultBackgroundColors;
  }

  if (dayOfMonth === currentDay) style = styles.currentDayColors;

  return { style };
};

//function to color the event-box based on the event type
export const eventPropGetter = (eventType) => { 

  switch (eventType) {
    case "HipHop":
      return styles.hipHopColors;
    case "Zumba":
      return styles.zumbaColors;
    case "Yoga":
      return styles.yogaColors;
    default:
      return styles.defaultEventColors;
  }
};



// Function to get slot style based on time
// export const slotPropGetter = (date) => {
//   const hour = moment(date).hour();
//   let style = {
//     background: 'linear-gradient(to right, black, darkgrey)', // Harder gradient
//     color: '#fff',
//   };

//   if (hour < 11) {
//     style = {
//       backgroundColor: 'lightblue',
//       width: '100%',
//       color: 'black',
//     };
//   } else if (hour > 12) {
//     style = {
//       backgroundColor: 'blue',
//       width: '100%',
//       color: 'white',
//     };
//   }
//   else {
//     style = {
//       backgroundColor: 'darkblue',
//       width: '100%',
//       color: 'white',
//     };
//   }

//   return { style };
// };

// }

// Function to create a series of events based on recurrence type
export const createRecurrenceEvents = (event) => {
  const events = [];
  const startDate = moment(event.startDate);  
  const endDate = moment(event.endDate);      
  const recurrenceType = event.frequency;    
  const creationGroupId = uuidv4();
  switch (recurrenceType) {
    case "Weekly":
      // Add events for every week for a year
      for (let i = 0; i < 52; i++) {
        const newStartDate = startDate.clone().add(i * 7, 'days');
        const newEndDate = endDate.clone().add(i * 7, 'days');
        events.push({
          ...event,
          start: newStartDate.toDate(),
          end: newEndDate.toDate(),
          creationGroupId: creationGroupId, 

        });
      }
      break;

    case "Monthly":
      // Add events for every month for a year
      for (let i = 0; i < 12; i++) {
        const newStartDate = startDate.clone().add(i, 'months');
        const newEndDate = endDate.clone().add(i, 'months');
        events.push({
          ...event,
          start: newStartDate.toDate(),
          end: newEndDate.toDate(),
          creationGroupId: creationGroupId,
        }); 
      }
      break;

    default:
      throw new Error(`Unsupported recurrence type: ${recurrenceType}`);
  }

  console.log(`Returning with recurence type ${recurrenceType}; \n Events: ${events}`);
  return events; 
};