const allowedCors = [
  'http://localhost:3001',
  'http://filmexplorer.nomoredomainsicu.ru',
  'https://filmexplorer.nomoredomainsicu.ru',
];

const corsHandling = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const DEFAULT_ALLOWED_METHODS = 'HEAD, GET, POST, PUT, DELETE, PATCH, OPTIONS';
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Max-Age', '600');
    return res.end();
  }
  return next();
};

module.exports = corsHandling;
