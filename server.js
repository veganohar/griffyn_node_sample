const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const dbconfig = require("./app/config/db.config");
const db = require("./app/models");

db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected to DB");  
}).catch((err)=>{
    console.log(err);
    process.exit();    
})

app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log("Server running");
})

app.get("/",(req,res)=>{
    res.send("Welcome to Node");
})

app.post("/dataBody",(req,res)=>{
    res.send(req.body);
}) 

app.post("/dataParams/:name/:age",(req,res)=>{
    res.send(req.params);
})

app.post("/dataQuery",(req,res)=>{
    res.send(req.query);
})

require("./app/routes/customer.route")(app);