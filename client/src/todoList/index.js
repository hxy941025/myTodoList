import React, { useState, useEffect } from "react";
import { Input, Button, Grid, Notify, Dialog } from "zent";
import "zent/css/index.css";

const TodoList = () => {
  const [inputVal, setInputVal] = useState("");
  const [listData, setListData] = useState([]);
  const [selectedRowKeysList, setSelectedRowKeysList] = useState([]);
  const [editItem, setEditItem] = useState();

  const [isEditItemShow, setIsEditItemShow] = useState(false);

  const columns = [{ title: "全选", name: "todoItem" }];

  const handleInputValChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleEditValChange = (e) => {
    const currentId = editItem.id;
    setEditItem({ todoItem: e.target.value, id: currentId });
  };

  const handleItemAdd = () => {
    if (inputVal === "") {
      Notify.error("请输入内容");
      return;
    }
    listData.push({ id: listData.length, todoItem: inputVal });
    setListData([...listData]);
    setInputVal("");
  };

  const handleItemListChange = () => {
    console.log("change");
  };

  const handleItemDel = () => {
    const newListData = [...listData].filter((item) => {
      return selectedRowKeysList.indexOf(item.id) === -1;
    });

    for (let i = 0; i < newListData.length; i++) {
      newListData[i].id = i;
    }
    setListData(newListData);
  };

  const handleItemEdit = () => {
    const newListData = [...listData];
    newListData[editItem.id] = { id: editItem.id, todoItem: editItem.todoItem };
    setListData(newListData);
    setIsEditItemShow(false);
  };

  const handleItemSearch = () => {
    const searchListData = [...listData].filter((item) => {
      if (inputVal === "") return item;
      return item && item.todoItem == inputVal;
    });
    setListData(searchListData);
  };

  return (
    <div>
      <div>
        <Input showClear onChange={handleInputValChange} value={inputVal} />
        <Button type="primary" onClick={handleItemAdd} icon="plus">
          添加
        </Button>
        <Button type="success" onClick={handleItemSearch} icon="search">
          查询
        </Button>
        <Button type="danger" onClick={handleItemDel} icon="close">
          删除
        </Button>
      </div>
      <Grid
        columns={columns}
        datasets={listData}
        rowKey="id"
        rowClassName={(data, index) => `${data.id}-${index}`}
        onRowClick={(data, index, event) => {
          setEditItem(data);
          setIsEditItemShow(true);
          console.log(data, index);
        }}
        selection={{
          onSelect: (selectedRowKeys, selectedRows, currentRow) => {
            console.log(selectedRowKeys, selectedRows, currentRow);
            setSelectedRowKeysList(selectedRowKeys);
          },
        }}
        onChange={handleItemListChange}
      />
      <Dialog
        visible={isEditItemShow}
        onClose={() => setIsEditItemShow(false)}
        footer={
          <div>
            <Button onClick={() => setIsEditItemShow(false)}>关闭</Button>
            <Button type="primary" onClick={handleItemEdit}>
              保存
            </Button>
          </div>
        }
        title="编辑"
      >
        <Input
          showClear
          onChange={handleEditValChange}
          value={editItem && editItem.todoItem}
        />
      </Dialog>
    </div>
  );
};

export default TodoList;
