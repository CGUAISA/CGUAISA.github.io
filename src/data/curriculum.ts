import earlierCurricula from './courses-109-111.json';
import recentCurricula from './courses-112-115.json';

export type Grade = 1 | 2 | 3 | 4;
export type Semester = 'upper' | 'lower' | 'unspecified';

export type Course = {
  name: string;
  grades: Grade[];
  semester: Semester;
  credits: number;
  kind: 'required' | 'elective';
  group?: string;
  note?: string;
};

export type Curriculum = {
  admissionYear: number;
  program: '學程' | '學系';
  sourceUrl: string;
  revision: string;
  verifiedOn: string;
  courses: Course[];
  notes: string[];
};

export const curricula = ([...earlierCurricula, ...recentCurricula] as Curriculum[])
  .sort((a, b) => b.admissionYear - a.admissionYear);

export const curriculumSourceUrl = 'https://www.cgu.edu.tw/ai/Contents?nodeId=639';
export const courseMapUrl = 'https://www.cgu.edu.tw/Uploads/upload/eee92e16-09d2-4af1-bf2c-634dc22b2a6d.pdf';
export const courseCatalogUrl = 'https://catalog.cgu.edu.tw/';
