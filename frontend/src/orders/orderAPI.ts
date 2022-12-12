import { Order } from "./Order";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/orders`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the order(s).";
    default:
      return "There was an error retrieving the order(s). Please try again.";
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

function convertToOrderModels(data: any[]): Order[] {
  let orders: Order[] = data.map(convertToOrderModel);
  return orders;
}

function convertToOrderModel(item: any): Order {
  return new Order(item);
}

const orderAPI = {
  find(id: number) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToOrderModel);
  },
  put(order: Order) {
    return fetch(`${url}/${order.id}`, {
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error updating the order. Please try again."
        );
      });
  },
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToOrderModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the orders. Please try again."
        );
      });
  },
};

export { orderAPI };
