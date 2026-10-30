type BaseActivity = {
  id: string;
  status: 'scheduled' | 'cancelled';
  term: string;
  title: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  formUrl: string;
  verifiedOn: string;
  calendarVisible?: boolean;
};

export type TripActivity = BaseActivity & {
  kind: 'trip';
  deadlineLabel: string;
  registrationClosesAt: string;
  meeting: { place: string; time: string };
  fees: { label: string; amount: number }[];
  capacityNote: string;
  formationNote: string;
  refundNote: string;
  schedule: {
    title: string;
    dateLabel: string;
    items: { time: string; title: string }[];
  }[];
};

export type GatheringActivity = BaseActivity & {
  kind: 'gathering';
  time: string;
  weekdayLabel: string;
  venue: string;
  subsidy: { amount: number; eligibility: string };
  formPurpose: 'interest-survey';
  surveyNotice: string;
};

export type GatheringRegistrationActivity = BaseActivity & {
  kind: 'gathering-registration';
  time: string;
  weekdayLabel: string;
  venue: string;
  mapUrl: string;
  formPurpose: 'registration';
  deadlineLabel: string;
  registrationClosesAt: string;
  introduction: string;
  advisorRule: string;
  advisorExamples: string[];
  subsidyOptions: {
    id: string;
    mentee: boolean;
    paidFee: boolean;
    amount: number;
    isMaximum: boolean;
    detail: string;
  }[];
  rules: { title: string; description: string }[];
};

export type Activity = TripActivity | GatheringActivity | GatheringRegistrationActivity;

// 行程、費用與報名須知為取消前的 Google 表單記錄，日期以 115-1 學期換算。
// 活動狀態依系學會更新；尚未提供取消原因或取消後的退款安排。
export const tripEvent: TripActivity = {
  kind: 'trip',
  id: 'trip-115-1',
  status: 'cancelled',
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

// 依 2026/10/25 系學會提供的公告整理；這是參與意願調查，並非正式報名。
export const gatheringEvent: GatheringActivity = {
  kind: 'gathering',
  id: 'gathering-115-1',
  status: 'scheduled',
  term: '115-1',
  title: '大家聚',
  startDate: '2026-11-18',
  endDate: '2026-11-18',
  dateLabel: '11/18（三）18:30',
  time: '18:30',
  weekdayLabel: '三',
  venue: '聚 日式鍋物',
  subsidy: { amount: 200, eligibility: '已繳交系學會費的同學' },
  formPurpose: 'interest-survey',
  surveyNotice: '本表單僅供參與意願調查，並非正式報名。後續將再公布正式報名資訊。',
  formUrl: 'https://forms.gle/BZJKAeYBpPhHPmYj9',
  verifiedOn: '2026-10-25',
  // 保留前期意願調查；同日的月曆入口以正式報名公告為主。
  calendarVisible: false,
};

// 依 2026/10/30 系學會提供的最終公告整理，與前期意願調查分開保留。
export const gatheringRegistrationEvent: GatheringRegistrationActivity = {
  kind: 'gathering-registration',
  id: 'gathering-registration-115-1',
  status: 'scheduled',
  term: '115-1',
  title: '大家聚 × Renata 老師導生家聚',
  startDate: '2026-11-18',
  endDate: '2026-11-18',
  dateLabel: '11/18（三）18:30',
  time: '18:30',
  weekdayLabel: '三',
  venue: '聚 日式鍋物 林口文化店',
  mapUrl: 'https://share.google/ywTCbH7GbDsL6GPTg',
  formPurpose: 'registration',
  deadlineLabel: '2026/11/06（五）23:59',
  // 截止包含台北時間 11/06 23:59 的整分鐘。
  registrationClosesAt: '2026-11-07T00:00:00+08:00',
  introduction: '本學期系上大家聚將與 Renata 老師導生家聚合併辦理，歡迎大家一起聚餐交流！',
  advisorRule: '學號純數字除以 4 餘數為 3 者，即為 Renata 老師導生。',
  advisorExamples: ['03', '07', '11', '15'],
  subsidyOptions: [
    { id: 'mentee-paid', mentee: true, paidFee: true, amount: 600, isMaximum: true, detail: '導生費 400 元＋系學會現金 200 元' },
    { id: 'mentee-unpaid', mentee: true, paidFee: false, amount: 400, isMaximum: true, detail: '導生費 400 元' },
    { id: 'non-mentee-paid', mentee: false, paidFee: true, amount: 200, isMaximum: false, detail: '現場發放現金' },
    { id: 'non-mentee-unpaid', mentee: false, paidFee: false, amount: 0, isMaximum: false, detail: '自費參加' },
  ],
  rules: [
    {
      title: '系學會補助（200 元）',
      description: '活動當天報到時現場發放現金。若實際餐費未達補助總額，剩餘現金可自行保留，無須退回。',
    },
    {
      title: '自付差額',
      description: '現場個人各自點餐付款，若金額超過補助總額，超出部分由個人負擔。',
    },
    {
      title: '出席規範',
      description: '名額以表單登記為準，當天需本人到場簽到領取，未到者視同放棄，不得代領。',
    },
  ],
  formUrl: 'https://forms.gle/XcFL4tUAgPeXkHqA7',
  verifiedOn: '2026-10-30',
};

export const activities: Activity[] = [gatheringRegistrationEvent, gatheringEvent, tripEvent];
export const activityHref = '/events/#trip-115-1';
export const gatheringHref = '/events/#gathering-115-1';
export const gatheringRegistrationHref = '/events/#gathering-registration-115-1';

function isDateKey(dateKey: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;
  const date = new Date(`${dateKey}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === dateKey;
}

export function activitiesOnDate(dateKey: string): Activity[] {
  if (!isDateKey(dateKey)) return [];
  return activities.filter((activity) => activity.status === 'scheduled' && activity.calendarVisible !== false
    && activity.startDate <= dateKey && activity.endDate >= dateKey);
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
  return activities.filter((activity) => activity.status === 'scheduled' && activity.calendarVisible !== false
    && activity.startDate <= lastDay && activity.endDate >= firstDay);
}

export function registrationDeadlinePassed(
  activity: Pick<TripActivity | GatheringRegistrationActivity, 'registrationClosesAt'>,
  now: Date = new Date(),
): boolean {
  return now.getTime() >= new Date(activity.registrationClosesAt).getTime();
}
