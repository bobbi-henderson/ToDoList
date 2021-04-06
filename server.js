const express = require('express')
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
    db.collection('todos').find().sort({priority: -1}).toArray()
    .then(data=>{
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addToDo', (req, res)=>{
    db.collection('todos').insertOne({task: req.body.task.trim(), priority:0})
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

app.put('/increasePriority', (req, res)=>{
    db.collection('todos').updateOne({task: req.body.taskName, priority: req.body.priorityLevel},
        {$set:{
            priority: req.body.priorityLevel + 1
        }
    })
    .then(result =>{
        console.log('Increased Priority')
        res.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.put('/decreasePriority', (req, res)=>{
    db.collection('todos').updateOne({task: req.body.taskName, priority: req.body.priorityLevel},
        {$set:{
            priority: req.body.priorityLevel - 1
        }
    })
    .then(result =>{
        console.log('Decreased Priority')
        res.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})