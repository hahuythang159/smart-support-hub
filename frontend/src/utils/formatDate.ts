import { format, toZonedTime } from 'date-fns-tz';

/**
 * Format date and time according to Vietnam timezone, format: dd/MM/yyyy HH:mm:ss
 * @param dateStr - ISO date string or timestamp
 */
export const formatDate = (dateStr: string | Date): string => {
    const timeZone = 'Asia/Ho_Chi_Minh';
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

    const zonedDate = toZonedTime(date, timeZone);

    return format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });
};
