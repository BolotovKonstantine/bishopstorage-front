const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  //convert response to json before checking if it's ok
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(){
    const response = await fetch(baseURL + `items`);
    const data = await convertToJson(response);
    return data;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `items/${id}`);
    const data = await convertToJson(response);
    return data;
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}