const handleErr = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        msg: "fail",
        data: "404错误",
      };
      ctx.status = 404;
    }
  } catch (err) {
    const status = err.status || 500;
    const error = ctx.status === 500 ? "Interval Server Error" : err.message;
    ctx.body = {
      msg: "fail",
      data: error,
    };
    ctx.status = status;
  }
};

module.exports = {
  handleErr,
};
