import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, BookOpen, ClipboardList, GraduationCap, Trophy } from 'lucide-react';

const categories = [
  { key: 'freshmen', label: '新生入門', Icon: GraduationCap },
  { key: 'courses', label: '課程與選課', Icon: BookOpen },
  { key: 'competitions', label: '競賽與專題', Icon: Trophy },
  { key: 'forms', label: '表單與借用', Icon: ClipboardList },
] as const;

function initialSelectedIndex() {
  const resource = new URLSearchParams(window.location.search).get('resource');
  const index = categories.findIndex((category) => category.key === resource);
  return index === -1 ? 0 : index;
}

export default function ResourceTabs() {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = `${id}-resource-panel`;
  const selectedCategory = categories[selectedIndex];
  const SelectedIcon = selectedCategory.Icon;

  function selectCategory(index: number) {
    setSelectedIndex(index);
    const url = new URL(window.location.href);
    url.searchParams.set('resource', categories[index].key);
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }

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
    selectCategory(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="resource-tabs">
      <div className="resource-tablist" role="tablist" aria-label="新生資源分類">
        {categories.map(({ key, label, Icon }, index) => (
          <button
            key={key}
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
            onClick={() => selectCategory(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <Icon className="resource-tab-icon" size={18} aria-hidden="true" />
            <span className="resource-tab-label">{label}</span>
          </button>
        ))}
      </div>

      <div
        key={selectedCategory.key}
        id={panelId}
        className="resource-tab-panel"
        role="tabpanel"
        aria-labelledby={`${id}-resource-tab-${selectedIndex}`}
        tabIndex={0}
      >
        <div className="resource-panel-copy">
          <h3>{selectedCategory.label}</h3>
          {selectedCategory.key === 'freshmen' ? (
            <>
              <p className="resource-panel-status">從入學準備，到四年學習方向。</p>
              <div className="resource-entry-links">
                <a className="resource-course-link" href="/freshman/">
                  入學指南 <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="resource-course-link" href="/freshman/?tab=learning">
                  學習路線 <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </>
          ) : selectedCategory.key === 'courses' ? (
            <>
              <p className="resource-panel-status">依入學學年度查看科目表</p>
              <a className="resource-course-link" href="/courses/">
                查看科目表 <ArrowRight size={17} aria-hidden="true" />
              </a>
            </>
          ) : selectedCategory.key === 'competitions' ? (
            <>
              <p className="resource-panel-status">學系公告與歷屆專題</p>
              <div className="resource-entry-links">
                <a className="resource-course-link" href="https://www.cgu.edu.tw/ai/Subject?nodeId=17719" target="_blank" rel="noopener noreferrer">
                  競賽資訊 <ArrowRight size={17} aria-hidden="true" />
                  <span className="sr-only">（開啟新分頁）</span>
                </a>
                <a className="resource-course-link" href="https://www.cgu.edu.tw/ai/Subject?nodeId=16543" target="_blank" rel="noopener noreferrer">
                  畢業專題展 <ArrowRight size={17} aria-hidden="true" />
                  <span className="sr-only">（開啟新分頁）</span>
                </a>
              </div>
            </>
          ) : selectedCategory.key === 'forms' ? (
            <>
              <p className="resource-panel-status">學系系統</p>
              <div className="resource-entry-links">
                <a className="resource-course-link" href="http://120.126.23.215:5200/" target="_blank" rel="noopener noreferrer">
                  物品借用系統 <ArrowRight size={17} aria-hidden="true" />
                  <span className="sr-only">（開啟新分頁）</span>
                </a>
                <a className="resource-course-link" href="http://120.126.23.215:5500/" target="_blank" rel="noopener noreferrer">
                  海報申請系統 <ArrowRight size={17} aria-hidden="true" />
                  <span className="sr-only">（開啟新分頁）</span>
                </a>
              </div>
            </>
          ) : null}
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
