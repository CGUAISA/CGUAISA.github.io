import { ArrowUpRight } from 'lucide-react';
import { gatheringEvent, registrationDeadlinePassed, tripEvent } from '../data/events';

export default function EventsPage() {
  const deadlinePassed = registrationDeadlinePassed(tripEvent);
  const cancelled = tripEvent.status === 'cancelled';

  return (
    <main id="main-content" className="events-page">
      <section id="top" className="events-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="麵包屑">
            <a href="/">首頁</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">活動與報名</span>
          </nav>
          <h1>活動與報名</h1>
        </div>
      </section>

      <section className="event-directory" aria-label="活動詳情">
        <div className="container">
          <article className="trip-detail gathering-detail" id={gatheringEvent.id} aria-labelledby="gathering-title">
            <div className="trip-detail-header">
              <div>
                <span className="trip-term">{gatheringEvent.term}</span>
                <div className="gathering-title-row">
                  <h2 id="gathering-title">{gatheringEvent.title}</h2>
                  <span className="trip-status gathering-status">意願調查</span>
                </div>
              </div>
              <a
                className="button button-primary trip-signup"
                href={gatheringEvent.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="填寫意願調查（開啟新分頁）"
              >
                填寫意願調查
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>

            <dl className="trip-facts gathering-facts">
              <div>
                <dt>預計日期</dt>
                <dd>
                  <time dateTime={`${gatheringEvent.startDate}T${gatheringEvent.time}:00+08:00`}>
                    {gatheringEvent.startDate.replaceAll('-', '/')}（{gatheringEvent.weekdayLabel}）{gatheringEvent.time}
                  </time>
                </dd>
              </div>
              <div>
                <dt>地點</dt>
                <dd>{gatheringEvent.venue}</dd>
              </div>
              <div>
                <dt>系學會費補助</dt>
                <dd>
                  額外補助 <strong>NT$ {gatheringEvent.subsidy.amount.toLocaleString('zh-TW')}</strong>
                  <span className="gathering-eligibility">{gatheringEvent.subsidy.eligibility}</span>
                </dd>
              </div>
            </dl>

            <aside className="gathering-survey-notice" aria-label="意願調查說明">
              <p>{gatheringEvent.surveyNotice}</p>
            </aside>
          </article>

          <article className="trip-detail" id={tripEvent.id} aria-labelledby="trip-title">
            <div className="trip-detail-header">
              <div>
                <span className="trip-term">{tripEvent.term}</span>
                <h2 id="trip-title">{tripEvent.title}</h2>
              </div>
              {cancelled ? (
                <span className="trip-status">已取消</span>
              ) : (
                <a
                  className="button button-primary trip-signup"
                  href={tripEvent.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${deadlinePassed ? '查看原表單' : '填寫報名表'}（開啟新分頁）`}
                >
                  {deadlinePassed ? '查看原表單' : '填寫報名表'}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              )}
            </div>

            {cancelled ? (
              <div className="trip-cancelled-notice">
                <p>原訂 {tripEvent.dateLabel} 的系遊已取消，不再開放報名。</p>
                <a href="/#contact">聯絡系學會 <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
            ) : <>
            <dl className="trip-facts">
              <div>
                <dt>活動日期</dt>
                <dd>2026 年<br />{tripEvent.dateLabel}</dd>
              </div>
              <div>
                <dt>集合</dt>
                <dd>{tripEvent.meeting.place}<br />{tripEvent.meeting.time}</dd>
              </div>
              <div>
                <dt>費用</dt>
                <dd className="trip-fees">
                  {tripEvent.fees.map((fee) => (
                    <p key={fee.label}><span>{fee.label}</span><strong>NT$ {fee.amount.toLocaleString('zh-TW')}</strong></p>
                  ))}
                </dd>
              </div>
              <div>
                <dt>報名截止</dt>
                <dd>{tripEvent.deadlineLabel}</dd>
              </div>
            </dl>
            {deadlinePassed && (
              <p className="trip-deadline-note">公告報名期限已過，最新狀態以表單為準。</p>
            )}
            <ul className="trip-notes">
              <li>{tripEvent.capacityNote}</li>
              <li>{tripEvent.formationNote}</li>
              <li>{tripEvent.refundNote}</li>
            </ul>

            <div className="trip-schedule">
              <h3>行程</h3>
              <div className="trip-days">
                {tripEvent.schedule.map((day) => (
                  <section className="trip-day" key={day.title} aria-label={`${day.title}行程`}>
                    <h4>{day.title}・{day.dateLabel}</h4>
                    <ol>
                      {day.items.map((item) => (
                        <li key={item.time}>
                          <time>{item.time}</time>
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
            <p className="trip-source">
              依報名表整理，行程與報名狀態以原表單為準。{' '}
              <a href={tripEvent.formUrl} target="_blank" rel="noopener noreferrer" aria-label="原始報名表（開啟新分頁）">原始報名表</a>
            </p>
            </>}
          </article>
        </div>
      </section>
    </main>
  );
}
