const express = require('express')
const { response } = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'ToDo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connect to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))



app.get('/', (req, res)=>{
    db.collection('todos').find().toArray()
    .then(data=>{
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addToDo', (req, res)=>{
    db.collection('todos').insertOne(req.body)
    .then(result =>{
        console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTask', (req, res)=>{
    db.collection('todos').deleteOne({task: req.body.taskName})
    .then(result =>{
        console.log('Task Completed')
        res.json('Task Completed')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})