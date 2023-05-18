## 思路
- 先确定项目的框架，一共需要5个页面，分别是`Sign`登录，`App`主页，`Main`人员管理，`Detail`用户详情和`About`关于，其中人员管理，用户详情，和关于这三个页面属于同一级，通过路由切换相应的组件； 
  
  ```bash
  {   #登录页面
    path: "/", 
    element: <Sign />,
  },
  { #主页
    path: "main", 
    element: <App />,
    children: [
      { #主页默认显示人员管理一栏
        path: "",
        element: <Main />,
      },
      { #用户详情页
        path: "detail:id",
        element: <Detail />,
      },
      { #切换关于页面
        path: "about",
        element: <About />,
      },
    ],
  },
  ```

- 整个项目按功能拆分成6个组件，分别为`Action`人员表项操作部分，`Search`人员搜索部分组件，`Create`添加人员组件，`Info`人员详情组件，`Nav`导航栏组件， `Table`人员表格组件。首先根据需求找到需要使用的Antd组件，并修改样式，将前端UI界面设计好，然后再添加事件，使用redux全局状态管理，监视用户列表的变化，添加或修改用户时，刷新`Main`组件，在添加或者修改用户时，向服务器发Ajax请求，修改后端存储的数据。

## 问题
- 在使用redux进行全局状态管理时，由于个人对redux使用没有完全掌握，经过在不断查阅资料，修改代码之后，还是没能成功实现全局状态管理。于是采用了另一种方法实现：使用React的hook，在更新用户列表之后，调用父组件传来的方法，在上一次的作业中也使用过这个方法。这个方法会调用一个父组件的setSate函数，以此驱动组件刷新。
- 使用Antd的组件时，由于成品组件都是封装好的，使用的时候，无法对其进行自定义的操作，需要查看帮助文档，调用给定api实现自己需要的功能，以及样式修改时，可以在HTML中找到对应的classname，在新建的.css文件中修改，但这种方式可能影响其他组件，因为它们可能有相同的classname，所以本项目基本上是对需要修改的组件定义新的classname或id，以此能准确地修改样式而不对其他组件产生其他影响。