const services = require("../services/index");

const getList = async (ctx) => {
  const data = await services.getList();
  ctx.body = data;
};

const addItem = async (ctx) => {
  const data = await services.addItem(ctx.request.body);
  ctx.body = data;
};

const delItem = async (ctx) => {
  const data = await services.delItem(ctx.request.body);
  ctx.body = data;
};

const editItem = async (ctx) => {
  const data = await services.editItem(ctx.request.body);
  ctx.body = data;
};

const saveItem = async (ctx) => {
  const data = await services.saveItem(ctx.request.body);
  ctx.body = data;
};

module.exports = {
  getList,
  addItem,
  delItem,
  editItem,
  saveItem,
};
