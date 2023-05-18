import { SettingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, MenuProps, Modal, Space, Select, Form, message } from "antd";
import { Dropdown } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataType from "../../../types";
import axios from "axios";
import "./index.css";

const { Option } = Select;

const App = (props: { id: string; change: () => void; list: DataType[] }) => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { id, change, list } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    const data = form.getFieldsValue([
      "name",
      "avatar",
      "grade",
      "major",
      "gender",
      "tel",
      "mail",
    ]);
    data.id = id;
    if (
      data.name === undefined || data.name === '' ||
      data.avatar === undefined || data.avatar === '' ||
      data.grade === undefined || 
      data.major === undefined || data.major === '' ||
      data.gender === undefined || 
      data.tel === undefined || data.tel === '' ||
      data.mail === undefined || data.mail === ''
    ) {
      message.info("请输入完整的用户信息");
      return;
    }
    const regexName = /^[\u4e00-\u9fa5]{0,}$/;
    // eslint-disable-next-line no-useless-escape
    const regexAvatar = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    const regexMajor = /^[\u4e00-\u9fa5]{0,}$/;
    const regexMail = /^\S+@\S+\.\S+$/;
    const regexTel = /^[1]\d{10}$/;

    if (regexName.test(data.name) === false) {
      message.info("请输入正确的姓名");
      return;
    }

    if (regexMajor.test(data.major) === false) {
      message.info("请输入正确的专业");
      return;
    }

    if (regexTel.test(data.tel) === false) {
      message.info("请输入正确的电话号码");
      return;
    } 

    if (regexMail.test(data.mail) === false) {
      message.info("请输入正确的邮箱地址");
      return;
    }

    if (regexAvatar.test(data.avatar) === false) {
      message.info("请输入正确的头像URL");
      return;
    }

    axios.post("/api/stu/update", data).then((res) => {
      if(res.data.code === -2){
        nav("../");
      }
    });
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      change();
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const getdata = () => {
    for (let i in list) {
      if (list[i].id === id) {
        return list[i];
      }
    }
    return list[0];
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      nav(`/main/detail:${id}`);
    } else if (key === "2") {
      setOpen(true);
    } else if (key === "3") {
      setIsModalOpen(true);
    }
  };

  const determine = () => {
    setIsModalOpen(false);
    axios.post("/api/stu/delete", { id }).then((res) => {
      if(res.data.code === -2){
        nav("../");
      }
    });
    change();
  };

  const cancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <a id="setting-icon" href="/#" onClick={(e) => e.preventDefault()}>
          <Space>
            <SettingOutlined
              className="setting-icon"
              style={{ fontSize: "14px" }}
            />
          </Space>
        </a>
      </Dropdown>
      <Modal
        title="编辑用户"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText={"取消"}
        okText={"确认"}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={getdata()}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="专业"
            name="major"
            rules={[{ required: true, message: "请输入专业!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年级"
            name="grade"
            rules={[{ required: true, message: "请选择年级!" }]}
          >
            <Select>
              <Option value="2022级">2022级</Option>
              <Option value="2021级">2021级</Option>
              <Option value="2020级">2020级</Option>
              <Option value="2019级">2019级</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: "请选择性别!" }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="电话"
            name="tel"
            rules={[{ required: true, message: "请输入电话!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="mail"
            rules={[{ required: true, message: "请输入邮箱!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="头像"
            name="avatar"
            rules={[
              { required: true, message: "请输入头像链接!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={<><ExclamationCircleOutlined id="tipsss-icon"></ExclamationCircleOutlined><p id="tipsss">提示</p></>}
        open={isModalOpen}
        onOk={determine}
        onCancel={cancel}
        cancelText={"取消"}
        okText={"确认"}
      >
        <p>确定要删除用户“{getdata().name}”吗？</p>
      </Modal>
    </>
  );
};

export default App;

const items: MenuProps["items"] = [
  {
    label: "查看",
    key: "1",
  },
  {
    label: "编辑",
    key: "2",
  },
  {
    label: "删除",
    key: "3",
  },
];
