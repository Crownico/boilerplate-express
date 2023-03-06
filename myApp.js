let express = require('express');
let app = express();
// 解析 post 数据的格式
const bodyParser = require("body-parser")

// app.get("/", (req, res) => res.send("Hello Express"))

// 响应静态文件
app.use("/public", express.static(__dirname + "/public"))

// 日志记录
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// 响应文件
const fileAbsolutePath  = __dirname + "/views/index.html"
app.get("/", (req, res) => res.sendFile(fileAbsolutePath))

// 响应 JSON
let resJsonData = {"message": "Hello json"}

app.get("/json", (req, res) => {
let mySecret = process.env['MESSAGE_STYLE']
  if(mySecret === "uppercase") {
    resJsonData = {"message": "HELLO JSON"}
  } 
  res.json(resJsonData)
})

// 链式调用中间件
app.get('/now', (req, res, next) => {
  next()
}, (req, res) => res.json({time: new Date().toString()}))

// 请求参数（params)
app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word})
})

// 查询参数（query）
app.get("/name", (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}`})
})

// 路由链式调用，并且解析 post 数据
app.use(bodyParser.urlencoded({extended: false}))
app.route("/name").get().post((req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}`})
})


































 module.exports = app;
