export const toJalaliDate = (date: string | Date | undefined | null) => {
    if (!date) return 'تاریخ نامشخص';

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return 'تاریخ نامشخص';
    }

    try {
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(parsedDate);
    } catch (error) {
        console.error("Error formatting Jalali date:", error);
        return 'تاریخ نامشخص';
    }
};
