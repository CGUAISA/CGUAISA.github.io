import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Mail,
  MessageCircle,
  Moon,
  Sun,
  Users,
} from 'lucide-react';
import ResourceTabs from './components/ResourceTabs';
import WorkVisual from './components/WorkVisual';
import CoursesPage from './components/CoursesPage';
import { useScrollReveal } from './hooks/useScrollReveal';

type Theme = 'light' | 'dark';

const notices = [
  {
    marker: '待公告',
    category: '活動消息',
    title: '近期活動資訊整理中',
  },
  {
    marker: '常駐',
    category: '新生專區',
    title: '新生常見問題與校園資源索引',
  },
  {
    marker: '徵集中',
    category: '學生回饋',
    title: '有什麼事希望系學會協助？',
  },
];

const events = [
  {
    number: '01',
    title: '新生交流',
    state: '企劃中',
    tone: 'orange',
  },
  {
    number: '02',
    title: '工作坊',
    state: '企劃中',
    tone: 'blue',
  },
  {
    number: '03',
    title: '成果交流',
    state: '企劃中',
    tone: 'lime',
  },
];

const workItems = [
  {
    index: '01',
    title: '活動與交流',
    icon: Users,
  },
  {
    index: '02',
    title: '資訊與資源',
    icon: BookOpen,
  },
  {
    index: '03',
    title: '意見與溝通',
    icon: MessageCircle,
  },
];

const leadershipRoles = [
  { role: '會長', group: '核心協調' },
  { role: '副會長', group: '核心協調' },
  { role: '顧問', group: '核心協調' },
  { role: '秘書長', group: '核心協調' },
  { role: '活動長', group: '活動與對外' },
  { role: '公關長', group: '活動與對外' },
  { role: '美宣長', group: '活動與對外' },
  { role: '機動', group: '活動與對外' },
  { role: '總務', group: '行政與資源' },
  { role: '副總務', group: '行政與資源' },
  { role: '器材長', group: '行政與資源' },
  { role: '會議代表', group: '學生代表' },
];

const leadershipGroups = [...new Set(leadershipRoles.map((item) => item.group))];

function closeContainingMenu(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest('details')?.removeAttribute('open');
}

function Brand() {
  return (
    <span className="brand-lockup">
      <span className="brand-mark" aria-hidden="true">
        A<span className="brand-dot" />
      </span>
      <span className="brand-copy">
        <strong>CGU AISA</strong>
        <small>人工智慧學系系學會</small>
      </span>
    </span>
  );
}

function DesktopMenu({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="desktop-menu">
      <summary>
        {label}
        <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
      </summary>
      <div className="desktop-menu-panel">{children}</div>
    </details>
  );
}

function NoticeRow({ notice }: { notice: (typeof notices)[number] }) {
  return (
    <article className="notice-row" data-reveal="up">
      <span className="notice-marker">{notice.marker}</span>
      <div className="notice-copy">
        <span className="notice-category">{notice.category}</span>
        <h3>{notice.title}</h3>
      </div>
      <ArrowRight className="notice-arrow" size={20} aria-hidden="true" />
    </article>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <article className="event-card" data-reveal="up" data-reveal-delay={String((Number(event.number) - 1) * 100)}>
      <div className={`event-poster event-poster-${event.tone}`}>
        <strong aria-hidden="true">{event.number}</strong>
        <h3>{event.title}</h3>
      </div>
      <div className="event-body">
        <div className="event-meta">
          <CalendarDays size={15} aria-hidden="true" />
          <span>{event.state}</span>
        </div>
      </div>
    </article>
  );
}

function WorkFeature({ item, direction }: { item: (typeof workItems)[number]; direction: 'left' | 'right' }) {
  const Icon = item.icon;

  return (
    <article className="work-feature" data-reveal={direction} data-reveal-delay={item.index === '03' ? '100' : '0'}>
      <span className="work-feature-index" aria-hidden="true">{item.index}</span>
      <span className="work-feature-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.5} /></span>
      <h3>{item.title}</h3>
    </article>
  );
}

