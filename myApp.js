var express = require('express');
var app = express();
const mySecret = process.env['MESSAGE_STYLE']
var bodyParser = require("body-parser");
console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(function middleware(req, res, next){
  let s = req.method + " " + req.path + " - " + req.ip;
  console.log(s);
  next();
});

app.get("/", (req, res)=>{
   res.sendFile(__dirname + "/views/index.html");

});
app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
   return res.json({"message": "HELLO JSON"})
  } else {
  return res.json({"message": "Hello json"})
  }
});
app.get("/now", (req, res, next)=>{
  req.time = new Date().toString();
  next();
},
(req,res)=>{
  res.send({
    time:req.time
  })
});
app.get("/:word/echo", (req, res)=>{
  let {word} = req.params;
  res.json({
    echo:word
  })
});

app.get("/name", function(req, res) {
  let { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", (req, res)=>{
  let names = req.body.first + " " + req.body.last;
  res.json({name:names});
});


































 module.exports = app;
