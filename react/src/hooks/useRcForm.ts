import React, {useEffect, ChangeEvent, useCallback, useRef, useState, useLayoutEffect} from "react";

type formRefType = {
    form:{
        getFieldDecorator:(field:string)=>(components:JSX.Element,props?:Record<string, any>)=> React.ReactNode,
        setFormValues:(val:Record<string, any>)=>void,
        getFieldsValue:()=>Record<string, any>
    }
}
//min-rc-form-hooks
export default function useRcForm(createOptions?:Record<string, any>):formRefType {
    const [formValues,setFormValues] = useState<Record<string, any>>(createOptions||{})
    const valuesRef = useRef(formValues);
    useLayoutEffect(() => {
        valuesRef.current = formValues;
    }, [formValues]);
    const handleChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value} = e.target
        setFormValues((pre)=>{
            return {
                ...pre,
                [name]:value,
            }
        })
    }
    const getFieldDecorator =(field:string)=>(components:JSX.Element,props?:Record<string, any>)=>{
        return React.cloneElement(components,{
            name:field,
            defaultValue:formValues[field],
            onChange:handleChange,
            ...props
        })
    }
    const getFieldsValue = useCallback(() => {
      return valuesRef.current
    },[])
    const formRef = useRef<formRefType>({form:{getFieldDecorator,setFormValues,getFieldsValue}})
    return formRef.current;
}