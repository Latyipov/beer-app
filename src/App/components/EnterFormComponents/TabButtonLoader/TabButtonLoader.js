import React, { useState } from 'react';

export function TabButtonLoader({tabButton, activeTab, changeActiveTab}) {
  const onToggleTab = (tabValue) => {
    changeActiveTab(tabValue);
  }
  return (
    <button
      className={activeTab === tabButton ? "tabs active-tabs" : "tabs"}
      onClick={() => onToggleTab(tabButton)}
    >
      {tabButton}
    </button>
  )


}