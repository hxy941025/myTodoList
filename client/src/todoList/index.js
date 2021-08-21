import React, { useState, useEffect } from "react";
import { Input, Button, Grid, Notify, Dialog } from "zent";
import "zent/css/index.css";
import "./style.css";
import * as Api from "../api";
const TodoList = () => {
  const [inputVal, setInputVal] = useState("");
  const [listData, setListData] = useState([]);
  const [selectedRowKeysList, setSelectedRowKeysList] = useState([]);
  const [editItem, setEditItem] = useState();
  const [isEditItemShow, setIsEditItemShow] = useState(false);

  const columns = [{ title: "全选", name: "todoItem" }];

  // 获取列表
  useEffect(() => {
    Api.getList().then((res) => {
      setListData(res);
    });
  }, []);

  const handleInputValChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleEditValChange = (e) => {
    const currentId = editItem.id;
    setEditItem({ todoItem: e.target.value, id: currentId, status: 0 });
  };

  const handleItemAdd = () => {
    if (inputVal === "") {
      Notify.error("请输入内容");
      return;
    }
    Api.addItem({ id: listData.length, todoItem: inputVal, status: 0 }).then(
      () => {
        listData.push({ id: listData.length, todoItem: inputVal, status: 0 });
        setListData([...listData]);
        setInputVal("");
      }
    );
  };

  const handleItemListChange = () => {
    console.log("change");
  };

  const handleItemDel = () => {
    Api.delItem(selectedRowKeysList).then(() => {
      const newListData = listData.filter((item) => {
        return selectedRowKeysList.indexOf(item.id) === -1;
      });
      setSelectedRowKeysList([]);

      for (let i = 0; i < newListData.length; i++) {
        newListData[i].id = i;
      }
      setListData(newListData);
    });
  };

  const handleItemAccomplish = () => {
    let newListData = listData;
    Api.saveItem(selectedRowKeysList).then(() => {
      selectedRowKeysList.map((item) => {
        newListData[item].status = 1;
      });
      setListData(newListData);
      setSelectedRowKeysList([]);
    });
  };

  const handleItemEdit = () => {
    const newListData = listData;
    Api.editItem({
      id: editItem.id,
      todoItem: editItem.todoItem,
      status: 0,
    }).then(() => {
      newListData[editItem.id] = {
        id: editItem.id,
        todoItem: editItem.todoItem,
        status: 0,
      };
      setListData(newListData);
      setIsEditItemShow(false);
    });
  };

  const handleItemSearch = () => {
    const searchListData = [...listData].filter((item) => {
      if (inputVal === "") return item;
      return item && item.todoItem === inputVal;
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
        <Button onClick={handleItemSearch} icon="search">
          查询
        </Button>
        <Button type="success" onClick={handleItemAccomplish} icon="check">
          完成
        </Button>
        <Button type="danger" onClick={handleItemDel} icon="close">
          删除
        </Button>
      </div>
      <Grid
        columns={columns}
        datasets={listData}
        rowKey="id"
        rowClassName={(data) => {
          return data.status === 1 ? "accomplish" : "todo";
        }}
        onRowClick={(data, index, event) => {
          console.log(data, index);
          if (data.status === 1) return;
          setEditItem(data);
          setIsEditItemShow(true);
        }}
        selection={{
          selectedRowKeys: selectedRowKeysList,
          onSelect: (selectedRowKeys, selectedRows, currentRow) => {
            // console.log(selectedRowKeys, selectedRows, currentRow);
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
