// src/utils.js

import moment from 'moment';
import { styles } from './styles';

// Function to get day style based on event type and day
export const getDayStyle = (date, eventType) => {
    const dayOfWeek = moment(date).day();
    const currentDay = moment().day();

    let style = {};

    switch (dayOfWeek) {
        case 0: // Sunday
            style = styles.openDayColors;
            break;
        case 1: // Monday
            if (eventType === 'HipHop') {
                style = styles.hipHopColors;
            }
            break;
        case 3: // Wednesday
            if (eventType === 'Zumba') {
                style = styles.zumbaColors;
            }
            break;
        case 5: // Friday
            if (eventType === 'Yoga') {
                style = styles.yogaColors;
            }
            break;
        default:
            style = styles.defaultColors;
    }

    if (dayOfWeek === currentDay) {
        style = styles.currentDayColors;
    }

    return style;
};

// Custom day properties for the calendar
export const customDayPropGetter = (date) => {
    const dayOfMonth = moment(date).format('YYYY-MM-DD');
    const currentDay = moment().format('YYYY-MM-DD');
    const dayOfWeek = moment(date).day();
    let style = {};

    switch (dayOfWeek) {
        case 0: // Sunday
            style = styles.openDayColors;
            break;
        case 1: // Monday
            style = styles.hipHopColors;
            break;
        case 3: // Wednesday
            style = styles.zumbaColors;
            break;
        case 5: // Friday
            style = styles.yogaColors;
            break;
        default:
            style = styles.defaultColors;
    }

    if (dayOfMonth === currentDay) {
        style = styles.currentDayColors;
    }

    return { style };
};
