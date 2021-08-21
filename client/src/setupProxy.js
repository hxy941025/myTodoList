// setupProxy.js
const proxy = require("http-proxy-middleware");

// 跨域代理设置
module.exports = (app) => {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:8888/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
