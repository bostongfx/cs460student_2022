/* minimal express server since Chromium doesn't like COR */
const express = require('express')
const app = express()
app.use(express.static("app"))
var server = app.listen(3000, () =>
{
    console.log("started: http://localhost:" + server.address().port)
})
