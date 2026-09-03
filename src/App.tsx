import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  CalendarDays,
  MapPin,
  Sparkles,
} from 'lucide-react';

const values = [
  {
    number: '01',
    title: '一起學得更遠',
    text: '整理課程與學習資源，透過講座、工作坊與經驗分享，降低探索 AI 的門檻。',
    label: 'LEARN',
  },
  {
    number: '02',
    title: '一起做出成果',
    text: '讓課堂之外的點子找到夥伴，從第一次組隊，到真正完成一個能展示的作品。',
    label: 'BUILD',
  },
  {
    number: '03',
    title: '一起成為系上的連結',
    text: '傳遞意見、促成交流，也為每一屆同學留下更友善、更有參與感的系所生活。',
    label: 'CONNECT',
  },
];

const events = [
  {
    month: 'SEP',
    day: '18',
    eyebrow: '新生交流 · 自由入場',
    title: 'AI 新生導航站',
    text: '選課經驗、校園資源與學長姐 QA，一次補齊大學生活的第一份使用說明。',
    location: '系館共享空間（示意）',
    tone: 'mint',
  },
  {
    month: 'OCT',
    day: '03',
    eyebrow: '實作工作坊 · 名額有限',
    title: 'Prompt Lab：從靈感到原型',
    text: '用一個晚上，把腦中的點子變成可操作的小作品；不用先是高手，也能一起動手做。',
    location: '電腦教室（示意）',
    tone: 'cream',
  },
  {
    month: 'OCT',
    day: '24',
    eyebrow: '成果交流 · 開放投稿',
    title: 'AISA Demo Night',
    text: '展示專題、Side Project 與研究中的半成品；分享的不只成果，也包括走過的彎路。',
    location: '國際會議廳（示意）',
    tone: 'orange',
  },
];

const roles = [
  { role: '會長', code: 'PRES.', focus: '統籌方向與對外代表' },
  { role: '副會長', code: 'VICE', focus: '跨部門協作與執行' },
  { role: '學術組', code: 'ACAD.', focus: '講座、工作坊與資源' },
  { role: '活動組', code: 'EVENT', focus: '交流活動與現場體驗' },
  { role: '公關設計', code: 'CREW', focus: '社群、合作與視覺溝通' },
];

