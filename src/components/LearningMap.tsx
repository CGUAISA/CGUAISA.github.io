import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Code2, FlaskConical, GraduationCap, Workflow } from 'lucide-react';
import type { Curriculum, Grade } from '../data/curriculum';
import { getRoadmapCourses, learningStages } from '../data/freshman';

type LearningMapProps = {
  curriculum: Curriculum;
  grade: Grade;
  onSelect: (grade: Grade, revealDetails: boolean) => void;
};

const gradeLabels = ['大一', '大二', '大三', '大四'];
const stageIcons = [Code2, Workflow, FlaskConical, GraduationCap];
const compactQuery = '(max-width: 760px)';
const route = 'M 120 246 C 245 246 245 86 370 86 S 505 246 630 246 S 755 86 880 86';

export default function LearningMap({ curriculum, grade, onSelect }: LearningMapProps) {
  const stations = useRef<(HTMLButtonElement | null)[]>([]);
  const [compact, setCompact] = useState(() => window.matchMedia(compactQuery).matches);

  useEffect(() => {
    const media = window.matchMedia(compactQuery);
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': next = (index + 1) % learningStages.length; break;
      case 'ArrowLeft':
      case 'ArrowUp': next = (index + learningStages.length - 1) % learningStages.length; break;
      case 'Home': next = 0; break;
      case 'End': next = learningStages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onSelect(learningStages[next].grade, false);
    stations.current[next]?.focus();
  }

  return (
    <div className="learning-map">
      <div
        className="learning-map-canvas"
        role="tablist"
        aria-label="學習年級"
        aria-orientation={compact ? 'vertical' : 'horizontal'}
      >
        <svg className="learning-map-route" viewBox="0 0 1000 370" preserveAspectRatio="none" aria-hidden="true">
          <path className="learning-map-route-bed" d={route} />
          <path className="learning-map-route-line" d={route} pathLength="1" />
        </svg>
        <span className="learning-map-spine" aria-hidden="true" />
        {learningStages.map((stage, index) => {
          const Icon = stageIcons[index];
          const courses = getRoadmapCourses(curriculum, stage.grade).slice(0, 2);
          return (
            <button
              key={stage.grade}
              ref={(element) => { stations.current[index] = element; }}
              id={`freshman-learning-${stage.grade}`}
              className={`learning-map-stop learning-map-stop-${stage.grade}${grade === stage.grade ? ' is-selected' : ''}`}
              type="button"
              role="tab"
              aria-selected={grade === stage.grade}
              aria-controls="freshman-learning-detail"
              aria-labelledby={`learning-map-year-${stage.grade} learning-map-title-${stage.grade}`}
              aria-describedby={courses.length ? `learning-map-courses-${stage.grade}` : undefined}
              tabIndex={grade === stage.grade ? 0 : -1}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => onSelect(stage.grade, true)}
            >
              <span className="learning-map-node" aria-hidden="true"><Icon size={27} strokeWidth={1.7} /></span>
              <span className="learning-map-copy">
                <span className="learning-map-year" id={`learning-map-year-${stage.grade}`}>{gradeLabels[index]}</span>
                <span className="learning-map-title" id={`learning-map-title-${stage.grade}`}>{stage.title}</span>
                {courses.length > 0 && (
                  <span className="learning-map-courses" id={`learning-map-courses-${stage.grade}`}>
                    {courses.map((course, courseIndex) => <span key={`${course.name}-${courseIndex}`}>{course.name}</span>)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
