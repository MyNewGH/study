import React, {useEffect, useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useRcForm from "../../hooks/useRcForm";
const Index = () => {
  const [error, setError] = useState<string>("");
  const {form:{getFieldsValue,getFieldDecorator,setFormValues}} = useRcForm({
    email:"1@134.com"
  })
  useEffect(()=>{
    setFormValues({
      email:"123@11.com"
    })
  },[])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getFieldsValue())
    // if (password !== confirmPassword) {
    //   setError("Password do not match");
    //   return;
    // }
  };
  return (
    <>
      <h1 className="fs-4">Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          {
            getFieldDecorator("email")(<Form.Control  placeholder="Enter email" type="email" />)
          }

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          {
            getFieldDecorator("password")( <Form.Control
                type="password"
                placeholder="Password"
            />)
          }

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          {
            getFieldDecorator("confirmPassword")( <Form.Control
                type="password"
                placeholder="confirmPassword"
            />)
          }

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Index;
