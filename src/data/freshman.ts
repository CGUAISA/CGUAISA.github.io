import type { Course, Curriculum, Grade } from './curriculum';

export type GuideLink = { label: string; url: string };
export type GuideItem = { title: string; detail: string; links: GuideLink[] };
export type GuideStage = {
  id: string;
  title: string;
  period: string;
  description: string;
  items: GuideItem[];
};

const official = {
  freshman: 'https://www.cgu.edu.tw/freshman/',
  faq: 'https://www.cgu.edu.tw/ai/FAQ?nodeId=19643',
  portal: 'https://i.cgu.edu.tw/',
  courses: 'https://catalog.cgu.edu.tw/course',
  housing: 'https://www.cgu.edu.tw/studentaffairs/Subject?nodeId=15018',
  library: 'https://www.cgu.edu.tw/library/',
  counseling: 'https://www.cgu.edu.tw/studentaffairs/Contents?nodeId=7510',
};

export const onboardingSourcesVerifiedOn = '2026-11-01';

// These are suggested preparation steps, not the university's registration checklist.
export const onboardingStages: GuideStage[] = [
  {
    id: 'before-arrival',
    title: '入學前',
    period: '先確認資訊',
    description: '先找到適用自己學制與入學年度的公告。',
    items: [
      {
        title: '確認入學事項',
        detail: '註冊、文件、體檢與繳費事項，依當年度校方公告確認。',
        links: [{ label: '新生入學服務網', url: official.freshman }],
      },
      {
        title: '先看新生 QA',
        detail: '電腦準備、上課方式與系上生活，先看學系整理的常見問題。',
        links: [{ label: '學系新生 QA', url: official.faq }],
      },
      {
        title: '認識四年課程',
        detail: '選擇自己的入學年度，了解各年級的課程安排。',
        links: [{ label: '查看學習路線', url: '/freshman/?tab=learning' }],
      },
    ],
  },
  {
    id: 'getting-ready',
    title: '開學準備',
    period: '帳號與生活',
    description: '確認校務入口，安排自己的開學準備。',
    items: [
      {
        title: '確認帳號與信箱',
        detail: '依新生網的登入說明，確認能使用 iCGU 與學生信箱。',
        links: [
          { label: 'iCGU 長庚入口', url: official.portal },
          { label: '新生登入說明', url: official.freshman },
        ],
      },
      {
        title: '安排住宿與到校',
        detail: '有住宿需求時，先查閱住宿公告，再安排入住與到校交通。',
        links: [{ label: '校方住宿公告', url: official.housing }],
      },
      {
        title: '記下重要日期',
        detail: '從新生網查看行事曆與註冊資訊，將適用的日期加入自己的行事曆。',
        links: [{ label: '查看校方入學資訊', url: official.freshman }],
      },
    ],
  },
  {
    id: 'first-month',
    title: '開學第一個月',
    period: '選課與上課',
    description: '先熟悉課程，再找到適合自己的學習節奏。',
    items: [
      {
        title: '核對科目與開課資訊',
        detail: '依入學年度查看科目表；當學期的課程資訊另到校方系統查詢。',
        links: [
          { label: '入學年度科目表', url: '/courses/' },
          { label: '校方課程查詢', url: official.courses },
        ],
      },
      {
        title: '熟悉上課與作業方式',
        detail: '閱讀各課教學大綱，確認教材、作業與提問方式；EMI 等常見問題可先看學系 QA。',
        links: [{ label: '學系新生 QA', url: official.faq }],
      },
      {
        title: '安排每週練習',
        detail: '建議固定留時間練習程式與數學，記下卡住的問題，向授課老師或助教請教。',
        links: [{ label: '查看學習路線', url: '/freshman/?tab=learning' }],
      },
    ],
  },
  {
    id: 'campus-life',
    title: '校園生活',
    period: '資源與協助',
    description: '把會用到的資源與聯絡方式留在手邊。',
    items: [
      {
        title: '使用圖書館資源',
        detail: '查詢館藏、電子資源與借閱資訊；服務時間以圖書館公告為準。',
        links: [{ label: '長庚大學圖書館', url: official.library }],
      },
      {
        title: '認識校園支持資源',
        detail: '適應學習與生活的過程中，也可以了解學校的諮商與輔導服務。',
        links: [{ label: '諮商輔導組', url: official.counseling }],
      },
      {
        title: '和系學會保持聯絡',
        detail: '查看活動消息，或透過 Instagram、信箱聯絡系學會。',
        links: [
          { label: '近期活動', url: '/#events' },
          { label: '聯絡系學會', url: '/#contact' },
        ],
      },
    ],
  },
];

export type LearningStage = {
  grade: Grade;
  title: string;
  description: string;
  suggestions: string[];
};

// The themes below are association suggestions. Course placement comes only from
// the selected cohort's existing curriculum snapshot, not this narrative.
export const learningStages: LearningStage[] = [
  {
    grade: 1,
    title: '程式與數學基礎',
    description: '從程式、數學與系上的入門課程開始。',
    suggestions: [
      '跟著課程練習，把程式拆成能說明的小步驟。',
      '整理數學觀念與錯題，保留自己的程式練習紀錄。',
      '試做一個小作品，例如資料整理或簡單的互動工具。',
    ],
  },
  {
    grade: 2,
    title: '演算法與 AI 方法',
    description: '把程式與數學用在資料處理、演算法與模型上。',
    suggestions: [
      '練習說明資料結構與演算法的選擇理由。',
      '用小型資料集走過資料整理、訓練與評估。',
      '開始閱讀感興趣的研究方向，了解老師的專長。',
    ],
  },
  {
    grade: 3,
    title: '應用與專題探索',
    description: '從感興趣的問題出發，累積應用與專題經驗。',
    suggestions: [
      '把想研究的問題寫清楚，再和老師討論可行的方向。',
      '記錄資料來源、實驗設定與結果，方便重現與比較。',
      '練習團隊分工、版本管理與成果說明。',
    ],
  },
  {
    grade: 4,
    title: '專題整理與下一步',
    description: '完成階段成果，依興趣安排升學、實習或就業準備。',
    suggestions: [
      '整理專題報告、展示與作品說明，留下可交接的文件。',
      '依目標準備履歷、作品集或研究計畫。',
      '核對畢業規定；實習、升學與徵才資訊回官方公告確認。',
    ],
  },
];

export function getRoadmapCourses(curriculum: Curriculum, grade: Grade): Course[] {
  return curriculum.courses.filter((course) => course.kind === 'required' && course.grades.includes(grade));
}
