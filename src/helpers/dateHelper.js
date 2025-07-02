export function daysBetween(date1, date2) {
    const diff = Math.abs(new Date(date1) - new Date(date2));
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
