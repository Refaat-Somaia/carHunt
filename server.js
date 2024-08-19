const express = require('express')
const app = express()
const cors = require('cors')
app.use(
    cors({
        origin:'http://localhost:3000', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
     })
)

app.get('/data',(req,res)=>{
    res.json({name:"Refaat"})
})
app.listen(8080)