import React from 'react';

export function TabButtonLoader({ tabButton, activeTab, changeActiveTab }) {
  const onToggleTab = (tabName) => {
    changeActiveTab(tabName);
  };
  return (
    <button
      className={activeTab === tabButton ? 'tabs active-tabs' : 'tabs'}
      onClick={() => onToggleTab(tabButton)}
    >
      {tabButton}
    </button>
  );
}
