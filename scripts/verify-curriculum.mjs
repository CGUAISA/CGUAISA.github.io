import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const sources = ['../src/data/courses-109-111.json', '../src/data/courses-112-115.json'];
const curricula = sources.flatMap((path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8')));
const expectedRequiredCredits = new Map([[109, 57], [110, 57], [111, 63], [112, 60], [113, 60], [114, 61], [115, 61]]);
const expectedCourseCounts = new Map([[109, 64], [110, 65], [111, 65], [112, 54], [113, 53], [114, 53], [115, 56]]);
const years = new Set();

for (const curriculum of curricula) {
  const context = `${curriculum.admissionYear} 入學`;
  assert(!years.has(curriculum.admissionYear), `${context}: duplicate cohort`);
  years.add(curriculum.admissionYear);
  assert(['學系', '學程'].includes(curriculum.program), `${context}: invalid program`);
  assert(/^https:\/\/www\.cgu\.edu\.tw\/Uploads\/upload\/.+\.pdf$/.test(curriculum.sourceUrl), `${context}: missing official PDF source`);
  assert(curriculum.revision && /^\d{4}-\d{2}-\d{2}$/.test(curriculum.verifiedOn), `${context}: missing provenance`);
  assert(Array.isArray(curriculum.notes) && curriculum.notes.length, `${context}: missing source notes`);
  assert.equal(curriculum.courses.length, expectedCourseCounts.get(curriculum.admissionYear), `${context}: reviewed course count changed`);
  const seen = new Set();
  let requiredCredits = 0;
  for (const course of curriculum.courses) {
    assert(course.name.trim(), `${context}: missing course name`);
    assert(['upper', 'lower', 'unspecified'].includes(course.semester), `${context}: invalid semester`);
    assert(['required', 'elective'].includes(course.kind), `${context}: invalid course kind`);
    assert(course.grades.length && course.grades.every((grade) => [1, 2, 3, 4].includes(grade)), `${context}: invalid grade`);
    assert(new Set(course.grades).size === course.grades.length, `${context}: repeated grade`);
    assert(Number.isFinite(course.credits) && course.credits >= 0 && course.credits <= 6, `${context}: invalid credits`);
    const key = JSON.stringify([course.name, course.grades, course.semester, course.kind]);
    assert(!seen.has(key), `${context}: duplicate ${course.name}`);
    seen.add(key);
    if (course.kind === 'required') requiredCredits += course.credits;
  }
  assert.equal(requiredCredits, expectedRequiredCredits.get(curriculum.admissionYear), `${context}: required-credit total differs from official PDF`);
  console.log(`${context}: ${curriculum.courses.length} courses, ${requiredCredits} required credits — OK`);
}
assert.equal(years.size, expectedRequiredCredits.size, 'Missing official cohort');
