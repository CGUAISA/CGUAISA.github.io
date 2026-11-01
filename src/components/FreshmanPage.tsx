import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { curricula, type Grade } from '../data/curriculum';
import { getRoadmapCourses, learningStages, onboardingStages, onboardingSourcesVerifiedOn, type GuideLink } from '../data/freshman';

type GuideTab = 'guide' | 'learning';

const pageTabs = [
  { id: 'guide', label: '入學指南' },
  { id: 'learning', label: '學習路線' },
] as const;
const gradeLabels = ['大一', '大二', '大三', '大四'];

function initialSelection() {
  const params = new URLSearchParams(window.location.search);
  const year = Number(params.get('year'));
  const grade = Number(params.get('grade'));
  const stage = params.get('stage');
  return {
    tab: (params.get('tab') === 'learning' ? 'learning' : 'guide') as GuideTab,
    year: curricula.some((item) => item.admissionYear === year) ? year : curricula[0].admissionYear,
    grade: (learningStages.some((item) => item.grade === grade) ? grade : learningStages[0].grade) as Grade,
    stage: onboardingStages.some((item) => item.id === stage) ? stage! : onboardingStages[0].id,
  };
}

function nextTabIndex(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number) {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown': return (index + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp': return (index + count - 1) % count;
    case 'Home': return 0;
    case 'End': return count - 1;
    default: return null;
  }
}

