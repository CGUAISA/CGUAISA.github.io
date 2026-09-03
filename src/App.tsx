import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';

type Theme = 'light' | 'dark';

const notices = [
  {
    marker: '待公告',
    category: '活動消息',
    title: '近期活動資訊整理中',
    note: '正式日期、地點與報名連結確認後更新',
  },
  {
    marker: '常駐',
    category: '新生專區',
    title: '新生常見問題與校園資源索引',
    note: '選課、系館與生活資訊彙整中',
  },
  {
    marker: '徵集中',
    category: '學生回饋',
    title: '有什麼事希望系學會協助？',
    note: '意見表單與處理進度頁面準備中',
  },
];

const events = [
  {
    number: '01',
    category: '認識彼此',
    title: '新生交流',
    description: '從選課、校園生活到學長姐經驗，把剛入學最想問的事情一次聊清楚。',
    state: '企劃中',
    tone: 'orange',
  },
  {
    number: '02',
    category: '一起動手',
    title: '實作工作坊',
    description: '從一個小點子開始，找夥伴、試工具，最後做出可以分享的成果。',
    state: '企劃中',
    tone: 'blue',
  },
  {
    number: '03',
    category: '分享作品',
    title: '成果交流',
    description: '專題、Side Project 或還沒完成的實驗都歡迎，讓彼此看見不同做法。',
    state: '企劃中',
    tone: 'lime',
  },
];

