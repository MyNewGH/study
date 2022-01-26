import React, {useEffect, useState} from "react";
import Form, {Field} from "../../components/myRcForm";
import {Input,Button, Space} from 'antd'
const nameRules = {required: true, message: "请输入姓名！"};
const passwordRules = {required: true, message: "请输入密码！"};
const Index = () => {
  const [form] = Form.useForm()
  console.log(form)
  const {getFieldValue,setFieldValue} = form
  useEffect(()=>{
    setFieldValue({username: "default"});
  },[])
  //React.FormEvent<HTMLFormElement>
  const handleSubmit:React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    // validateFields((err: any, val: any)=>{
    //   console.log(err,val)
    // })
    console.log(getFieldValue("username"))
    // console.log()
    // if (password !== confirmPassword) {
    //   setError("Password do not match");
    //   return;
    // }
  };
  const finish = (val:any) => {
    console.log('finish',val)
  }
  const onFinishFailed = (err:any[],val:any) => {
    console.log('error',err,val)
  }

  return (
    <>
      <h1 className="fs-4">testForm</h1>
      <Form form={form} onFinish={finish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical">
          <Field name="username" rule={[nameRules]}>
            <Input type="text"/>
          </Field>
          <Field name="password" rule={[passwordRules]}>
            <Input type="password" onChange={(e)=>{

            }}/>
          </Field>
          <button>SUBMIT</button>
        </Space>

      </Form>

    </>
  );
};

export default Index;
