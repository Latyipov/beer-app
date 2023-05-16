export async function getBeerData(requestData: string) {
  try {
    // we need this disable line because this const received from dotenv, but ts find this like error
    // @ts-expect-error: const from dotenv
    const API_BASIC_URL = new URL(REACT_APP_BASIC_BEER_API_URL);
    const apiRequest = new URL(requestData, API_BASIC_URL);
    const apiResponse = await fetch(apiRequest, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const apiResultJSON = await apiResponse.json();
    return {
      itemObject: apiResultJSON,
      errorMessage: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        itemObject: null,
        errorMessage: error.message,
      };
    }
    return {
      itemObject: null,
      errorMessage: 'unexpected Error',
    };
  }
}
