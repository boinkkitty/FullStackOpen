/* Without express
// import http from 'http'
// const http = require('http')
 */

const express = require('express') // import express
const app = express() //instance of express
const morgan = require('morgan') // import morgan

app.use(express.json()) //adds middleware, parse JSON
app.use(morgan('tiny'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    return response.json(persons)
})

app.get('/info', (request, response) => {
    const first =   `Phonebook has info for ${persons.length} people`
    const second = new Date().toString()
    response.send(
        `<body>
            <p>${first}</p>
            <br/>
            <p>${second}</p>
        </body>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 1234567)
}

const existingId = name => {
    return persons.filter(each => each.name === name).length !== 0
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(404) . json({
            error: 'name or number is missing'
        })
    } else if (existingId(body.name)) {
        return response.status(404) . json({
            error: 'name is already in phonebook'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

