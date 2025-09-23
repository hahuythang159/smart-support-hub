export const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    });
};
