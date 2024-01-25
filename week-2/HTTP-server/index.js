const  express = require('express');

const app = express();
app.use(express.json())
const port = 3000;

const ob = '{"name":"John", "age":30, "car":null}';

app.get("/" ,(req,res)=>{
    console.log(req.body);
    res.send(JSON.parse(ob));
});

app.post("/" ,(req,res)=>{
    const body =  req.body
    console.log(body);  
    res.send('POST request to the homepage')
});
app.listen(port,()=>{
    console.log("Server is running on port "+port);
});