const express = require('express')
const fs = require('fs')

require('./db/mongoose')

const Note = require('./models/note')

const app = express();

app.use(express.json())

// CREATE
app.post('/notes', async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
})

// READ
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE
app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        note.note = req.body.note

        if (!note) {
            return res.status(400).send("Note doesn't exist.")
        }

        await note.save()
        res.status(200).send(note)
    } catch (err) {
        res.status(404).send(err)
    }
})

// DELETE

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)

        if (!note) {
            return res.status(400).send("Note doesn't exist.")
        }

        res.status(200).send("The note has been deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})