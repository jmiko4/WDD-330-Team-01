const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  return res.json().then(jsonResponse => {
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  });
}


export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}
export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response = await fetch("http://server-nodejs.cit.byui.edu:3000/login", options);
  const data = await convertToJson(response);
  if (response.ok) {
    localStorage.setItem("so_token", data.token);
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options);
  const data = await convertToJson(response);
  return data.Result;
}