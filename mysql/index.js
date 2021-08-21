let todoListsStorage = [];

const getList = () => {
  return todoListsStorage;
};

const addItem = (item) => {
  todoListsStorage.push(item);
  return;
};

const delItem = (delList) => {
  if (delList && !delList.length) return;
  const newListData = todoListsStorage.filter((item) => {
    return delList.indexOf(item.id) === -1;
  });
  todoListsStorage = newListData;
  for (let i = 0; i < todoListsStorage.length; i++) {
    todoListsStorage[i].id = i;
    todoListsStorage[i].todoItem = newListData[i].todoItem;
    todoListsStorage[i].status = newListData[i].status;
  }
  console.log(todoListsStorage);
  return;
};

const editItem = (item) => {
  const index = item.id;
  todoListsStorage[index] = item;
  return;
};

const saveItem = (acmList) => {
  for (let i = 0; i < acmList.length; i++) {
    todoListsStorage[acmList[i]].status = 1;
  }

  return;
};

module.exports = {
  getList,
  addItem,
  delItem,
  editItem,
  saveItem,
};
