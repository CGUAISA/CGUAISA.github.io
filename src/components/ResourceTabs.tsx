import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, BookOpen, ClipboardList, GraduationCap, Trophy } from 'lucide-react';

const categories = [
  { label: '新生入門', Icon: GraduationCap },
  { label: '課程與選課', Icon: BookOpen },
  { label: '競賽與專題', Icon: Trophy },
  { label: '表單與借用', Icon: ClipboardList },
] as const;

export default function ResourceTabs() {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = `${id}-resource-panel`;
  const selectedCategory = categories[selectedIndex];
  const SelectedIcon = selectedCategory.Icon;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % categories.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + categories.length) % categories.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = categories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="resource-tabs">
      <div className="resource-tablist" role="tablist" aria-label="新生資源分類">
        {categories.map(({ label, Icon }, index) => (
          <button
            key={label}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${id}-resource-tab-${index}`}
            className={`resource-tab${selectedIndex === index ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls={panelId}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <Icon className="resource-tab-icon" size={18} aria-hidden="true" />
            <span className="resource-tab-label">{label}</span>
          </button>
        ))}
      </div>

      <div
        key={selectedCategory.label}
        id={panelId}
        className="resource-tab-panel"
        role="tabpanel"
        aria-labelledby={`${id}-resource-tab-${selectedIndex}`}
        tabIndex={0}
      >
        <div className="resource-panel-copy">
          <h3>{selectedCategory.label}</h3>
          {selectedCategory.label === '課程與選課' ? (
            <>
              <p className="resource-panel-status">依入學學年度查看科目表</p>
              <a className="resource-course-link" href="/courses/">
                查看科目表 <ArrowRight size={17} aria-hidden="true" />
              </a>
            </>
          ) : <p className="resource-panel-status">資料整理中</p>}
        </div>
        <div className="resource-panel-illustration" aria-hidden="true">
          <SelectedIcon className="resource-panel-icon" size={44} strokeWidth={1.4} />
          <div className="resource-panel-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
