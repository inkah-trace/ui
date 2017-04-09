const INKAH_SERVER_URL = 'http://localhost:50052'

const fetchMiddleware = store => next => action => {
  next(action);
  let options;
  if (action.meta && action.meta.endpoint) {
    switch (action.meta.method) {
      case 'PUT':
      case 'POST':
        options = {
          method: action.meta.method ? action.meta.method.toLowerCase() : 'post',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (action.meta.body) {
          options.body = JSON.stringify(action.meta.body);
        }

        break;
      default:
        options = {
          method: action.meta.method ? action.meta.method.toLowerCase() : 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        };
    }

    // Override any default headers with those pass in by the action.
    if (action.meta.headers) {
      const actionHeaders = action.meta.headers;
      for (var prop in actionHeaders) {
        if (options.headers[prop]) {
          options.headers[prop] = actionHeaders[prop];
        }
      }
    }

    fetch(INKAH_SERVER_URL + action.meta.endpoint, options)
    .then(function (response) {
      if (response.status >= 300 && response.status < 600) {
        let ex = new Error("Bad response from server");
        ex.response = response;
        throw ex;
      }
      return response.json();
    }).then(function (json) {
      if (action.meta.success) {
        var successResult = action.meta.success(json, action.payload);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (successResult && successResult.type) {
          // This is quite heavy handed, but `next` refers to an
          // un-middleware'd `dispatch` which means that if the
          // successResult needs to invoke another request it won't go through
          // this fetchMiddleware. As such we force if through the middle ware
          fetchMiddleware(store)(next)(successResult);
        }
      }
    }).catch(function (ex) {
      if (action.meta.error) {
        var errorResult = action.meta.error(action.payload, ex.response);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (errorResult && errorResult.type) {
          next(errorResult);
        }
      }
      return ex;
    }).then(function (ex) {
      if (action.meta.finally) {
        var finalResult = action.meta.finally(action.payload);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (finalResult && finalResult.type) {
          // This is quite heavy handed, but `next` refers to an
          // un-middleware'd `dispatch` which means that if the
          // successResult needs to invoke another request it won't go through
          // this fetchMiddleware. As such we force if through the middle ware
          fetchMiddleware(store)(next)(finalResult);
        }
      }
      if (ex) {
        throw ex;
      }
    });

  }
};

export { fetchMiddleware };
