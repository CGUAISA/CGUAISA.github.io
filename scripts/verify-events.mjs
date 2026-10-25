import assert from 'node:assert/strict';
import {
  activities,
  activityHref,
  activitiesInMonth,
  activitiesOnDate,
  gatheringEvent,
  gatheringHref,
  registrationDeadlinePassed,
  tripEvent,
} from '../src/data/events.ts';

const ids = new Set();
const isDateKey = (value) => typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(`${value}T00:00:00Z`))
  && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

for (const activity of activities) {
  assert(activity.id && !ids.has(activity.id), 'Missing or duplicate activity id');
  ids.add(activity.id);
  assert(['trip', 'gathering'].includes(activity.kind), 'Invalid activity kind');
  assert(['scheduled', 'cancelled'].includes(activity.status), 'Invalid activity status');
  assert(/^\d{3}-[12]$/.test(activity.term), 'Invalid academic term');
  for (const key of ['title', 'dateLabel']) {
    assert(typeof activity[key] === 'string' && activity[key].trim(), `Missing ${key}`);
  }
  assert(isDateKey(activity.startDate) && isDateKey(activity.endDate), 'Invalid activity dates');
  assert(activity.startDate <= activity.endDate, 'Activity dates reversed');
  assert(isDateKey(activity.verifiedOn), 'Missing verification date');
  assert(new URL(activity.formUrl).origin === 'https://forms.gle', 'Unexpected form URL');

  if (activity.kind === 'gathering') {
    assert(/^\d{2}:\d{2}$/.test(activity.time), 'Invalid gathering time');
    assert(activity.weekdayLabel.trim() && activity.venue.trim(), 'Missing gathering details');
    assert(Number.isInteger(activity.subsidy.amount) && activity.subsidy.amount >= 0, 'Invalid subsidy');
    assert(activity.subsidy.eligibility.trim(), 'Missing subsidy eligibility');
    assert.equal(activity.formPurpose, 'interest-survey', 'Gathering form must be an interest survey');
    assert(activity.surveyNotice.trim(), 'Missing interest survey notice');
    continue;
  }

  for (const key of ['deadlineLabel', 'capacityNote', 'formationNote', 'refundNote']) {
    assert(typeof activity[key] === 'string' && activity[key].trim(), `Missing ${key}`);
  }
  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/.test(activity.registrationClosesAt), 'Deadline must explicitly use Taipei time');
  assert(Number.isFinite(Date.parse(activity.registrationClosesAt)), 'Invalid registration deadline');
  assert(activity.meeting.place.trim() && activity.meeting.time.trim(), 'Missing meeting details');
  assert(Array.isArray(activity.fees) && activity.fees.length, 'Missing fees');
  for (const fee of activity.fees) {
    assert(fee.label.trim() && Number.isInteger(fee.amount) && fee.amount >= 0, 'Invalid fee');
  }
  assert(Array.isArray(activity.schedule) && activity.schedule.length, 'Missing schedule');
  for (const day of activity.schedule) {
    assert(day.title.trim() && /^\d{1,2}\/\d{1,2}$/.test(day.dateLabel), 'Invalid schedule day');
    assert(Array.isArray(day.items) && day.items.length, 'Empty schedule day');
    for (const item of day.items) assert(item.time.trim() && item.title.trim(), 'Missing itinerary time or title');
  }
}

assert.equal(activities.length, 2, 'Reviewed activity count changed');
assert.deepEqual(activities, [gatheringEvent, tripEvent]);
assert.equal(activityHref, '/events/#trip-115-1');
assert.equal(gatheringHref, '/events/#gathering-115-1');
assert.deepEqual(gatheringEvent, {
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
}, 'Gathering must match the supplied announcement without invented details');
assert.equal(new Date(`${gatheringEvent.startDate}T00:00:00Z`).getUTCDay(), 3, '11/18 must be Wednesday');
for (const key of ['fees', 'deadlineLabel', 'registrationClosesAt', 'address', 'capacityNote']) {
  assert.equal(Object.hasOwn(gatheringEvent, key), false, `Gathering must not invent ${key}`);
}
assert.equal(tripEvent.kind, 'trip');
assert.equal(tripEvent.id, 'trip-115-1');
assert.equal(tripEvent.status, 'cancelled');
assert.equal(tripEvent.term, '115-1');
assert.equal(tripEvent.title, '系遊');
assert.equal(tripEvent.startDate, '2026-11-22');
assert.equal(tripEvent.endDate, '2026-11-23');
assert.equal(tripEvent.dateLabel, '11/22–11/23');
assert.equal(tripEvent.deadlineLabel, '10/12 23:59');
assert.equal(tripEvent.registrationClosesAt, '2026-10-13T00:00:00+08:00');
assert.equal(tripEvent.formUrl, 'https://forms.gle/S3CEzqRTzNvT9TZt5');
assert.equal(tripEvent.verifiedOn, '2026-10-10');
assert.deepEqual(tripEvent.meeting, { place: '文物館外', time: '9:30–10:00' });
assert.deepEqual(tripEvent.fees, [{ label: '已繳系費', amount: 2500 }, { label: '未繳系費', amount: 3000 }]);
assert.equal(tripEvent.capacityNote, '限 30 人，額滿提前截止。');
assert.equal(tripEvent.formationNote, '報名人數超過 20 人才能成團。');
assert.equal(tripEvent.refundNote, '除重大傷病或喪假，其餘不予退款。');
assert.deepEqual(tripEvent.schedule.map((day) => [day.title, day.dateLabel, day.items.map((item) => [item.time, item.title])]), [
  ['第一天', '11/22', [
    ['9:30–10:00', '集合、簽到、點名'], ['10:00–12:00', '出發'], ['12:00–13:30', '午餐'],
    ['13:30–14:10', '前往空氣島彈跳工廠'], ['14:10–16:00', '空氣島彈跳工廠'],
    ['16:00–17:00', '前往民宿'], ['17:00–17:30', '民宿 Check in'], ['17:30–18:20', '中場休息'],
    ['18:20–20:30', '烤肉'], ['20:30 後', '自由活動'],
  ]],
  ['第二天', '11/23', [
    ['8:00–9:00', '早餐'], ['9:00–9:45', '收行李'], ['9:45–10:00', '退房、上車點名'],
    ['10:00–10:40', '前往傳藝園區'], ['10:40–15:00', '宜蘭傳藝園區'],
    ['15:00–15:20', '集合、點名、上車'], ['15:20–17:20', '回學校解散'],
  ]],
]);

