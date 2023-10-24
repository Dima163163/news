const URL = 'https://newsapi.org/v2/';
const fetchRequest = async (postfix, {
  method = 'GET',
  callback,
  body,
  headers = {
    'X-Api-Key': 'cd5d32432a9141dbb4185980ae2144c8',
  },
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(`${URL}${postfix}`, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;
