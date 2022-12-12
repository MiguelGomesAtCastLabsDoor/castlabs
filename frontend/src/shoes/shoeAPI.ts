import { Shoe } from "./Shoe";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/shoes`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the shoe(s).";
    default:
      return "There was an error retrieving the shoe(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToShoeModels(data: any[]): Shoe[] {
  let shoes: Shoe[] = data.map(convertToShoeModel);
  return shoes;
}

function convertToShoeModel(item: any): Shoe {
  return new Shoe(item);
}

const shoeAPI = {
  find(id: number) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToShoeModel);
  },
  put(shoe: Shoe) {
    return fetch(`${url}/${shoe.id}`, {
      method: "PUT",
      body: JSON.stringify(shoe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error updating the shoe. Please try again."
        );
      });
  },
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToShoeModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the shoes. Please try again."
        );
      });
  },
};

export { shoeAPI };
