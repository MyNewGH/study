const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(logger("dev"))
let total = 26;
app.get(`/api/userLists`,function (req,res){
  let {currentPage,pageSize} = req.query;
  let list = [];
  let offset = (currentPage-1)*pageSize;
  let len = Math.min(offset+pageSize*1,total)
  for (let i=offset;i<len;i++){

    list.push({
      id:i+1,
      name:`jack one and ${i}`,
      time:`${Math.floor(Math.random()*100000000)}`
    })
  }
  res.json({
    currentPage:currentPage*1,
    pageSize:pageSize*1,
    totalPage:Math.ceil(total/pageSize),
    data:list
  })
})
app.listen(4501,()=>{
  console.log(`server is run in http://localhost:4501`)
})