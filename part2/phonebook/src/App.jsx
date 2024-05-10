import { useState , useEffect} from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import axios from 'axios'
import contactServices from "./services/contactServices.jsx";

const Notification = ({message}) => {
    if(message === null) {
        return null
    }

    return(
        <div className='notification'>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [currentFilter, setNewFilter] = useState('')
    const[latestNotification, setNotification] = useState('Latest Update')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
        contactServices
            .getAll()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
            .catch(error => {
                alert(
                    `Could not retrieve from server`
                )
            })
    }
    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        const existingPerson = persons.filter(each => each.name === newName)
        const updatedContact = {
            ...existingPerson[0],
            number: newNumber
        }

        if(existingPerson.length !== 0) {
            if(window.confirm(`${existingPerson[0].name} is already added to phonebook, replace the old number with a new one?`))
            {
                contactServices
                    .update(existingPerson[0].id, updatedContact)
                    .then(returnedPerson => {
                        setPersons(persons.map(each => each.id === returnedPerson.id ? returnedPerson : each))
                        setNewName('')
                        setNewNumber('')
                        setNotification(
                            `${returnedPerson.name}'s contact has been updated`
                        )
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
                    .catch(error => {
                        alert(
                            `Could not replace number`
                        )
                    })
            }
        } else {
            contactServices
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotification(
                        `${returnedPerson.name}'s contact has been created`
                    )
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    alert(
                        `Could not create new number`
                    )
                })
        }
    }

    const remove = (id) => {
        const toDelete = persons.find(n => n.id === id)
        if(window.confirm(`Delete ${toDelete.name} ?`))
        {
            contactServices
                .remove(id)
                .catch(error => {
                    alert(
                        `Could not delete from server`
                    )
                })
            setPersons(persons.filter(persons => persons.id !== id))
        }
    }

    const handleNewName=(event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const filtered = persons.filter(each => each.name.includes(currentFilter))

    return(
        <div>
            <h2>Phonebook</h2>
            <Notification message = {latestNotification}/>
            <Filter value = {currentFilter} onChange = {handleFilter} />
            <h3>Add a new</h3>
            <PersonForm submit={addPerson} name={newName} handleName={handleNewName} number={newNumber} handleNumber={handleNewNumber}/>
            <h3>Numbers</h3>
            <Persons list = {filtered} deleteFn = {remove}/>
        </div>
    )

}

export default App