function MiniCalendar() {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    return {
      date,
      inCurrentMonth: date.getMonth() === month,
      isToday: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayKey,
    };
  });

  return (
    <section id="calendar" className="mini-calendar" aria-label="月份行事曆">
      <div className="mini-calendar-header">
        <div>
          <span>Semester calendar</span>
          <h4>{year} 年 {month + 1} 月</h4>
        </div>
        <div className="mini-calendar-controls">
          <button
            type="button"
            onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
            aria-label="上個月"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
            aria-label="下個月"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mini-calendar-weekdays" aria-hidden="true">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="mini-calendar-grid">
        {calendarDays.map(({ date, inCurrentMonth, isToday }) => (
          <time
            key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
            dateTime={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`}
            className={`${inCurrentMonth ? '' : 'is-outside'}${isToday ? ' is-today' : ''}`}
            aria-current={isToday ? 'date' : undefined}
          >
            {date.getDate()}
          </time>
        ))}
      </div>
      <p className="mini-calendar-note">
        <span><i aria-hidden="true" />今天・{today.getMonth() + 1}/{today.getDate()}</span>
        <span>活動日期待確認</span>
      </p>
    </section>
  );
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function TeamPage() {
  return (
    <main id="main-content" className="team-page">
      <section id="top" className="team-page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="麵包屑">
            <a href="/">首頁</a>
            <span aria-hidden="true">/</span>
            <span>幹部團隊</span>
          </nav>
          <h1 data-reveal="up">系學會幹部</h1>
          <div className="team-page-summary" aria-label="幹部頁摘要">
            <div><strong>{leadershipRoles.length}</strong><span>個職位</span></div>
            <div><strong>{leadershipGroups.length}</strong><span>個職務群組</span></div>
          </div>
        </div>
      </section>

      <section className="team-directory-section">
        <div className="container">
          <div className="team-directory-heading" data-reveal="up">
            <div>
              <h2>職務一覽</h2>
            </div>
          </div>

          <div className="leadership-grid">
            {leadershipRoles.map((item, index) => (
              <article className="leadership-card" key={item.role} data-reveal="up" data-reveal-delay={String((index % 3) * 100)}>
                <div>
                  <h3>{item.role}</h3>
                </div>
                <small>成員資料待補</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-page-contact">
        <div className="container team-page-contact-inner">
          <div>
            <h2>聯絡幹部</h2>
          </div>
          <a className="button team-contact-button" href="/#contact">
            前往聯絡資訊
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  useScrollReveal();

  useEffect(() => {
    if (!window.location.hash) return;

    let targetId: string;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    // Cross-page anchors resolve after React has mounted their target sections.
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('aisa-theme', theme);
    } catch {
      // Theme switching also works when browser storage is unavailable.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f0f0e' : '#ffffff');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const pagePath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  const isTeamPage = pagePath === '/team';
  const isCoursesPage = pagePath === '/courses';
  const isSubpage = isTeamPage || isCoursesPage;
  const homeSectionHref = (section: string) =>
    isSubpage ? `/${section}` : section;

  return (
    <div className="site-shell final-design reference-design">
      <a className="skip-link" href="#main-content">
        跳至主要內容
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href={isSubpage ? '/' : homeSectionHref('#top')} className="brand-link" aria-label="CGU AISA 首頁">
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="主要導覽">
            <DesktopMenu label="關於系學會">
              <a href={homeSectionHref('#about')} onClick={closeContainingMenu}>我們在做什麼</a>
              <a href="/team/" onClick={closeContainingMenu} aria-current={isTeamPage ? 'page' : undefined}>幹部團隊</a>
            </DesktopMenu>
            <DesktopMenu label="活動資訊">
              <a href={homeSectionHref('#news')} onClick={closeContainingMenu}>最新消息</a>
              <a href={homeSectionHref('#events')} onClick={closeContainingMenu}>近期活動</a>
            </DesktopMenu>
            <DesktopMenu label="學生資源">
              <a href={homeSectionHref('#resources')} onClick={closeContainingMenu}>新生懶人包</a>
              <a href="/courses/" onClick={closeContainingMenu} aria-current={isCoursesPage ? 'page' : undefined}>課程與選課</a>
              <a href={homeSectionHref('#resources')} onClick={closeContainingMenu}>學習與競賽</a>
            </DesktopMenu>
            <a href={homeSectionHref('#news')}>消息</a>
          </nav>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '切換為日間模式' : '切換為夜間模式'}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            <span>{theme === 'dark' ? '日間' : '夜間'}</span>
          </button>

          <a className="header-cta" href={homeSectionHref('#contact')}>
            聯絡我們
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>

          <details className="mobile-menu">
            <summary>選單</summary>
            <nav aria-label="行動版導覽">
              <a href={homeSectionHref('#about')} onClick={closeContainingMenu}>關於系學會</a>
              <a href={homeSectionHref('#news')} onClick={closeContainingMenu}>最新消息</a>
              <a href={homeSectionHref('#events')} onClick={closeContainingMenu}>近期活動</a>
              <a href={homeSectionHref('#resources')} onClick={closeContainingMenu}>學生資源</a>
              <a href="/courses/" onClick={closeContainingMenu} aria-current={isCoursesPage ? 'page' : undefined}>課程與選課</a>
              <a href="/team/" onClick={closeContainingMenu} aria-current={isTeamPage ? 'page' : undefined}>幹部團隊</a>
              <a href={homeSectionHref('#contact')} onClick={closeContainingMenu}>聯絡我們</a>
            </nav>
          </details>
        </div>
      </header>

      {isTeamPage ? <TeamPage /> : isCoursesPage ? <CoursesPage /> : <main id="main-content">
        <section id="top" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Chang Gung University · Department of AI</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#events">
                  看近期活動
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="hero-poster" aria-label="活動照片預留位置">
              <span className="poster-tape poster-tape-left" aria-hidden="true" />
              <span className="poster-tape poster-tape-right" aria-hidden="true" />
              <div className="poster-heading">
                <span>CGU AISA</span>
                <span>WELCOME</span>
              </div>
            </div>
          </div>

        </section>

        <section id="news" className="section news-section">
          <div className="container">
            <div className="section-heading split-heading" data-reveal="up">
              <div>
                <h2>最新消息</h2>
              </div>
            </div>

            <div className="content-grid">
              <div className="notice-list">
                {notices.map((notice) => (
                  <NoticeRow key={notice.title} notice={notice} />
                ))}
              </div>

              <aside className="quick-panel" aria-label="常用入口" data-reveal="right">
                <div className="quick-panel-heading">
                  <span>Quick links</span>
                  <h3>常用入口</h3>
                </div>
                <nav>
                  <a href="#events">
                    活動與報名
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a href="#resources">
                    新生懶人包
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a href="/courses/">
                    課程與選課
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a href="#contact">
                    意見與聯絡
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a href="https://www.cgu.edu.tw/ai" target="_blank" rel="noreferrer">
                    人工智慧學系官網
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                </nav>
                <MiniCalendar />
              </aside>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-heading centered-heading" data-reveal="up">
              <h2>系學會工作</h2>
            </div>

            <div className="work-stage">
              <div className="work-side">
                <WorkFeature item={workItems[0]} direction="left" />
              </div>
              <WorkVisual />
              <div className="work-side">
                {workItems.slice(1).map((item) => <WorkFeature key={item.index} item={item} direction="right" />)}
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="section events-section">
          <div className="container">
            <div className="section-heading split-heading" data-reveal="up">
              <div>
                <h2>近期活動</h2>
              </div>
            </div>

            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event.number} event={event} />
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="section resources-section">
          <div className="container resources-grid">
            <div className="resources-copy" data-reveal="up">
              <h2>新生懶人包</h2>
            </div>
            <div data-reveal="up">
              <ResourceTabs />
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="container team-overview">
            <div className="section-heading centered-heading" data-reveal="up">
              <h2>幹部團隊</h2>
            </div>
            <div className="team-overview-table-wrapper" data-reveal="fade">
              <table className="team-overview-table">
                <caption className="sr-only">系學會幹部職務一覽</caption>
                <thead>
                  <tr><th scope="col">職務群組</th><th scope="col">職位</th></tr>
                </thead>
                <tbody>
                  {leadershipGroups.map((group) => (
                    <tr key={group}>
                      <th scope="row" className="team-group-name">{group}</th>
                      <td className="team-group-roles">
                        {leadershipRoles.filter((item) => item.group === group).map((item) => <span key={item.role}>{item.role}</span>)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a className="team-page-link" href="/team/">
              查看幹部團隊
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div data-reveal="left">
              <h2>聯絡我們</h2>
            </div>
            <div className="contact-action" data-reveal="right">
              <span className="contact-icon" aria-hidden="true">
                <Mail size={27} />
              </span>
              <div>
                <strong>聯絡方式即將補上</strong>
                <span>Instagram 與系學會信箱整理中</span>
              </div>
            </div>
          </div>
        </section>
      </main>}

      <footer id="footer" className="site-footer">
        <div className="container">
          <div className="footer-columns">
            <section className="footer-column footer-about" aria-labelledby="footer-about-title">
              <h2 id="footer-about-title">系學會</h2>
              <a className="footer-brand" href={isSubpage ? '/' : '#top'} aria-label="CGU AISA 首頁">
                <Brand />
              </a>
              <p className="footer-school">長庚大學</p>
            </section>

            <section className="footer-column" aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title">聯絡方式</h2>
              <ul className="footer-contact-list">
                <li>
                  <Camera size={18} aria-hidden="true" />
                  <span>Instagram</span>
                  <small>待補</small>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <span>系學會信箱</span>
                  <small>待補</small>
                </li>
              </ul>
              <a className="footer-contact-link" href={homeSectionHref('#contact')}>
                聯絡資訊
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </section>

            <nav className="footer-column" aria-labelledby="footer-resources-title">
              <h2 id="footer-resources-title">學生資源</h2>
              <ul className="footer-links">
                <li><a href={homeSectionHref('#resources')}>新生懶人包</a></li>
                <li><a href="/courses/" aria-current={isCoursesPage ? 'page' : undefined}>課程與選課</a></li>
                <li><a href={homeSectionHref('#events')}>近期活動</a></li>
                <li><a href={homeSectionHref('#calendar')}>行事曆</a></li>
              </ul>
            </nav>

            <nav className="footer-column" aria-labelledby="footer-links-title">
              <h2 id="footer-links-title">快速連結</h2>
              <ul className="footer-links">
                <li><a href="/">首頁</a></li>
                <li><a href="/team/" aria-current={isTeamPage ? 'page' : undefined}>幹部團隊</a></li>
                <li>
                  <a href="https://www.cgu.edu.tw/ai" target="_blank" rel="noreferrer" aria-label="學系官網（開啟新分頁）">
                    學系官網
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-bottom">
            <small>© {new Date().getFullYear()} CGU AISA</small>
            <a className="footer-back-to-top" href="#top">
              回到頂端
              <ChevronUp size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
