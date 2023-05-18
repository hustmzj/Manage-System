import { Button, Modal, Input, Form, Select, message } from "antd";
import { useState } from "react";
import axios from "axios";
import "./index.css";

const { Option } = Select;

const App = (props: { onchange: () => void }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const { onchange } = props;
  const handleOk = () => {
    // 添加用户时 带星号的空不能为空
    const data = form.getFieldsValue([
      "name",
      "avatar",
      "grade",
      "major",
      "gender",
      "tel",
      "mail",
    ]);

    if (
      data.name === undefined ||
      data.avatar === undefined ||
      data.grade === undefined ||
      data.major === undefined ||
      data.gender === undefined ||
      data.tel === undefined ||
      data.mail === undefined
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
    
    axios.post("/api/stu/create", data).then((res) => {
      if(res.data.code === 1){
        return;
      }
    });
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      onchange();
      setConfirmLoading(false);
      form.resetFields();
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <img src="add.svg" alt="+" className="add-icon"></img>添加用户
      </Button>
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
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="专业"
            name="major"
            rules={[{ required: true, message: "Please input your major!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年级"
            name="grade"
            rules={[{ required: true, message: "Please input your grade!" }]}
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
            rules={[{ required: true, message: "Please input your gender!" }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="电话"
            name="tel"
            rules={[{ required: true, message: "Please input your tel!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="mail"
            rules={[{ required: true, message: "Please input your mail!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="头像"
            name="avatar"
            rules={[
              { required: true, message: "Please input your avatar link!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;

