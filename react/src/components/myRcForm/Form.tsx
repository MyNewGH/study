import React, {ReactElement, forwardRef, PropsWithChildren, ForwardedRef,useImperativeHandle} from "react";
import useForm from "./useForm";
import FieldContext from "./Formcontent";
type FormProps = {
    children:ReactElement,
    form:any
    readonly useForm?:any,
    onFinish:(val:any)=>void,
    onFinishFailed:(err:any[],val:any)=>void
}
const Form =(props:PropsWithChildren<FormProps>,ref:ForwardedRef<any>)=>{
    const {children,form,onFinish,onFinishFailed} = props
    const [formInstance] = useForm(form)
    useImperativeHandle(ref,()=>formInstance)
    formInstance?.setCallback({
        onFinish,
        onFinishFailed
    })

    return <form onSubmit={(e)=>{
        e.preventDefault();
        formInstance?.submit()
    }}>
        <FieldContext.Provider value={formInstance}>
        {
            children
        }
        </FieldContext.Provider>
    </form>
}


type Forms = {
    useForm:Function
}&React.ForwardRefExoticComponent<React.PropsWithoutRef<FormProps> & React.RefAttributes<any>>
const ForWardForm = forwardRef(Form) as Forms;
ForWardForm.useForm = useForm
export default ForWardForm
