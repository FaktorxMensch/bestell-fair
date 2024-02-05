export const timeAgo = (time) => {
    const between = Date.now() / 1000 - new Date(time).getTime() / 1000
    if (between < 3600) {
        return pluralize(~~(between / 60), ' Minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' Stunde')
    }
}
const pluralize = (time, label) => {
    if (time === 1) {
        return time + label
    }
    return time + label + 'n'
}

export const timeAhead = (time) => {
    const between = new Date(time).getTime() / 1000 - Date.now() / 1000
    if (between < 3600) {
        return pluralize(~~(between / 60), ' Minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' Stunde')
    }
}
export const timeDiff = (time) => {
    // either ago or ahead 'in' / 'vor'
    const between = new Date(time).getTime() / 1000 - Date.now() / 1000

    if (between < 0) {
        return 'vor ' + timeAgo(time)
    } else {
        return 'in ' + timeAhead(time)
    }
}


// input restaurant objekt mit den opening hours, output: true/false ob es jetzt offen ist
export const isOpen = (restaurant) => {
    const opening_hours = restaurant.opening_hours;
    const now = new Date();
    // JavaScript's getDay(): 0 = Sunday, so we adjust it to match 0 = Monday
    const currentDay = (now.getDay() + 6) % 7; // Adjusted so 0 = Monday
    const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM format

    console.log('currentDay', currentDay)
    console.log('currentTime', currentTime)
    console.log('opening_hours', opening_hours)

    return opening_hours.some((slot) => {
        const day_open = slot.day_open;
        const time_open = parseInt(slot.time_open.replace(':', ''), 10);
        const time_close = parseInt(slot.time_close.replace(':', ''), 10);

        // Check if the current time is within the slot for the same day
        if (day_open === currentDay) {
            if (time_close > time_open) {
                // Normal case: opening and closing on the same day
                console.log('normal case', currentTime, time_open, time_close)
                return currentTime >= time_open && currentTime < time_close;
            } else if (time_open <= currentTime) {
                // Special case: closing after midnight, and current time is after opening time
                return true;
            }
        }

        // Check for the special case where a slot closes after midnight, which would be considered the next day
        const previousDay = (currentDay + 6) % 7; // Adjust for when the current day is Monday (0)
        if (day_open === previousDay && time_close < time_open) {
            // If the restaurant closes after midnight, we need to check if the current time is before the closing time
            return currentTime < time_close;
        }

        return false;
    });
};

