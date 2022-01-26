import {useRef} from "react";

class ClassStore {
  private store: Record<string, any>;
  private callBacks: Record<string, Function>;
  private fieldEntities: Record<string, any>;
  constructor() {
    this.store = {

    }
    this.callBacks={}
    this.fieldEntities = {};
  }
  setCallback = (callback: any) => {
    this.callBacks = {
      ...this.callBacks,
      ...callback
    };
  };
  registerEntity = (entity:Record<string, any>) => {
    // this.fieldEntities.push(entity);

    this.fieldEntities = {
      ...this.fieldEntities,
      ...entity
    };

    //
    // // 取消卸载组件的注册
    return (name:string) => {
      delete this.fieldEntities[name];
    };
  };

  setFieldValue=(newStore: any)=>{
    this.store = {
      ...this.store,
      ...newStore
    }
    Object.keys(newStore).forEach(name => {
      // step2： 更新组件
      this.fieldEntities[name].update();
    });
  }

  getFieldValue=(name:string)=>{
    return name?this.store[name]:this.store
  }
  validateFields = ()=>{
    let error: { [x: string]: any; value: any; }[] = [];
    Object.keys(this.fieldEntities).forEach(key=>{
      const {rule} = this.fieldEntities[key];
      const val = this.getFieldValue(key)
      const rules = rule&&rule[0]
      if (rules&&rules.required&&(val===undefined||val==='')){
         error.push({
           [key]:rules.message,
           value:val
         })
      }
    })
    return error

  }
  submit = ()=>{
    const {onFinish,onFinishFailed} = this.callBacks;
    let err = this.validateFields();
    if (err.length===0){
      onFinish({...this.store})
    }else {
      onFinishFailed(err,this.store)
    }
  }
  getForm = ()=>{
    return {
      setFieldValue:this.setFieldValue,
      getFieldValue:this.getFieldValue,
      validateFields:this.validateFields,
      submit:this.submit,
      setCallback:this.setCallback,
      registerEntity:this.registerEntity
    }
  }
}

export default function useForm(form:any){
  const formRef = useRef<{
    setFieldValue:ClassStore['setFieldValue'];
    getFieldValue:ClassStore['getFieldValue'];
    validateFields:ClassStore['validateFields'];
    submit:ClassStore['submit'],
    setCallback:ClassStore['setCallback'],
    registerEntity:ClassStore['registerEntity']
  }>();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = new ClassStore().getForm()
    }
  }
  return [
    formRef.current
  ]
}