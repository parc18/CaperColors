const getJavaUrl = (context, params) => {
  // getJavaUrl
  let url = 'https://capers.herokuapp.com/api';
  const accessToken = 'abc';
  switch (
    context // eslint-disable-line  default-case
  ) {
    case 'ping':
      url += '/ping';
      break;
    case 'events':
      if (params.length > 1) {
        url += `/event?city_id=${params[0]}&game_id=${params[1]}`;
      } else {
        url += `/event?city_id=${params}`;
      }
      break;
    case 'prices':
      url += `/event_prices?event_id=${params}`;
      break;
    case 'payment':
      url += '/book_event';
      break;
    case 'thankyou':
      url += `/payment_status?paymentId=${params}`;
      break;
    case 'cities':
      url += '/cities';
      break;
    case 'sports':
      url += '/sports';
      break;
    // no default
  }
  return {
    url,
    accessToken
  };
};

export const getAPIData = (context, params, postdata, requestMethod = false) => {
  let apiCall = '';
  apiCall = getJavaUrl(context, params);
  const { url, accessToken } = apiCall;
  try {
    return new Promise((resolve, reject) => {
      require('require-ensure-shim').shim(require);
      require.ensure(['unirest'], require => {
        const unirest = require('unirest');
        let request;
        let method;
        if (typeof postdata !== 'undefined') {
          if (requestMethod === 'Delete') {
            request = unirest.delete(url);
            method = 'DELETE';
            request.headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: accessToken
            });
          } else if (requestMethod === 'Put') {
            request = unirest.put(url);
            method = 'PUT';
            request.send(JSON.stringify(postdata));
            request.headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: accessToken
            });
          } else {
            request = unirest.post(url);
            method = 'POST';
            request.send(JSON.stringify(postdata));
            request.headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: accessToken
            });
          }
        } else {
          request = unirest.get(url);
          method = 'GET';
          request.headers({ Authorization: accessToken });
        }
        request.timeout(6000).end(res => {
          if (res.status !== 200 || res.error) {
            return reject(res.error);
          }
          return resolve(res.body);
        });
      });
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};
