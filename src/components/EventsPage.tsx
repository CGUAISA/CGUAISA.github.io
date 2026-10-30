import { ArrowUpRight } from 'lucide-react';
import { gatheringEvent, gatheringRegistrationEvent, registrationDeadlinePassed, tripEvent } from '../data/events';
import { useRegistrationDeadline } from '../hooks/useRegistrationDeadline';

export default function EventsPage() {
  const deadlinePassed = registrationDeadlinePassed(tripEvent);
  const cancelled = tripEvent.status === 'cancelled';
  const gatheringRegistrationClosed = useRegistrationDeadline(gatheringRegistrationEvent);

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
          <article className="trip-detail formal-gathering-detail" id={gatheringRegistrationEvent.id} aria-labelledby="gathering-registration-title">
            <div className="trip-detail-header formal-gathering-header">
              <div className="formal-gathering-heading">
                <span className="trip-term">{gatheringRegistrationEvent.term}</span>
                <h2 id="gathering-registration-title">{gatheringRegistrationEvent.title}</h2>
                <span className="trip-status gathering-status formal-gathering-status">正式報名</span>
              </div>
              {gatheringRegistrationClosed ? (
                <button className="button trip-signup registration-closed" type="button" disabled>
                  報名已截止
                </button>
              ) : (
                <a
                  className="button button-primary trip-signup"
                  href={gatheringRegistrationEvent.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="填寫正式報名（開啟新分頁）"
                >
                  填寫正式報名
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              )}
            </div>

            <p className="formal-gathering-introduction">{gatheringRegistrationEvent.introduction}</p>

            <dl className="trip-facts gathering-facts">
              <div>
                <dt>活動日期</dt>
                <dd>
                  <time dateTime={`${gatheringRegistrationEvent.startDate}T${gatheringRegistrationEvent.time}:00+08:00`}>
                    {gatheringRegistrationEvent.startDate.replaceAll('-', '/')}（{gatheringRegistrationEvent.weekdayLabel}）{gatheringRegistrationEvent.time}
                  </time>
                </dd>
              </div>
              <div>
                <dt>用餐地點</dt>
                <dd>
                  <a
                    className="gathering-map-link"
                    href={gatheringRegistrationEvent.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${gatheringRegistrationEvent.venue}，查看地圖（開啟新分頁）`}
                  >
                    {gatheringRegistrationEvent.venue}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </dd>
              </div>
              <div>
                <dt>報名截止</dt>
                <dd>{gatheringRegistrationEvent.deadlineLabel}</dd>
              </div>
            </dl>

            <section className="formal-gathering-section" aria-labelledby="gathering-advisor-title">
              <h3 id="gathering-advisor-title">導生資格</h3>
              <p>{gatheringRegistrationEvent.advisorRule}</p>
              <p className="formal-gathering-examples">例如學號末兩碼為 {gatheringRegistrationEvent.advisorExamples.join('、')}…等。</p>
            </section>

            <section className="formal-gathering-section" aria-labelledby="gathering-subsidy-title">
              <h3 id="gathering-subsidy-title">補助金額</h3>
              <p className="gathering-table-hint">可左右滑動查看完整表格。</p>
              <div className="gathering-subsidy-table-wrapper" role="region" aria-label="補助金額比較表，可左右捲動" tabIndex={0}>
                <table className="gathering-subsidy-table">
                  <caption className="sr-only">依導生資格與系學會費繳交狀態比較補助金額</caption>
                  <thead>
                    <tr>
                      <th scope="col">導生資格</th>
                      <th scope="col">系學會費</th>
                      <th scope="col">補助金額</th>
                      <th scope="col">補助說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gatheringRegistrationEvent.subsidyOptions.map((option) => (
                      <tr key={option.id}>
                        <th scope="row">{option.mentee ? 'Renata 老師導生' : '非導生'}</th>
                        <td>{option.paidFee ? '已繳' : '未繳'}</td>
                        <td className="gathering-subsidy-amount">
                          {option.amount === 0 ? '無補助' : `${option.isMaximum ? '最高 ' : ''}NT$ ${option.amount.toLocaleString('zh-TW')}`}
                        </td>
                        <td>{option.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="formal-gathering-section" aria-labelledby="gathering-rules-title">
              <h3 id="gathering-rules-title">用餐與補助發放規則</h3>
              <dl className="gathering-rules">
                {gatheringRegistrationEvent.rules.map((rule) => (
                  <div key={rule.title}>
                    <dt>{rule.title}</dt>
                    <dd>{rule.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>

          <article className="trip-detail gathering-detail" id={gatheringEvent.id} aria-labelledby="gathering-title">
            <div className="trip-detail-header">
              <div>
                <span className="trip-term">{gatheringEvent.term}</span>
                <div className="gathering-title-row">
                  <h2 id="gathering-title">{gatheringEvent.title}</h2>
                  <span className="trip-status gathering-status">前期意願調查</span>
                </div>
              </div>
              <a
                className="button button-primary trip-signup"
                href={gatheringEvent.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="開啟前期意願調查（開啟新分頁）"
              >
                開啟前期調查
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
              <p>此為前期意願調查，並非正式報名；正式報名請使用新的正式報名表單。</p>
              <a href={`#${gatheringRegistrationEvent.id}`}>
                前往正式報名資訊 <ArrowUpRight size={18} aria-hidden="true" />
              </a>
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
