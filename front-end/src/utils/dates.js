export function getTodayISO() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

function parseISO(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getDayName(isoDate) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return names[parseISO(isoDate).getDay()];
}

export function formatDisplayDate(isoDate) {
  return parseISO(isoDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getCurrentWeekDays() {
  const todayISO = getTodayISO();
  const today = parseISO(todayISO);
  const dow = today.getDay();
  const fullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dow + i);
    const iso = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');
    return {
      isoDate: iso,
      dayName: fullNames[i],
      shortName: shortNames[i],
      dateNum: d.getDate(),
      monthNum: d.getMonth() + 1,
      isToday: iso === todayISO,
    };
  });
}

export function getCurrentWeekRange() {
  const days = getCurrentWeekDays();
  return { weekStartISO: days[0].isoDate, weekEndISO: days[6].isoDate };
}

export function isCurrentWeek(isoDate) {
  const { weekStartISO, weekEndISO } = getCurrentWeekRange();
  return isoDate >= weekStartISO && isoDate <= weekEndISO;
}
