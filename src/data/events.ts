export type Activity = {
  id: string;
  term: string;
  title: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  deadlineLabel: string;
  registrationClosesAt: string;
  formUrl: string;
  meeting: { place: string; time: string };
  fees: { label: string; amount: number }[];
  capacityNote: string;
  formationNote: string;
  refundNote: string;
  verifiedOn: string;
  schedule: {
    title: string;
    dateLabel: string;
    items: { time: string; title: string }[];
  }[];
};

// 行程、費用與報名須知整理自 Google 表單，日期以 115-1 學期換算。
// 不記錄即時名額或成團狀態；報名資格與最終資訊仍以表單為準。
export const tripEvent: Activity = {
  id: 'trip-115-1',
  term: '115-1',
  title: '系遊',
  startDate: '2026-11-22',
  endDate: '2026-11-23',
  dateLabel: '11/22–11/23',
  deadlineLabel: '10/12 23:59',
  // 截止包含台北時間 10/12 23:59 的整分鐘。
  registrationClosesAt: '2026-10-13T00:00:00+08:00',
  formUrl: 'https://forms.gle/S3CEzqRTzNvT9TZt5',
  meeting: { place: '文物館外', time: '9:30–10:00' },
  fees: [
    { label: '已繳系費', amount: 2500 },
    { label: '未繳系費', amount: 3000 },
  ],
  capacityNote: '限 30 人，額滿提前截止。',
  formationNote: '報名人數超過 20 人才能成團。',
  refundNote: '除重大傷病或喪假，其餘不予退款。',
  verifiedOn: '2026-10-10',
  schedule: [
    {
      title: '第一天',
      dateLabel: '11/22',
      items: [
        { time: '9:30–10:00', title: '集合、簽到、點名' },
        { time: '10:00–12:00', title: '出發' },
        { time: '12:00–13:30', title: '午餐' },
        { time: '13:30–14:10', title: '前往空氣島彈跳工廠' },
        { time: '14:10–16:00', title: '空氣島彈跳工廠' },
        { time: '16:00–17:00', title: '前往民宿' },
        { time: '17:00–17:30', title: '民宿 Check in' },
        { time: '17:30–18:20', title: '中場休息' },
        { time: '18:20–20:30', title: '烤肉' },
        { time: '20:30 後', title: '自由活動' },
      ],
    },
    {
      title: '第二天',
      dateLabel: '11/23',
      items: [
        { time: '8:00–9:00', title: '早餐' },
        { time: '9:00–9:45', title: '收行李' },
        { time: '9:45–10:00', title: '退房、上車點名' },
        { time: '10:00–10:40', title: '前往傳藝園區' },
        { time: '10:40–15:00', title: '宜蘭傳藝園區' },
        { time: '15:00–15:20', title: '集合、點名、上車' },
        { time: '15:20–17:20', title: '回學校解散' },
      ],
    },
  ],
};

export const activities: Activity[] = [tripEvent];
export const activityHref = '/events/#trip-115-1';

function isDateKey(dateKey: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;
  const date = new Date(`${dateKey}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === dateKey;
}

export function activitiesOnDate(dateKey: string): Activity[] {
  if (!isDateKey(dateKey)) return [];
  return activities.filter((activity) => activity.startDate <= dateKey && activity.endDate >= dateKey);
}

export function activitiesInMonth(year: number, monthIndex: number): Activity[] {
  if (!Number.isInteger(year) || year < 1 || year > 9999
    || !Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) return [];
  const yearKey = String(year).padStart(4, '0');
  const monthKey = String(monthIndex + 1).padStart(2, '0');
  const firstDay = `${yearKey}-${monthKey}-01`;
  const lastDate = new Date(`${firstDay}T00:00:00Z`);
  lastDate.setUTCMonth(lastDate.getUTCMonth() + 1, 0);
  const lastDay = lastDate.toISOString().slice(0, 10);
  return activities.filter((activity) => activity.startDate <= lastDay && activity.endDate >= firstDay);
}

export function registrationDeadlinePassed(activity: Activity, now: Date = new Date()): boolean {
  return now.getTime() >= new Date(activity.registrationClosesAt).getTime();
}
