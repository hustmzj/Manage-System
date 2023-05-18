import { Descriptions } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DataType from "../../../types";
import axios from "axios";
import "./index.css";

type Params = {
  id: string;
};
const App: React.FC = () => {
  const params = useParams<Params>();
  let initItem = {
    id: "",
    avatar: "",
    gender: "",
    grade: "",
    mail: "",
    major: "",
    name: "",
    tel: "",
  };
  const [item, setItem] = useState<DataType>(initItem);
  let list = [];
  axios
    .get("/api/stu/list", {
      params: {
        pageindex: 1,
        pagesize: 20,
      },
    })
    .then((res) => {
        list = res.data.list;
        for (let i in list) {
          if (list[i].id === params.id?.slice(1) && list[i].id !== item.id) {
            setItem(list[i]);
            break;
          }
        }
      
    });
  return (
    <Descriptions title="User Info" column={1} className={"userinfo-detail"}>
      <Descriptions.Item label="头像">
        <img src={item.avatar} style={{width:"150px",height:"150px"}} alt="avatar"></img>
      </Descriptions.Item>
      <Descriptions.Item label="姓名">{item.name}</Descriptions.Item>
      <Descriptions.Item label="专业">{item.major}</Descriptions.Item>
      <Descriptions.Item label="年级">{item.grade}</Descriptions.Item>
      <Descriptions.Item label="性别">{item.gender}</Descriptions.Item>
      <Descriptions.Item label="电话">{item.tel}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{item.mail}</Descriptions.Item>
    </Descriptions>
  );
};

export default App;