function EventCard({ event, index }: { event: (typeof events)[number]; index: number }) {
  const toneClass =
    event.tone === 'mint'
      ? 'bg-[#bfeeda]'
      : event.tone === 'orange'
        ? 'bg-[#ffb17e]'
        : 'bg-[#f8f4e8]';

  return (
    <article className={`group flex min-h-[420px] flex-col rounded-[1.75rem] border border-[#0b2232]/12 p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:p-7 ${toneClass}`}>
      <div className="flex items-start justify-between">
        <div className="font-mono">
          <span className="block text-[10px] tracking-[0.2em] text-[#0b2232]/55">{event.month}</span>
          <span className="block text-5xl font-semibold tracking-[-0.08em]">{event.day}</span>
        </div>
        <span className="rounded-full border border-[#0b2232]/15 px-3 py-1 font-mono text-[10px] tracking-[0.14em]">
          0{index + 1}
        </span>
      </div>

      <div className="mt-auto pt-16">
        <p className="text-xs font-semibold tracking-[0.08em] text-[#0b2232]/60">{event.eyebrow}</p>
        <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em]">{event.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#0b2232]/68">{event.text}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#0b2232]/12 pt-5 text-xs text-[#0b2232]/60">
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {event.location}
        </span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="border-b border-white/10 bg-[#091a27] px-5 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-[#a8e9d2] sm:text-xs">
        2026 WEBSITE PROTOTYPE · 部分內容為示意資料
      </div>

      <section className="signal-grid relative min-h-[calc(100vh-33px)] bg-[#0b2232] text-[#f4f2e9]">
        <div className="pointer-events-none absolute left-[7%] top-[28%] h-2 w-2 rounded-full bg-[#74efc5] shadow-[0_0_32px_9px_rgba(116,239,197,0.28)]" />
        <div className="pointer-events-none absolute bottom-[14%] right-[9%] h-2 w-2 rounded-full bg-[#ff9e61] shadow-[0_0_30px_8px_rgba(255,158,97,0.2)]" />

        <header className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="回到首頁頂端">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#74efc5]/40 bg-[#74efc5] text-sm font-black tracking-tighter text-[#0b2232] transition-transform group-hover:rotate-6">
              AI
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-[0.12em]">CGU AISA</span>
              <span className="block text-[10px] tracking-[0.08em] text-white/55">人工智慧學系系學會</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex" aria-label="主要導覽">
            <a className="transition-colors hover:text-[#74efc5]" href="#about">關於我們</a>
            <a className="transition-colors hover:text-[#74efc5]" href="#events">近期活動</a>
            <a className="transition-colors hover:text-[#74efc5]" href="#team">幹部團隊</a>
          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-[#74efc5] hover:text-[#74efc5] sm:inline-flex"
          >
            <AtSign className="h-4 w-4" aria-hidden="true" />
            聯絡我們
          </a>

          <details className="group relative sm:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-white/20 px-4 py-2 text-xs font-semibold">MENU</summary>
            <nav className="absolute right-0 top-12 flex w-44 flex-col gap-1 rounded-2xl border border-white/10 bg-[#102d3f] p-2 text-sm shadow-2xl" aria-label="行動版導覽">
              <a className="rounded-xl px-4 py-3 hover:bg-white/8" href="#about">關於我們</a>
              <a className="rounded-xl px-4 py-3 hover:bg-white/8" href="#events">近期活動</a>
              <a className="rounded-xl px-4 py-3 hover:bg-white/8" href="#team">幹部團隊</a>
              <a className="rounded-xl px-4 py-3 text-[#74efc5] hover:bg-white/8" href="#contact">聯絡我們</a>
            </nav>
          </details>
        </header>

        <div id="top" className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:min-h-[calc(100vh-125px)] lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#74efc5]/25 bg-[#74efc5]/8 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#a8e9d2]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              CHANG GUNG UNIVERSITY · AISA
            </div>

            <h1 className="text-balance text-[clamp(3.3rem,8vw,7.8rem)] font-black leading-[0.92] tracking-[-0.065em]">
              把想法，
              <span className="mt-2 block text-[#74efc5]">訓練成行動。</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/66 sm:text-lg">
              長庚大學人工智慧學系系學會，串連同學、知識與校園生活，讓每一次交流都成為下一個可能。
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#events" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#74efc5] px-6 text-sm font-bold text-[#0b2232] transition-transform hover:-translate-y-0.5">
                探索近期活動
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <a href="#about" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white">
                認識系學會
              </a>
            </div>

            <div className="mt-12 flex items-center gap-4 text-[10px] text-white/45 sm:gap-5 sm:text-xs">
              <span className="font-mono tracking-[0.16em]">LEARN</span>
              <span className="h-px w-6 bg-white/20 sm:w-9" />
              <span className="font-mono tracking-[0.16em]">BUILD</span>
              <span className="h-px w-6 bg-white/20 sm:w-9" />
              <span className="font-mono tracking-[0.16em]">CONNECT</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="signal-card relative aspect-[4/4.35] overflow-hidden rounded-[2rem] border border-white/13 bg-[#102d3f]/80 p-5 shadow-[0_40px_100px_rgba(1,12,20,0.38)] backdrop-blur sm:p-8">
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.14em] text-white/38 sm:text-[10px]">
                <span>SIGNAL GARDEN / 001</span>
                <span>25.0330° N</span>
              </div>

              <div className="relative mt-7 h-[calc(100%-48px)]">
                <div className="absolute left-[9%] top-[9%] w-[64%] rounded-3xl border border-[#74efc5]/25 bg-[#74efc5]/10 p-4 sm:w-[58%] sm:p-5">
                  <span className="mb-7 block h-2 w-2 rounded-full bg-[#74efc5] shadow-[0_0_18px_4px_rgba(116,239,197,0.35)] sm:mb-10" />
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#a8e9d2] sm:text-[10px]">01 / LEARN</p>
                  <p className="mt-2 text-base font-bold sm:text-xl">讓知識開始流動</p>
                </div>

                <div className="absolute right-[3%] top-[45%] w-[58%] rounded-3xl border border-white/14 bg-[#f4f2e9] p-4 text-[#0b2232] shadow-xl sm:w-[52%] sm:p-5">
                  <span className="mb-7 block h-2 w-2 rounded-full bg-[#ff8f50] sm:mb-9" />
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#376276] sm:text-[10px]">02 / BUILD</p>
                  <p className="mt-2 text-base font-bold sm:text-xl">把靈感做成作品</p>
                </div>

                <div className="absolute bottom-[4%] left-[4%] w-[52%] rounded-3xl border border-white/14 bg-[#153a4d] p-4 sm:w-[46%] sm:p-5">
                  <span className="mb-5 block h-2 w-2 rounded-full bg-[#a8e9d2] sm:mb-7" />
                  <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 sm:text-[10px]">03 / CONNECT</p>
                  <p className="mt-2 text-base font-bold sm:text-lg">找到同行的人</p>
                </div>

                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none" aria-hidden="true">
                  <path d="M105 170C150 230 288 180 361 264C398 306 355 370 278 397C231 414 176 406 124 432" stroke="#74EFC5" strokeOpacity=".38" strokeWidth="1.4" strokeDasharray="4 7" />
                </svg>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-full border border-white/10 bg-[#091a27] px-4 py-2 font-mono text-[10px] tracking-[0.13em] text-white/55 sm:-left-8">
              STATUS · GROWING
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f4f2e9] px-5 py-24 text-[#0b2232] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <p className="section-kicker">01 / WHAT WE DO</p>
              <h2 className="mt-6 max-w-xl text-balance text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-6xl">
                AI 不只是一門課，<br />也是一起前進的方法。
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-[#0b2232]/62">
                系學會是一座持續更新的節點：讓資訊更透明、讓想法找到隊友，也讓每個聲音更容易被聽見。
              </p>
            </div>

            <div className="divide-y divide-[#0b2232]/15 border-y border-[#0b2232]/15">
              {values.map((value) => (
                <article key={value.number} className="group grid gap-5 py-8 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:py-10">
                  <span className="font-mono text-xs tracking-[0.18em] text-[#0b2232]/42">{value.number}</span>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.03em] sm:text-3xl">{value.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#0b2232]/62 sm:text-base">{value.text}</p>
                  </div>
                  <span className="w-fit rounded-full bg-[#d9f7eb] px-3 py-1 font-mono text-[10px] tracking-[0.16em] transition-colors group-hover:bg-[#74efc5]">{value.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 grid overflow-hidden rounded-[1.75rem] border border-[#0b2232]/12 bg-[#0b2232] text-[#f4f2e9] sm:grid-cols-3">
            {[['OPEN', '讓資訊更透明'], ['MAKE', '讓想法能落地'], ['TOGETHER', '讓每個人有連結']].map(([label, text], index) => (
              <div key={label} className={`p-7 sm:p-9 ${index < 2 ? 'border-b border-white/10 sm:border-b-0 sm:border-r' : ''}`}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#74efc5]">{label}</p>
                <p className="mt-8 text-xl font-bold">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f2e9] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12" aria-label="系學會品牌概念">
        <figure className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#0b2232]/12 bg-[#0b2232] shadow-[0_24px_70px_rgba(11,34,50,0.12)] sm:rounded-[2rem]">
            <img
              src={`${import.meta.env.BASE_URL}og.png`}
              alt="訊號花園品牌視覺：節點與有機路徑由左下向右上生長，象徵學生想法彼此連結並化為行動"
              width="1730"
              height="909"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 flex flex-col justify-between gap-2 px-1 font-mono text-[10px] tracking-[0.13em] text-[#0b2232]/42 sm:flex-row">
            <span>SIGNAL GARDEN / BRAND STUDY 01</span>
            <span>IDEAS → CONNECTIONS → ACTION</span>
          </figcaption>
        </figure>
      </section>

      <section id="events" className="bg-[#e5ece8] px-5 py-24 text-[#0b2232] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">02 / ON THE CALENDAR</p>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-6xl">近期訊號</h2>
            </div>
            <div className="max-w-md sm:text-right">
              <p className="text-sm leading-7 text-[#0b2232]/62">先以三種代表性活動呈現資訊架構；日期、場地與報名連結會在收到正式資料後替換。</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-[#0b2232]/48">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> DEMO CONTENT
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {events.map((event, index) => <EventCard key={event.title} event={event} index={index} />)}
          </div>
        </div>
      </section>

      <section id="team" className="signal-grid bg-[#0b2232] px-5 py-24 text-[#f4f2e9] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-kicker section-kicker-dark">03 / THE TEAM</p>
              <h2 className="mt-6 max-w-2xl text-balance text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-6xl">讓每個想法，<br />都有人接住。</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/58 lg:ml-auto">
              我們來自不同年級與興趣，但都希望把系上的學習、活動與人連得更緊密。以下職務為版面示意，收到正式名單與照片後即可更新。
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((item, index) => (
              <article key={item.role} className="group min-h-[280px] bg-[#102d3f] p-7 transition-colors hover:bg-[#153a4d]">
                <div className="flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-[#74efc5]/25 bg-[#74efc5]/8 font-mono text-xs tracking-[0.12em] text-[#a8e9d2]">{item.code}</div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/30">0{index + 1}</span>
                </div>
                <div className="mt-20">
                  <p className="font-mono text-[10px] tracking-[0.15em] text-[#74efc5]">姓名／照片待提供</p>
                  <h3 className="mt-2 text-2xl font-black">{item.role}</h3>
                  <p className="mt-2 text-sm text-white/48">{item.focus}</p>
                </div>
              </article>
            ))}

            <article className="flex min-h-[280px] flex-col justify-between bg-[#74efc5] p-7 text-[#0b2232]">
              <span className="font-mono text-[10px] tracking-[0.16em]">NEXT NODE / YOU?</span>
              <div>
                <h3 className="text-3xl font-black tracking-[-0.04em]">下一位可能是你</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#0b2232]/65">保留一個位置給願意一起把系上變得更好的人。</p>
              </div>
              <a href="#contact" className="inline-flex w-fit items-center gap-2 border-b border-[#0b2232]/35 pb-1 text-sm font-bold">
                了解加入方式 <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="data-needed" className="bg-[#f4f2e9] px-5 py-20 text-[#0b2232] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 rounded-[2rem] border border-[#0b2232]/12 bg-white/55 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
          <div>
            <p className="section-kicker">PROTOTYPE NOTES</p>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl">下一版，只差你們的真實內容。</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['正式 Logo 與標準色', '幹部姓名與照片', '活動日期與報名連結', 'Instagram 與聯絡信箱', '精選活動照片 10–20 張', '系學會正式簡介'].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-[#0b2232]/10 bg-[#f4f2e9] px-4 py-4 text-sm font-semibold">
                <span className="font-mono text-[10px] text-[#0b2232]/38">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#ff9e61] px-5 py-24 text-[#0b2232] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[10px] font-semibold tracking-[0.2em]">04 / STAY CONNECTED</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <h2 className="max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">下一個活動，<br />想和你一起完成。</h2>
            <div className="lg:pb-2">
              <p className="max-w-md text-base leading-8 text-[#0b2232]/67">想參加活動、提出合作，或只是有件事想讓系學會知道，都歡迎來找我們。</p>
              <a href="#data-needed" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#0b2232] px-6 text-sm font-bold text-[#f4f2e9] transition-transform hover:-translate-y-0.5">
                補上正式聯絡資訊後啟用
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#091a27] px-5 py-9 text-[#f4f2e9] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#74efc5] text-xs font-black text-[#0b2232]">AI</span>
            <div>
              <p className="text-sm font-bold tracking-[0.08em]">CGU AISA</p>
              <p className="text-[10px] text-white/40">長庚大學人工智慧學系系學會</p>
            </div>
          </div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-white/35">PROTOTYPE · CONTENT SUBJECT TO REVIEW</p>
          <a href="#top" className="text-sm font-semibold text-[#74efc5]">回到頂端 ↑</a>
        </div>
      </footer>
    </main>
  );
}
