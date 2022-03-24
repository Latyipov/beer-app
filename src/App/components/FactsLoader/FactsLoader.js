import React, { useState } from 'react';

export async function FactsLoader(factQuantity, factId) {
  const baseUrl = new URL('https://cat-fact.herokuapp.com/facts/591f98803b90f7150a19c229');
  let newUrl;
  if (!factId) {
    newUrl = new URL('random', baseUrl);
    newUrl.searchParams.set('animal_type', 'cat');
    newUrl.searchParams.set('amount', factQuantity);
  }
  else {
    newUrl = new URL(factId, baseUrl);
  }

  try {
    const result = await fetch(newUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }});
    const resultJSON = await result.json();
    if (!Array.isArray(resultJSON)) {
      return [resultJSON];
    }
    else {
      return resultJSON;
    }
  }
  catch (error) {
    console.log(error);
  }

}
