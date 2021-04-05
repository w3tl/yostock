let response = Object.create(null);

module.exports = {
  __setResponse: (resp) => {
    response = resp;
  },
  get: (url, callback) => {
    callback(response);
  },
}