const express = require('express')
const letterForm = require('./Router/letterForm') 
const app = express()
const port = 3001;
// const cors = require('cors');
// const test = require('./Router/text');

// CORS 이슈 해결
// app.use(express.json());
// const cors = require('cors');
// app.use(cors("*"));

// app.get -> HTTP메소드 get 방식으로 들어오면 콜백함수를 실행할게
// res.send -> localhost:3000에 "hello world"를 띄우겠다

app.use(express.static(__dirname + "/../client/build"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/../client/build/index.html")
})

app.use("/letterForm", letterForm)

app.listen(port, () => {
  console.log(`Hello,  port is ${port}`)
})

app.get('*', (res, req) => {
  req.sendFile(__dirname + "/../client/build/index.html");
});