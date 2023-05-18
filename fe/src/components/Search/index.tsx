import { Button, Input } from "antd";
import React, { useState } from "react";
import "./index.css";


const App = (props: { setName: (arg0: string) => void }) => {
  const {setName} = props;
  const [content, setContent] = useState("");
  const getName = (e: { target: { value: any } }) => {
    setContent(e.target.value);
  };
  const search = () => {
    setName(content);
  };
  const reset = () => {
    setContent("");
    setName("");
  }
  return (
    <>
      <Input value={content} allowClear={true} onChange={getName} className="name-search" placeholder="姓名" />
      <Button onClick={search} type="primary">
        搜索
      </Button>
      <Button onClick={reset}>重置</Button>
    </>
  );
};

export default App;
