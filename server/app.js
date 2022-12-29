const express = require('express')
const app = express()
const port = 3000

// app.get -> HTTP메소드 get 방식으로 들어오면 콜백함수를 실행할게
// res.send -> localhost:3000에 "hello world"를 띄우겠다
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 
app.listen(port, () => {
  console.log(`Hello,  port is ${port}`)
})