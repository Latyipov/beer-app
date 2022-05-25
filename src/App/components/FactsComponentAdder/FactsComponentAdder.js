import React, { useState } from 'react';
import './FactsComponentAdder.css';
import { changeCounterValue } from '../changeCounterValue/changeCounterValue';
import { FactsLoader } from '../FactsLoader/FactsLoader';
import { PusherToFirebase } from '@components/firebaseFunctions/PusherToFirebase/PusherToFirebase';

export function FactsComponentAdder({ userId }) {
  const [factValue, setFactValue] = useState(1);
  const [facts, setFacts] = useState('');

  const onCounterButtonClick = (counterDirection) => {
    const counterResult = changeCounterValue(counterDirection, factValue, 1);
    setFactValue(counterResult);
  };

  const onShowFactButtonClick = async () => {
    try {
      const DownloadedFacts = await FactsLoader(factValue);
      const FactsLayout = DownloadedFacts.map((factObj) => {
        return (
          <div className='factsBox' key={factObj._id}>
            {factObj.text}
            <button
              className='btn'
              onClick={() => PusherToFirebase(userId, 'favoriteFacts', factObj._id)}
            >
              add to favorite
            </button>
          </div>
        );
      });
      setFacts(FactsLayout);
    } catch {
      const ErrorLayout = (
        <div className='error'>Sorry, API with cat-facts not available now. Try again.</div>
      );
      setFacts(ErrorLayout);
    }
  };

  return !facts ? (
    <div className='factNavigation'>
      <button onClick={() => onCounterButtonClick('-')} className='factNavigation_nav-btn'>
        -
      </button>
      <button className='btn' onClick={() => onShowFactButtonClick()}>
        Show me {factValue} cat-fact
      </button>
      <button onClick={() => onCounterButtonClick('+')} className='factNavigation_nav-btn'>
        +
      </button>
    </div>
  ) : (
    <div>
      <button className='btn' onClick={() => setFacts('')}>
        hide cat-fact
      </button>
      <h2>Some Cat-fact:</h2>
      {facts}
    </div>
  );
}
