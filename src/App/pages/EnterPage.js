
import React, { useState } from 'react';
import { FormSwitcher } from "../components/EnterFormComponents/FormSwitcher/FormSwitcher"
import { TabButtonLoader } from "../components/EnterFormComponents/TabButtonLoader/TabButtonLoader"
import './EnterPage.css'

export function EnterPage() {


  const [activeTab, setActiveTab] = useState('Authorisation');

  const changeActiveTab = (isActiveTab) => {
    setActiveTab(isActiveTab);
  }

  return (
    <div className='bodyApp'>
      <h1 className='bodyApp__h1'>Welcome</h1>
      <div className='tabButtons'>
        <TabButtonLoader tabButton='Authorisation' activeTab={activeTab} changeActiveTab={changeActiveTab}/>
        <TabButtonLoader tabButton='Registration' activeTab={activeTab} changeActiveTab={changeActiveTab}/>
      </div>
      <FormSwitcher activeTab={activeTab} />

    </div >)



}

