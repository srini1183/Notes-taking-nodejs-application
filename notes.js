const fs = require('fs')
const chalk = require('chalk')


const removeNotes = (title) => {
    const notes = loadNotes()
    const done = notes.filter((note) => {
        return (note.title !== title)
    })
    if (notes.length !== done.length) {
        saveNotes(done)
        console.log(chalk.green.bold('Note removed!'))
    } else {
        console.log(chalk.red.bold('Note not found!'))
    }
}


const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicates = notes.filter((note) => {
        return note.title === title
    })
    if (duplicates.length === 0) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.bold('Note added!'))
    }
    else {
        console.log(chalk.red.bold('Title taken!'))
    }


}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}
const loadNotes = () => {
    try {
        const data = JSON.parse((fs.readFileSync('notes.json')).toString())
        return data
    } catch (e) {
        return []
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    const required = notes.filter((note) => {
        return note.title === title
    })
    if (required.length != 0) {
        required.forEach(element => {
            console.log(chalk.cyan.bold(element.body))
        })
    } else {
        console.log(chalk.red.bold('Notes not found!'))
    }

}
const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(chalk.blue.italic(element.title))
    });
}
module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}