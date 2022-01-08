import { useState } from 'react';

export const KnowledgeBase = () => {
  const [tabSelected, setTabSelected] = useState(1);
  return (
    <main className='section-app-content'>
      <div className='app-content'>
        <h2>Knowledge Base</h2>
        <div className='tab-buttons'>
          <button
            onClick={() => setTabSelected(1)}
            className={`button ${tabSelected === 1 && 'active'}`}
          >
            Useful Resources
          </button>
          <button
            onClick={() => setTabSelected(2)}
            className={`button ${tabSelected === 2 && 'active'}`}
          >
            Datasets
          </button>
          <button
            onClick={() => setTabSelected(3)}
            className={`button ${tabSelected === 3 && 'active'}`}
          >
            Instructional Videos
          </button>
          <button
            onClick={() => setTabSelected(4)}
            className={`button ${tabSelected === 4 && 'active'}`}
          >
            Embedded Tableau
          </button>
        </div>
      </div>
    </main>
  );
};
