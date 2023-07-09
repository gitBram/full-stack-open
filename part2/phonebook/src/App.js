import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsServices from './services/persons'


const App = () => {

  // Get persons data
  const [persons, setPersons] = useState([]) 

  const loadPersonsHook = () => {
    personsServices.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }
  
  useEffect(loadPersonsHook, [])

  // Fields' states
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  // Fields' changes
  const handleNameChange = (event) => {
    console.log("name",event.target.value)
    setNewName(event.target.value)  
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)  
  }
  const handleSearchChange = (event) => {
    const newSearchFieldContent = event.target.value
    console.log(newSearchFieldContent)
    setNewSearch(newSearchFieldContent)      
  }

  // Notifications 
  const [newNotification, setNewNotification] = useState({notification: "", notificationType: ""})

  const setNewNotificationWrapper = (notification, notificationType, duration) => {
    setNewNotification({notification, notificationType})
    setTimeout(() => {
      setNewNotification({notification: "", notificationType: ""})
    }, duration)
  }  


  const deleteEntry = (id) => {
    if(window.confirm(`Are you sure that you want to delete ${persons.find(person => person.id === id).name}?`)){
      personsServices.doDelete(id)
      .then((responseData) => {
        setPersons(persons.filter(person => person.id !== id))
        setNewNotificationWrapper(`The person ${newName} was deleted!`, "notification", 3000)
      })
      .catch(error => {
        setNewNotificationWrapper("Someone else already deleted this entry on the server!", "error", 3000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }    
  }

  // new name submit
  const handleSubmit = (event) => {
    event.preventDefault()
    // if person does not exist yet
    console.log("The persons are", persons)
    const existingPerson = persons.find(person => person.name === newName)
    console.log("The found person is ", existingPerson)
    if (typeof existingPerson === 'undefined'){
      personsServices
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNotificationWrapper(`The person ${newName} was created!`, "notification", 3000)
        })
        .catch(error => setNewNotificationWrapper(error.message, "error", 3000))
      } 
    // if person already exists
    else {
      if(window.confirm(`${persons.find(person => person.id === existingPerson.id).name} is already in the phonebook. Do you want to edit the according phone number?`)){
        personsServices
        .update(existingPerson.id, {name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewNotificationWrapper(`The phone number for person ${newName} was updated!`, "notification", 3000)
        })
        .catch(error => setNewNotificationWrapper(error.message, "error", 3000))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={newNotification.notification} notificationType={newNotification.notificationType} />
      <Filter eventHandle={handleSearchChange}/>
      <h2>Phonebook</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newNumber={newNumber} newName={newName} />
      <Persons persons={persons.filter((person)=>person.name.includes(newSearch))} handleDeleteClick={deleteEntry} />
    </div>
  )
}

export default App