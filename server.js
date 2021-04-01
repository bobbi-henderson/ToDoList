const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'ToDo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connect to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})