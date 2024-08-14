import moment from "moment";

export const dateFormatBackend = 'YYYY-MM-DD'
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatFrontendPretty = 'DD MMM YYYY'
export const backendZone = 'Europe/Sarajevo'
export const dateFormatDay = 'DD';

export const getDateFromTimestampMonthLetter = (date) => {
    if (date && date !== 'N/A')
        return moment.unix(date).format(dateFormatFrontendPretty)
    return date
}

export const timestampToDateDateTimeFormat = (timestamp) => {
    let date = '';

    try {
        date = moment.unix(timestamp).format(dateTimeFormat)
    }
    catch (err) {
        return '';
    }

    return date;
}

export const timestampToDateDateFormat = (timestamp, customFormat) => {
    let date = '';

    try {
        date = moment.unix(timestamp).format(customFormat || dateFormatBackend)
    }
    catch (err) {
        return '';
    }

    return date;
}

export const getToday = (customFormat) => moment(new Date()).format(customFormat ? customFormat : dateFormatBackend)

export const getYesterdayToday = (customFormat) => moment(new Date()).subtract(1, 'days').format(customFormat ? customFormat : dateFormatBackend)

export const getCustomSubtractDays = (days = 1, customFormat) => moment(new Date()).subtract(days, 'days').format(customFormat ? customFormat : dateFormatBackend)

export const getFirstDayOfThisWeek = (customFormat) => moment(new Date()).startOf('isoweek').format(customFormat ? customFormat : dateFormatBackend)

export const getLastDayOfThisWeek = (customFormat) => moment(new Date()).endOf('isoweek').format(customFormat ? customFormat : dateFormatBackend)

export const getFirstDayOfLastWeek = (customFormat) => moment(new Date()).subtract(1, 'week').startOf('isoweek').format(customFormat ? customFormat : dateFormatBackend)

export const getLastDayOfLastWeek = (customFormat) => moment(new Date()).subtract(1, 'week').endOf('isoweek').format(customFormat ? customFormat : dateFormatBackend)

export const getFirstDayOfThisMonth = (customFormat) => moment(new Date()).startOf('month').format(customFormat ? customFormat : dateFormatBackend)

export const getLastDayOfThisMonth = (customFormat) => moment(new Date()).endOf('month').format(customFormat ? customFormat : dateFormatBackend)

export const getFirstDayOfLastMonth = (customFormat) => moment(new Date()).subtract(1, 'month').startOf('month').format(customFormat ? customFormat : dateFormatBackend)

export const getLastDayOfLastMonth = (customFormat) => moment(new Date()).subtract(1, 'month').endOf('month').format(customFormat ? customFormat : dateFormatBackend)

export const isToday = (date, unix = false) => {
    if(unix && moment.unix(date).format(dateFormatDay) == getToday(dateFormatDay)) return true
    if (!unix && moment(date).format(dateFormatDay) == getToday(dateFormatDay)) return true

    return false;
}

export const isYesterday = (date, unix = false) => {
    if (unix && moment.unix(date).format(dateFormatDay) == getYesterdayToday(dateFormatDay)) return true
    if (!unix && moment(date).format(dateFormatDay) == getYesterdayToday(dateFormatDay)) return true

    return false;
}

// export const getServerDateTime = () => DateTime.local({ zone: backendZone })

// export const isEndOfCurrentMonth = (day) => new Date(day).valueOf() === new Date(getStartOfDay(getLastDayOfMonth(day))).valueOf()
// export const isStartOfCurrentMonth = (day) => new Date(day).valueOf() === new Date(getFirstDayOfMonth(day)).valueOf()