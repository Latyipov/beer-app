import React, { useState } from 'react';
import { FormSwitcher } from '@components/EnterComponents/FormSwitcher/FormSwitcher';
import { TabButton } from '@components/EnterComponents/TabButton/TabButton';

export function EnterForm() {
  const [activeTab, setActiveTab] = useState('Authorization');

  const changeActiveTab = (isActiveTab) => {
    setActiveTab(isActiveTab);
  };

  return (
    <div className='bodyApp__enterForm'>
      <div className='tabButtons'>
        <TabButton
          tabButton='Authorization'
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
        <TabButton
          tabButton='Registration'
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
      </div>
      <FormSwitcher activeTab={activeTab} />
    </div>
  );
}
