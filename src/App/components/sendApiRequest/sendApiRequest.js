export async function sendApiRequest(requestData) {
  // we need this disable line because this const received from dotenv, but eslint find this like error
  // eslint-disable-next-line no-undef
  const API_BASIC_URL = new URL(REACT_APP_BASIC_BEER_API_URL);
  const apiRequest = new URL(requestData, API_BASIC_URL);

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
