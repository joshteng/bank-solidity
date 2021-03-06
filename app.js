const express = require('express')
const app = express()
const port = 3000

app.use(express.static('website'))

app.get('/', (req, res) => {
  res.redirect("/bank.html")
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
