const errorHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const statusCode = err?.statusCode ? err.statusCode : 500;
  const message = err?.message;

  res.status(statusCode).json({
    stack,
    message,
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};

module.exports = {
  errorHandler,
  notFound,
};
