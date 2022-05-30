import React, { useState } from 'react';
import '@components/FactsComponent/FactsComponent.css';
import { changeCounterValue } from '@components/changeCounterValue/changeCounterValue';
import { loadSomeFacts } from '@components/loadSomeFacts/loadSomeFacts';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';

export function FactsComponent({ userId }) {
  const [factCounterValue, setFactCounterValue] = useState(1);
  const [factsLayout, setFactsLayout] = useState('');

  const onCounterButtonClick = (counterDirection) => {
    const counterResult = changeCounterValue(counterDirection, factCounterValue, 1);
    setFactCounterValue(counterResult);
  };

  const onShowFactButtonClick = async () => {
    try {
      const factsData = await loadSomeFacts(factCounterValue);
      const transformedDataToLayout = factsData.map((factObject) => {
        return (
          <div className='factsBox' key={factObject._id}>
            {factObject.text}
            <button
              className='btn'
              onClick={() => pushDataToFirebase(userId, 'favoriteFacts', factObject._id)}
            >
              add to favorite
            </button>
          </div>
        );
      });
      setFactsLayout(transformedDataToLayout);
    } catch {
      const errorLayout = (
        <div className='error'>Sorry, API with cat-facts not available now. Try again.</div>
      );
      setFactsLayout(errorLayout);
    }
  };

  return !factsLayout ? (
    <div className='factNavigation'>
      <button onClick={() => onCounterButtonClick('-')} className='factNavigation_nav-btn'>
        -
      </button>
      <button className='btn' onClick={() => onShowFactButtonClick()}>
        Show me {factCounterValue} cat-fact
      </button>
      <button onClick={() => onCounterButtonClick('+')} className='factNavigation_nav-btn'>
        +
      </button>
    </div>
  ) : (
    <div>
      <button className='btn' onClick={() => setFactsLayout('')}>
        hide cat-fact
      </button>
      <h2>Some Cat-fact:</h2>
      {factsLayout}
    </div>
  );
}
