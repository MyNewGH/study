import React from "react";
import useRequest from "../../hooks/useRequest";
import {Table,Pagination} from 'react-bootstrap'
type returnBack = {
    currentPage:number,
    data:Array<{
        id:number,
        name:string,
        time:number
    }>
    pageSize:number,
    totalPage:number
}
const {Item} = Pagination
const Tables:React.FC = ()=>{
    const {options,data,setOptions} = useRequest<returnBack>('http://localhost:4501/api/userLists',{})
    const handleClick = (index:number)=>{
        setOptions({...options,currentPage:index})
    }
    return <div>
        <Table striped bordered hover >
            <thead>
            <tr>
                <th>序号</th>
                <th>First Name</th>
                <th>timer</th>
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(data).length>0?data.data.map(item=>{
                    return <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.time}</td>
                    </tr>
                }):null
            }
            </tbody>
        </Table>
        <Pagination>
            {
                new Array(data.totalPage||0).fill(0).map((item,index)=>{
                    return <Item key={index} onClick={()=>handleClick(index+1)}>{index+1}</Item>
                })
            }
        </Pagination>
    </div>
}
export default Tables