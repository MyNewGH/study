import React, {ChangeEvent, ReactElement, useContext, useEffect, useState} from "react";
import FieldContext from "./Formcontent";

const Field: React.FC<{
  children: ReactElement,
  name:string
  rule:{
    required:boolean,
    message?:string
  }[]
}> = (props) => {
  const {children,name} = props
  const [,setUpdate]=useState({})
  const content = useContext(FieldContext)
  const {setFieldValue,getFieldValue,registerEntity} =content
  const update = ()=>{
    setUpdate({})
  }
  useEffect(()=>{
    registerEntity({
      [name]:{
        ...props,
        update
      },
    })
  },[])
  const setProps = () => {
    return {
      value: getFieldValue(name),
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setFieldValue({
          [name]:value
        })
      }
    }
  }
  return React.cloneElement(children, setProps())
}
export default Field;