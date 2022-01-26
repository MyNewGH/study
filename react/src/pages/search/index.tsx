import React, { useState } from 'react';
import { Form, Row, Col, Input, Button ,Select} from 'antd';
import data from './text.js'
const {Option} = Select

const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const {commodityAttributeList,unitPricePicList} = data
  console.log(commodityAttributeList,unitPricePicList)
  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < commodityAttributeList.length; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${commodityAttributeList[i].customerAttribute.name}`}
            label={`${commodityAttributeList[i].customerAttribute.name}`}
          >
            <Select>
              {
                commodityAttributeList[i].customerAttributeValueList.map(item=>{
                  return <Option value={item.id}>{item.value}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    let arras:Array<any> = []
    let obj:any = {}
    const filterArr = Object.values(values).filter(f=>f!==undefined);
    console.log(filterArr.length)
    for (let i=0;i<unitPricePicList.length;i++){
      const {attributeAndValueList} = unitPricePicList[i]
      attributeAndValueList.forEach(attr=>{
       filterArr.forEach((val,index)=>{
            if (attr.customerAttributeValue.id===val){
              !obj[unitPricePicList[i].id]?obj[unitPricePicList[i].id] = 1:obj[unitPricePicList[i].id]++
            }
        })
      })
      if (obj[unitPricePicList[i].id]===filterArr.length){
        arras.push(unitPricePicList[i])
      }
    }

    // arras = arras.reduce(function (item, next) {
    //   if (!obj[next.id]){
    //     obj[next.id] = 1
    //   }else {
    //     obj[next.id]++
    //   }
    //   if (obj[next.id]===filterArr.length){
    //     item.push(next)
    //   }
    //   return item
    //   // obj[next.id] ? 0 : obj[next.id] = 0= && item.push(next);
    // }, []);
    console.log(arras)
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          {/*<a*/}
          {/*  style={{ fontSize: 12 }}*/}
          {/*  onClick={() => {*/}
          {/*    setExpand(!expand);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {expand ? <UpOutlined /> : <DownOutlined />} Collapse*/}
          {/*</a>*/}
        </Col>
      </Row>
    </Form>
  );
};
export default AdvancedSearchForm