export async function FactsLoader(factQuantity, factId) {
  const API_BASIC_URL = new URL(REACT_APP_BASIC_API_CAT_FACTS_URL);
  let apiRequest;
  if (!factId) {
    apiRequest = new URL('random', API_BASIC_URL);
    apiRequest.searchParams.set('animal_type', 'cat');
    apiRequest.searchParams.set('amount', factQuantity);
  } else {
    apiRequest = new URL(factId, API_BASIC_URL);
  }
  const apiRequestResult = await fetch(apiRequest, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const apiRequestResultJSON = await apiRequestResult.json();
  if (!Array.isArray(apiRequestResultJSON)) {
    return [apiRequestResultJSON];
  } else {
    return apiRequestResultJSON;
  }
}
