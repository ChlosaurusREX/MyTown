const MONTHS: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

/** Returns true if the event date is strictly after the current date */
export function isUpcoming(dateStr: string): boolean {
  const m = dateStr.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  if (!m) return true;
  const month = MONTHS[m[1]] ?? 0;
  const day   = parseInt(m[2]);
  const year  = parseInt(m[3]);

  const now = new Date();
  const todayYear  = now.getFullYear();
  const todayMonth = now.getMonth() + 1; // getMonth() is 0-indexed
  const todayDay   = now.getDate();

  if (year  !== todayYear)  return year  > todayYear;
  if (month !== todayMonth) return month > todayMonth;
  return day > todayDay;
}
