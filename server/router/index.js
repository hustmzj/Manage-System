const fs = require("fs");
const uuid = require("uuid");
const Router = require("koa-router");
const path = require("path");

const admin = fs.readFileSync(path.resolve(__dirname,"../public/admin.json"));
const userinfo = fs.readFileSync(path.resolve(__dirname,"../public/userinfo.json"));

const account = JSON.parse(admin);
let infolist = []

if(userinfo != ""){
  infolist = JSON.parse(userinfo);
}

const router = new Router();

async function checkUser(ctx) {
  const { username, password } = ctx.request.body;
  let isCorrect = false;
  for (let i in account) {
    if (account[i].username === username && account[i].password === password) {
      isCorrect = true;
      break;
    }
  }
  if (isCorrect) {
    ctx.body = { code: 0, message: "登录成功" };
    ctx.session.user = username;
  } else {
    ctx.body = { code: -1, message: "密码错误" };
  }
}

async function getUserInfo(ctx, next) {
  if (!ctx.session.user) {
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  ctx.body = { code: 1 };
  await next()
}

async function logoutUser(ctx, next) {
  ctx.session.user = null;
  ctx.body = { code: -2, message: "退出登录" };
  await next();
}

async function getUserList(ctx, next) {
  await next();
  ctx.body = {
    code: 0,
    total: 120,
    list: infolist,
    message: "获取成功" 
  };
}

async function createUser(ctx, next) {
  await next();
  const newUser = ctx.request.body;
  console.log(newUser)
  newUser.id = uuid.v4();
  console.log(newUser)
  infolist.unshift(newUser);
  fs.writeFileSync(
    "./public/userinfo.json",
    JSON.stringify(infolist)
  );
  ctx.body = { code: 0, message: "创建用户成功" };
}
 
async function updateUser(ctx, next) {
  await next();
  const data = ctx.request.body;
  for(let i in infolist){
    if(infolist[i].id === data.id){
      infolist[i] = data;
      fs.writeFileSync(
        "./public/userinfo.json",
        JSON.stringify(infolist)
      );
      break;
    }
  }
  ctx.body = { message: "修改成功" };
}

async function deleteUser(ctx, next) {
  await next();
  const {id} = ctx.request.body;
  for (let i in infolist) {
    if (infolist[i].id == id) {
      console.log("deleting",i)
      infolist.splice(i, 1);
      console.log(infolist.length)
      fs.writeFileSync(
        "./public/userinfo.json",
        JSON.stringify(infolist)
      );
      break;
    }
  }
  ctx.body = { message: "删除成功" };
}

router.post("/api/user/login", checkUser);

router.post("/api/user/logout", logoutUser);

router.get("/api/stu/list", getUserInfo, getUserList);

router.post("/api/stu/create", getUserInfo, createUser);

router.post("/api/stu/update", getUserInfo, updateUser);

router.post("/api/stu/delete", getUserInfo, deleteUser);

module.exports = router;