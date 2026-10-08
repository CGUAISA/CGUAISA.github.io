import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  curricula, curriculumSourceUrl, courseCatalogUrl, courseMapUrl,
  type Course, type Grade, type Semester,
} from '../data/curriculum';

const grades: Grade[] = [1, 2, 3, 4];
const gradeLabels = ['大一', '大二', '大三', '大四'];

function initialSelection() {
  const params = new URLSearchParams(window.location.search);
  const requestedYear = Number(params.get('year'));
  const requestedGrade = Number(params.get('grade'));
  return {
    admissionYear: curricula.some((item) => item.admissionYear === requestedYear)
      ? requestedYear : curricula[0].admissionYear,
    grade: (grades.includes(requestedGrade as Grade) ? requestedGrade : 1) as Grade,
  };
}

function CourseTable({ courses, caption }: { courses: Course[]; caption: string }) {
  return (
    <table className="course-table">
      <caption className="sr-only">{caption}</caption>
      <colgroup><col /><col className="course-credits-col" /><col className="course-kind-col" /></colgroup>
      <thead>
        <tr><th scope="col">科目</th><th scope="col">學分</th><th scope="col">類別</th></tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={`${course.name}-${index}`}>
            <th scope="row">
              <span>{course.name}</span>
              {course.kind === 'elective' && course.group && <small className="course-group">{course.group}</small>}
              {course.note && (
                <details className="course-note">
                  <summary aria-label={`${course.name}備註`}>備註</summary>
                  <p>{course.note}</p>
                </details>
              )}
            </th>
            <td className="course-credits">{course.credits}</td>
            <td><span className={`course-kind course-kind-${course.kind}`}>{course.kind === 'required' ? '必修' : '選修'}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CoursesPage() {
  const [{ admissionYear, grade }, setSelection] = useState(initialSelection);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const curriculum = curricula.find((item) => item.admissionYear === admissionYear)!;
  const gradeLabel = gradeLabels[grade - 1];
  const gradeCourses = curriculum.courses.filter((course) => course.grades.includes(grade));
  const unspecified = gradeCourses.filter((course) => course.semester === 'unspecified');

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('year', String(admissionYear));
    url.searchParams.set('grade', String(grade));
    if (url.href !== window.location.href) window.history.replaceState(null, '', url);
  }, [admissionYear, grade]);

  function changeGrade(nextGrade: Grade) {
    setSelection((current) => ({ ...current, grade: nextGrade }));
  }

  function handleGradeKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: Grade) {
    let index: number;
    switch (event.key) {
      case 'ArrowRight': index = current % grades.length; break;
      case 'ArrowLeft': index = (current + grades.length - 2) % grades.length; break;
      case 'Home': index = 0; break;
      case 'End': index = grades.length - 1; break;
      default: return;
    }
    event.preventDefault();
    changeGrade(grades[index]);
    tabRefs.current[index]?.focus();
  }

  function semesterSection(semester: Semester, label: string) {
    const courses = gradeCourses.filter((course) => course.semester === semester);
    return (
      <section className="course-semester" aria-labelledby={`course-${semester}-title`}>
        <h3 id={`course-${semester}-title`}>{label}</h3>
        {courses.length > 0
          ? <CourseTable courses={courses} caption={`${admissionYear}學年度入學適用・${gradeLabel}${label}科目表`} />
          : <p className="course-empty">原表未列{label}科目</p>}
      </section>
    );
  }

  return (
    <main id="main-content" className="courses-page">
      <section id="top" className="courses-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="麵包屑">
            <a href="/">首頁</a><span aria-hidden="true">/</span><span aria-current="page">課程與選課</span>
          </nav>
          <h1>課程與選課</h1>
          <p>依入學學年度查看科目表。</p>
        </div>
      </section>

      <section className="course-directory" aria-label="科目表">
        <div className="container">
          <div className="course-toolbar">
            <div className="course-year-field">
              <label htmlFor="course-admission-year">入學學年度</label>
              <select
                id="course-admission-year"
                value={admissionYear}
                onChange={(event) => setSelection((current) => ({ ...current, admissionYear: Number(event.target.value) }))}
              >
                {curricula.map((item) => <option key={item.admissionYear} value={item.admissionYear}>{item.admissionYear} 學年度入學</option>)}
              </select>
            </div>
            <a className="course-source-link" href={curriculum.sourceUrl} target="_blank" rel="noreferrer">
              官方科目表 PDF <ExternalLink size={16} aria-hidden="true" />
              <span className="sr-only">（開啟新分頁）</span>
            </a>
          </div>

          <div className="course-applicability" aria-live="polite" aria-atomic="true">
            <strong>{admissionYear} 學年度入學適用</strong>
            <span>{curriculum.program}科目表 · {curriculum.revision}</span>
          </div>

          <div className="course-grade-tabs" role="tablist" aria-label="年級">
            {grades.map((item, index) => (
              <button
                key={item}
                id={`course-grade-${item}`}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                aria-selected={grade === item}
                aria-controls="course-grade-panel"
                tabIndex={grade === item ? 0 : -1}
                onClick={() => changeGrade(item)}
                onKeyDown={(event) => handleGradeKeyDown(event, item)}
              >{gradeLabels[index]}</button>
            ))}
          </div>

          <div id="course-grade-panel" role="tabpanel" aria-labelledby={`course-grade-${grade}`} tabIndex={0}>
            <h2 className="sr-only">{gradeLabel}科目表</h2>
            <div className="course-semester-grid" key={`semesters-${admissionYear}-${grade}`}>
              {semesterSection('upper', '上學期')}
              {semesterSection('lower', '下學期')}
            </div>
            {unspecified.length > 0 && (
              <section key={`unspecified-${admissionYear}-${grade}`} className="course-semester course-unspecified" aria-labelledby="course-unspecified-title">
                <h3 id="course-unspecified-title">未指定學期</h3>
                <CourseTable courses={unspecified} caption={`${admissionYear}學年度入學適用・${gradeLabel}未指定學期科目`} />
              </section>
            )}
          </div>

          <div className="course-provenance">
            <p>本頁為科目表整理版，非當學期開課表；完整修課規定以校方公告為準。</p>
            <details key={admissionYear} className="course-curriculum-notes">
              <summary>修課備註</summary>
              <ul>{curriculum.notes.map((note) => <li key={note}>{note}</li>)}</ul>
              <a href={curriculum.sourceUrl} target="_blank" rel="noreferrer">查看原始科目表及完整備註 <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">（開啟新分頁）</span></a>
            </details>
            <small>資料核對：{curriculum.verifiedOn} · <a href={curriculumSourceUrl} target="_blank" rel="noreferrer">來源：人工智慧學系官網<span className="sr-only">（開啟新分頁）</span></a></small>
          </div>
        </div>
      </section>

      <section className="course-resources" aria-labelledby="course-resources-title">
        <div className="container">
          <h2 id="course-resources-title">選課入口</h2>
          <div className="course-resource-links">
            <a href={courseCatalogUrl} target="_blank" rel="noreferrer">課程查詢系統 <ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only">（開啟新分頁）</span></a>
            <a href={courseMapUrl} target="_blank" rel="noreferrer">114 課程地圖 <ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only">（開啟新分頁）</span></a>
            <a href={curriculumSourceUrl} target="_blank" rel="noreferrer">學分抵修資料 <ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only">（開啟新分頁）</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
