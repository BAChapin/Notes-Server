const express = require('express')
const fs = require('fs')

require('./db/mongoose')

const Note = require('./models/note')

const app = express();

app.use(express.json())

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post('/notes', async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})