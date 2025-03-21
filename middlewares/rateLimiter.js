// middlewares/rateLimiter.js
const rateLimitMap = new Map();
const MAX_REQUESTS_PER_MINUTE = 50;
const WINDOW_SIZE_IN_MS = 60 * 1000;

module.exports = function (req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();
  const rateData = rateLimitMap.get(ip);

  if (!rateData) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: currentTime });
    return next();
  }

  const elapsedTime = currentTime - rateData.firstRequestTime;
  if (elapsedTime < WINDOW_SIZE_IN_MS) {
    if (rateData.count >= MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({
        status: 429,
        message: 'Muitas requisições. Tente novamente em instantes.'
      });
    } else {
      rateData.count += 1;
      rateLimitMap.set(ip, rateData);
      return next();
    }
  } else {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: currentTime });
    return next();
  }
};