assert.deepEqual(activitiesOnDate('2026-11-18'), [gatheringEvent], 'Gathering must appear on its announced date');
assert.deepEqual(activitiesOnDate('2026-11-17'), [], 'Gathering must not start a day early');
assert.deepEqual(activitiesOnDate('2026-11-19'), [], 'Gathering must not continue the next day');
assert.deepEqual(activitiesOnDate('2026-11-22'), [], 'Cancelled trip must not appear on its first date');
assert.deepEqual(activitiesOnDate('2026-11-23'), [], 'Cancelled trip must not appear on its last date');
for (const dateKey of ['2026-11-21', '2026-11-24', '2026-10-12', '2025-11-22', '2027-11-22', '2026-02-30', '2026-11-22T00:00:00Z', 'invalid']) {
  assert.deepEqual(activitiesOnDate(dateKey), [], `Unexpected activity on ${dateKey}`);
}
assert.deepEqual(activitiesInMonth(2026, 10), [gatheringEvent], 'Only the scheduled gathering must appear in November');
for (const [year, monthIndex] of [[2026, 9], [2026, 11], [2025, 10], [2027, 10], [2026, -1], [2026, 12], [2026, 10.5], [NaN, 10]]) {
  assert.deepEqual(activitiesInMonth(year, monthIndex), [], `Unexpected activity in ${year}/${monthIndex + 1}`);
}

// Taipei 10/12 20:00 equals 10/12 12:00 UTC, not UTC midnight.
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T12:00:00Z')), false);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T20:00:00+08:00')), false);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T23:59:00+08:00')), false);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T23:59:59.999+08:00')), false);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T15:59:59.999Z')), false);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-13T00:00:00+08:00')), true);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-12T16:00:00Z')), true);
assert.equal(registrationDeadlinePassed(tripEvent, new Date('2026-10-13T00:00:00.001+08:00')), true);

// Temporary scheduled fixtures keep normal calendar coverage separate from the cancelled trip.
const scheduledTrip = { ...tripEvent, id: 'scheduled-date-test-only', status: 'scheduled' };
const crossingMonth = { ...scheduledTrip, id: 'month-test-only', startDate: '2026-10-31', endDate: '2026-11-02' };
const crossingYear = { ...scheduledTrip, id: 'year-test-only', startDate: '2026-12-31', endDate: '2027-01-02' };
const cancelledCrossingMonth = { ...tripEvent, id: 'cancelled-month-test-only', startDate: '2027-02-28', endDate: '2027-03-02' };
const reviewedActivityCount = activities.length;
activities.push(scheduledTrip, crossingMonth, crossingYear, cancelledCrossingMonth);
try {
  assert.deepEqual(activitiesOnDate('2026-11-22'), [scheduledTrip]);
  assert.deepEqual(activitiesOnDate('2026-11-23'), [scheduledTrip]);
  assert.deepEqual(activitiesOnDate('2026-11-21'), []);
  assert.deepEqual(activitiesOnDate('2026-11-24'), []);
  assert.deepEqual(activitiesInMonth(2026, 9), [crossingMonth]);
  assert.deepEqual(activitiesInMonth(2026, 10), [gatheringEvent, scheduledTrip, crossingMonth]);
  for (const dateKey of ['2026-10-31', '2026-11-01', '2026-11-02']) {
    assert.deepEqual(activitiesOnDate(dateKey), [crossingMonth]);
  }
  assert.deepEqual(activitiesOnDate('2026-11-03'), []);
  assert.deepEqual(activitiesInMonth(2026, 11), [crossingYear]);
  assert.deepEqual(activitiesInMonth(2027, 0), [crossingYear]);
  assert.deepEqual(activitiesOnDate('2026-12-31'), [crossingYear]);
  assert.deepEqual(activitiesOnDate('2027-01-01'), [crossingYear]);
  assert.deepEqual(activitiesOnDate('2027-01-02'), [crossingYear]);
  assert.deepEqual(activitiesOnDate('2027-01-03'), []);
  assert.deepEqual(activitiesInMonth(2027, 1), []);
  assert.deepEqual(activitiesInMonth(2027, 2), []);
  for (const dateKey of ['2027-02-28', '2027-03-01', '2027-03-02']) {
    assert.deepEqual(activitiesOnDate(dateKey), [], `Cancelled fixture must not appear on ${dateKey}`);
  }
} finally {
  activities.splice(reviewedActivityCount);
}

console.log('Activity facts, gathering interest survey, cancellation filtering, calendar ranges and Taipei deadline boundaries — OK');
