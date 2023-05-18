import { Divider, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const App = () => {
  const nav = useNavigate();
  axios.get('/api/stu/list').then(res => {
    if(res.data.code === -2){
      nav("../");
    }
  })
  return (
    <>
      <Divider orientation="left">关于</Divider>
      <Typography style={{ marginLeft:70 }}>
      <Title level={3}>项目简介</Title>
      <Paragraph>该项目是一个用户录入管理系统</Paragraph>
      <Title level={3}>项目功能与介绍</Title>
      <Paragraph>
        <ul>
          <li>添加以及修改用户时会进行类型检查，名字、专业为中文，电话、邮箱、头像URL要有效</li> 
          <li>点击添加用户，会出现一个表单，可添加新用户，用户的名字可以重复</li>
          <li>可以在搜索栏中对已有用户进行搜索，支持全字段模糊查询</li>
          <li>点击重置按钮，清空搜索框，重置搜索结果，显示整个用户列表</li>
          <li>点击左侧导航栏，切换人员管理和关于页面，默认为人员管理页面</li>
          <li>当鼠标悬浮在操作齿轮图案时，会出现下拉菜单，有查看、编辑和删除三个操作</li>
          <li>点击查看会跳转到用户详情页</li>
          <li>点击编辑会出现一个带表单，可以对用户信息进行编辑，此过程也会进行类型检查</li>
          <li>点击删除会出现一个提示框，确定是否删除，点击确定之后才会删除</li>
          <li>当鼠标悬浮在头像上时，会出现退出登录下拉菜单，点击即可退出登录</li>
          <li>如果当前未登录时，则无法进入到除登录页面之外的管理页面</li>
        </ul>
      </Paragraph>
    </Typography>
    </>
  );
};

export default App;
