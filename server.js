const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(`${__dirname}/dist`))
app.get('*', (req, resp) => {
  resp.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} ports`)
})
