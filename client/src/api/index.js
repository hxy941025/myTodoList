import request from "../utils/index";
export const getList = async () => {
  return request({
    url: `/api/list`,
    method: "get",
  });
};

export const addItem = async (data) => {
  return request({
    url: "/api/add",
    method: "post",
    data,
  });
};

export const delItem = async (data) => {
  return request({
    url: "/api/delete",
    method: "post",
    data,
  });
};

export const editItem = async (data) => {
  return request({
    url: "/api/edit",
    method: "post",
    data,
  });
};

export const saveItem = async (data) => {
  return request({
    url: "/api/save",
    method: "post",
    data,
  });
};
