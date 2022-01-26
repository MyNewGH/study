import {useEffect,useState} from 'react';
type Options={
    pageSize: number,
    currentPage: number
}
interface RequestBack<T>{
    data:T,
    options:Options,
    setOptions:(val:Options)=>void
}
function useRequest<T extends object>(url:string,defaultData:Partial<T>):RequestBack<T>{
    const [options,setOptions] = useState<Options>({
        pageSize:5,
        currentPage:1
    })
    const [data,setData] = useState<T>(defaultData as T)
    const getData = ()=>{
        let {currentPage,pageSize} = options;
        fetch(`${url}?currentPage=${currentPage}&pageSize=${pageSize}`).then(res=>res.json()).then(res=>{
            setData(res)
        })
    }
    useEffect(getData,[options,url])
    return {
        data:data as T,
        options,
        setOptions
    }
}
export default useRequest