const workItems = [
  {
    index: '01',
    title: '活動與交流',
    text: '新生交流、工作坊、分享會與系上共同活動，讓不同年級真的有機會碰面。',
  },
  {
    index: '02',
    title: '資訊與資源',
    text: '把散落各處的重要資訊整理好，讓選課、競賽與學習資源更容易找到。',
  },
  {
    index: '03',
    title: '意見與溝通',
    text: '收集同學的想法，協助和系上溝通，也把處理進度說清楚。',
  },
];

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
    <article className="notice-row">
      <span className="notice-marker">{notice.marker}</span>
      <div className="notice-copy">
        <span className="notice-category">{notice.category}</span>
        <h3>{notice.title}</h3>
        <p>{notice.note}</p>
      </div>
      <ArrowRight className="notice-arrow" size={20} aria-hidden="true" />
    </article>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <article className="event-card">
      <div className={`event-poster event-poster-${event.tone}`}>
        <div className="event-poster-top">
          <span>COMING SOON</span>
          <span>CGU AISA</span>
        </div>
        <strong>{event.number}</strong>
        <p>{event.title}</p>
      </div>
      <div className="event-body">
        <p className="event-category">{event.category}</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <CalendarDays size={15} aria-hidden="true" />
          <span>{event.state}・正式資訊待公告</span>
        </div>
      </div>
    </article>
  );
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('aisa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        跳至主要內容
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand-link" aria-label="CGU AISA 首頁">
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="主要導覽">
            <DesktopMenu label="關於系學會">
              <a href="#about" onClick={closeContainingMenu}>我們在做什麼</a>
              <a href="#team" onClick={closeContainingMenu}>幹部團隊</a>
            </DesktopMenu>
            <DesktopMenu label="活動資訊">
              <a href="#news" onClick={closeContainingMenu}>最新消息</a>
              <a href="#events" onClick={closeContainingMenu}>近期活動</a>
            </DesktopMenu>
            <DesktopMenu label="學生資源">
              <a href="#resources" onClick={closeContainingMenu}>新生懶人包</a>
              <a href="#resources" onClick={closeContainingMenu}>學習與競賽</a>
            </DesktopMenu>
            <a href="#news">消息</a>
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

          <a className="header-cta" href="#contact">
            聯絡我們
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>

          <details className="mobile-menu">
            <summary>選單</summary>
            <nav aria-label="行動版導覽">
              <a href="#about" onClick={closeContainingMenu}>關於系學會</a>
              <a href="#news" onClick={closeContainingMenu}>最新消息</a>
              <a href="#events" onClick={closeContainingMenu}>近期活動</a>
              <a href="#resources" onClick={closeContainingMenu}>學生資源</a>
              <a href="#team" onClick={closeContainingMenu}>幹部團隊</a>
              <a href="#contact" onClick={closeContainingMenu}>聯絡我們</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Chang Gung University · Department of AI</p>
              <h1>
                課堂之外，
                <span>我們在這裡碰面。</span>
              </h1>
              <p className="hero-intro">
                活動、資源、意見和系上的日常，都整理在同一個地方。這裡是長庚大學人工智慧學系系學會。
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#events">
                  看近期活動
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-text" href="#about">
                  認識我們
                </a>
              </div>
            </div>

            <div className="hero-poster" aria-label="系學會工作重點">
              <span className="poster-tape poster-tape-left" aria-hidden="true" />
              <span className="poster-tape poster-tape-right" aria-hidden="true" />
              <div className="poster-heading">
                <span>CGU AISA</span>
                <span>WELCOME</span>
              </div>
              <p className="poster-small">THIS SEMESTER</p>
              <p className="poster-title">
                一起把系上
                <br />
                變得更好玩。
              </p>
              <div className="poster-notes">
                <span>新生交流</span>
                <span>實作工作坊</span>
                <span>成果分享</span>
              </div>
              <div className="poster-footer">
                <span>LEARN</span>
                <span>MAKE</span>
                <span>MEET</span>
              </div>
            </div>
          </div>

          <div className="container hero-topics" aria-label="系學會工作重點">
            <span>學習資源</span>
            <span>活動企劃</span>
            <span>意見整理</span>
            <span>系所串聯</span>
          </div>
        </section>

        <section id="news" className="section news-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="section-label">Latest updates</p>
                <h2>最近，系上有什麼事？</h2>
              </div>
              <p>重要消息不該散落在群組裡。活動、公告與進度，都會整理在這裡。</p>
            </div>

            <div className="content-grid">
              <div className="notice-list">
                {notices.map((notice) => (
                  <NoticeRow key={notice.title} notice={notice} />
                ))}
                <span className="text-link">
                  正式消息上線後開放查看全部
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>

              <aside className="quick-panel" aria-label="常用入口">
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
                  <a href="#contact">
                    意見與聯絡
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a href="https://www.cgu.edu.tw/ai" target="_blank" rel="noreferrer">
                    人工智慧學系官網
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                </nav>
                <div className="quick-note">
                  <CalendarDays size={20} aria-hidden="true" />
                  <div>
                    <strong>本學期行事曆</strong>
                    <span>正式時程待系學會確認</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="section-label">What we do</p>
              <h2>把同學真正需要的事，做好。</h2>
              <p>不用複雜的口號。系學會的工作，就是讓資訊好找、活動好參加、意見有人接住。</p>
            </div>

            <div className="work-grid">
              {workItems.map((item) => (
                <article key={item.index} className="work-card">
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="section events-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="section-label">Upcoming events</p>
                <h2>近期活動</h2>
              </div>
              <p>活動確定後，會在這裡補上正式日期、照片、場地與報名連結。</p>
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
            <div className="resources-copy">
              <p className="section-label section-label-light">Student resources</p>
              <h2>少走一點冤枉路。</h2>
              <p>
                從新生常見問題、課程經驗，到競賽與專題資源，之後都會按主題整理，不必再翻遍每個聊天群組。
              </p>
              <a href="#contact" className="button button-light">
                告訴我們你想找什麼
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="resource-list">
              {['新生入門', '課程與選課', '競賽與專題', '表單與借用'].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <em>資料整理中</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="container team-grid">
            <div>
              <p className="section-label">Meet the team</p>
              <h2>事情有人做，訊息有人回。</h2>
            </div>
            <div className="team-copy">
              <p>
                幹部姓名與照片收到後，這裡會換成正式團隊介紹。目前先保留各組職務，讓之後的內容有清楚位置。
              </p>
              <div className="team-roles" aria-label="預計呈現的幹部職務">
                {['會長', '副會長', '學術', '活動', '公關設計', '財務'].map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <p>有活動想參加、有合作想提出，或只是有件事希望系學會知道。</p>
              <h2>來找我們聊聊。</h2>
            </div>
            <div className="contact-action">
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
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <Brand />
          <p>長庚大學人工智慧學系系學會</p>
          <a href="#top">回到頂端 ↑</a>
        </div>
      </footer>
    </div>
  );
}