function ResourceLink({ link }: { link: GuideLink }) {
  const external = /^https?:\/\//.test(link.url);
  return (
    <a
      href={link.url}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {link.label}
      {external ? <ArrowUpRight size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
      {external && <span className="sr-only">（開啟新分頁）</span>}
    </a>
  );
}

export default function FreshmanPage() {
  const [selection, setSelection] = useState(initialSelection);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const guideRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const learningRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const guideStage = onboardingStages.find((item) => item.id === selection.stage)!;
  const learningStage = learningStages.find((item) => item.grade === selection.grade)!;
  const curriculum = curricula.find((item) => item.admissionYear === selection.year)!;
  const roadmapCourses = getRoadmapCourses(curriculum, selection.grade);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', selection.tab);
    url.searchParams.set('stage', selection.stage);
    url.searchParams.set('year', String(selection.year));
    url.searchParams.set('grade', String(selection.grade));
    if (url.href !== window.location.href) window.history.replaceState(null, '', url);
  }, [selection]);

  function handlePageTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = nextTabIndex(event, index, pageTabs.length);
    if (nextIndex === null) return;
    event.preventDefault();
    setSelection((current) => ({ ...current, tab: pageTabs[nextIndex].id }));
    tabRefs.current[nextIndex]?.focus();
  }

  function handleGuideKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = nextTabIndex(event, index, onboardingStages.length);
    if (nextIndex === null) return;
    event.preventDefault();
    setSelection((current) => ({ ...current, stage: onboardingStages[nextIndex].id }));
    guideRefs.current[nextIndex]?.focus();
  }

  function handleLearningKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = nextTabIndex(event, index, learningStages.length);
    if (nextIndex === null) return;
    event.preventDefault();
    setSelection((current) => ({ ...current, grade: learningStages[nextIndex].grade }));
    learningRefs.current[nextIndex]?.focus();
  }

  return (
    <main id="main-content" className="freshman-page">
      <section id="top" className="freshman-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="麵包屑">
            <a href="/">首頁</a><span aria-hidden="true">/</span><span aria-current="page">新生入門</span>
          </nav>
          <h1>新生入門</h1>
          <div className="freshman-page-tabs" role="tablist" aria-label="新生入門分類">
            {pageTabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`freshman-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selection.tab === tab.id}
                aria-controls={`freshman-panel-${tab.id}`}
                tabIndex={selection.tab === tab.id ? 0 : -1}
                onClick={() => setSelection((current) => ({ ...current, tab: tab.id }))}
                onKeyDown={(event) => handlePageTabKeyDown(event, index)}
              >{tab.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section
        id="freshman-panel-guide"
        className="freshman-directory"
        role="tabpanel"
        aria-labelledby="freshman-tab-guide"
        hidden={selection.tab !== 'guide'}
      >
        <div className="container">
          <p className="freshman-section-intro">依階段整理的準備建議與校方入口。</p>
          <div className="freshman-roadmap-layout">
            <div className="freshman-stage-list" role="tablist" aria-label="入學階段" aria-orientation="vertical">
              {onboardingStages.map((stage, index) => (
                <button
                  key={stage.id}
                  ref={(element) => { guideRefs.current[index] = element; }}
                  id={`freshman-guide-${stage.id}`}
                  className="freshman-stage-button"
                  type="button"
                  role="tab"
                  aria-selected={selection.stage === stage.id}
                  aria-controls="freshman-guide-detail"
                  tabIndex={selection.stage === stage.id ? 0 : -1}
                  onClick={() => setSelection((current) => ({ ...current, stage: stage.id }))}
                  onKeyDown={(event) => handleGuideKeyDown(event, index)}
                >
                  <span className="freshman-stage-dot" aria-hidden="true" />
                  <span><small>{stage.period}</small><strong>{stage.title}</strong></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div
              id="freshman-guide-detail"
              className="freshman-stage-detail"
              role="tabpanel"
              aria-labelledby={`freshman-guide-${guideStage.id}`}
              tabIndex={0}
            >
              <div className="freshman-detail-heading">
                <span>{guideStage.period}</span>
                <h2>{guideStage.title}</h2>
                <p>{guideStage.description}</p>
              </div>
              <ul className="freshman-guide-items">
                {guideStage.items.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    {item.links.length > 0 && (
                      <div className="freshman-resource-links">
                        {item.links.map((link) => <ResourceLink key={link.url} link={link} />)}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <p className="freshman-guide-note">報到時程、申請方式與當年度規定，請以校方公告為準。</p>
              <p className="freshman-source-note">官方入口核對：{onboardingSourcesVerifiedOn}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="freshman-panel-learning"
        className="freshman-directory"
        role="tabpanel"
        aria-labelledby="freshman-tab-learning"
        hidden={selection.tab !== 'learning'}
      >
        <div className="container">
          <div className="freshman-learning-toolbar">
            <div className="freshman-year-field">
              <label htmlFor="freshman-admission-year">入學學年度</label>
              <select
                id="freshman-admission-year"
                value={selection.year}
                onChange={(event) => setSelection((current) => ({ ...current, year: Number(event.target.value) }))}
              >
                {curricula.map((item) => <option key={item.admissionYear} value={item.admissionYear}>{item.admissionYear} 學年度入學</option>)}
              </select>
            </div>
            <p>依入學年度查看課程節點，再安排自己的學習方向。</p>
          </div>

          <div className="freshman-roadmap-layout">
            <div className="freshman-stage-list" role="tablist" aria-label="學習年級" aria-orientation="vertical">
              {learningStages.map((stage, index) => (
                <button
                  key={stage.grade}
                  ref={(element) => { learningRefs.current[index] = element; }}
                  id={`freshman-learning-${stage.grade}`}
                  className="freshman-stage-button"
                  type="button"
                  role="tab"
                  aria-selected={selection.grade === stage.grade}
                  aria-controls="freshman-learning-detail"
                  tabIndex={selection.grade === stage.grade ? 0 : -1}
                  onClick={() => setSelection((current) => ({ ...current, grade: stage.grade }))}
                  onKeyDown={(event) => handleLearningKeyDown(event, index)}
                >
                  <span className="freshman-stage-dot" aria-hidden="true" />
                  <span><small>{gradeLabels[stage.grade - 1]}</small><strong>{stage.title}</strong></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div
              id="freshman-learning-detail"
              className="freshman-stage-detail"
              role="tabpanel"
              aria-labelledby={`freshman-learning-${selection.grade}`}
              tabIndex={0}
            >
              <div className="freshman-detail-heading">
                <span>{gradeLabels[selection.grade - 1]} · {selection.year} 學年度入學</span>
                <h2>{learningStage.title}</h2>
                <p>{learningStage.description}</p>
              </div>

              <section className="freshman-course-section" aria-labelledby="freshman-course-title">
                <h3 id="freshman-course-title">必修科目節選</h3>
                {roadmapCourses.length > 0 ? (
                  <ul className="freshman-course-list">
                    {roadmapCourses.map((course, index) => (
                      <li key={`${course.name}-${course.semester}-${index}`}>
                        <strong>{course.name}</strong>
                        <span>
                          {course.semester === 'upper' ? '上學期' : course.semester === 'lower' ? '下學期' : '未指定學期'}
                          {' · '}{course.kind === 'required' ? '必修' : '選修'}
                        </span>
                        {course.note && <small>{course.note}</small>}
                      </li>
                    ))}
                  </ul>
                ) : <p className="freshman-empty">此年級的科目請至完整科目表查看。</p>}
                <div className="freshman-course-actions">
                  <a className="freshman-primary-link" href={`/courses/?year=${selection.year}&grade=${selection.grade}`}>
                    查看{gradeLabels[selection.grade - 1]}完整科目表 <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <a href={curriculum.sourceUrl} target="_blank" rel="noopener noreferrer">
                    官方科目表 PDF <ExternalLink size={16} aria-hidden="true" />
                    <span className="sr-only">（開啟新分頁）</span>
                  </a>
                </div>
                <p className="freshman-source-note">科目表資料核對：{curriculum.verifiedOn}。此處為節選，完整科目與修課規定請查看原表。</p>
              </section>

              <section className="freshman-suggestions" aria-labelledby="freshman-suggestion-title">
                <h3 id="freshman-suggestion-title">系學會學習建議</h3>
                <ul>{learningStage.suggestions.map((suggestion) => <li key={suggestion}>{suggestion}</li>)}</ul>
              </section>
              <p className="freshman-guide-note">路線圖提供學習方向，並非先修規定或當學期開課表；實際修課以適用科目表與校方公告為準。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
