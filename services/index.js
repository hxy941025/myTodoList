const mysql = require("../mysql/index");

const getList = async () => {
  return new Promise((resolve, reject) => {
    resolve(mysql.getList());
  });
};

const addItem = async (data) => {
  return new Promise((resolve, reject) => {
    mysql.addItem(data);
    resolve({
      msg: `success`,
    });
  });
};

const delItem = async (delList) => {
  return new Promise((resolve, reject) => {
    mysql.delItem(delList);
    resolve({
      msg: "success",
    });
  });
};

const editItem = async (data) => {
  return new Promise((resolve, reject) => {
    mysql.editItem(data);
    resolve({
      msg: "success",
    });
  });
};

const saveItem = async (data) => {
  return new Promise((resolve, reject) => {
    mysql.saveItem(data);
    resolve({
      msg: "success",
    });
  });
};

module.exports = {
  getList,
  addItem,
  delItem,
  editItem,
  saveItem,
};
