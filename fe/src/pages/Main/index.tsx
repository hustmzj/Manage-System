import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import Button from "../../components/Search";
import Modal from "../../components/Create";
import Table from "../../components/Table";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState(1);
  const onchange = () => {
    const a = state+1;
    setState(a);
  }
  const search = (name:string) => {
    setName(name)
  }
  const [name, setName] = useState("")
  return (
    <>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Modal onchange={onchange}></Modal>
        <Button setName={search}></Button>
        <Table name={name}></Table>
      </Content>
    </>
  );
};

export default App;
