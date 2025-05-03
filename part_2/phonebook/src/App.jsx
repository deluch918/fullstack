import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneService from "./modules/phonenumbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("positive")

  useEffect(() => {
    phoneService
      .getAll()
      .then((initialPhoneNumbers) => setPersons(initialPhoneNumbers));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const changedPerson = { ...existingPerson, number: newNumber };

        phoneService
          .update(changedPerson.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => person.name === newName ? response : person)
            );
          })
          .catch((error) => {
            console.log(`Failed at updating ${JSON.stringify(changedPerson)} due to ${error}`);
            setMessageType('negative')
            setMessage(`Info for ${newName} has already been removed from the server`)
            setTimeout(() => {setMessage(null)},5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          });
        setMessageType("positive")
        setMessage(`${newName} successfully updated`)
        setTimeout(() => {setMessage(null)},5000)
        setNewNumber("");
        setNewName("");
      }
    } else {
      const addedName = { name: newName, number: newNumber };

      phoneService.create(addedName).then((returnedPhoneNumbers) => {
        setPersons(persons.concat(returnedPhoneNumbers));
        setMessageType("positive")
        setMessage(`${addedName.name} successfully added`)
        setTimeout(() => {setMessage(null)},5000)
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete person:", error);
          alert(`${name} doesn't exist on the server`);
          setPersons(persons.filter((p) => p.id !== id));
        });
      setMessageType("positive")
      setMessage(`${name} successfully deleted`)
      setTimeout(() => {setMessage(null)},5000)
      }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType ={messageType}/>
      <Filter filter={newFilter} handleFilterChange={handleFilterInput} />
      <h2>Add New:</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
