export async function getBeerData(requestData, onSuccess, onError, onLoading) {
  try {
    // we need this disable line because this const received from dotenv, but eslint find this like error
    // eslint-disable-next-line no-undef
    const API_BASIC_URL = new URL(REACT_APP_BASIC_BEER_API_URL);
    const apiRequest = new URL(requestData, API_BASIC_URL);
    const apiResponse = await fetch(apiRequest, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const apiResultJSON = await apiResponse.json();
    onLoading(false);
    onSuccess(apiResultJSON);
    return undefined;
  } catch (error) {
    onLoading(false);
    onError(error);
  }
}
