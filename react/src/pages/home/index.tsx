import React from "react";
import { Nav } from "react-bootstrap";

const Index = () => {
  return <Nav
      activeKey="/home"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  >
    <Nav.Item>
      <Nav.Link href="/table">table</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1" href='/drop'>drop</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2" href='/test'>Form</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-3" href='/search'>search</Nav.Link>
    </Nav.Item>
  </Nav>;
};

export default Index;
