const PersonForm = ({handleNameChange, handleNumberChange, handleSubmit, newName, newNumber}) => {
    return (
      <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
    )
  }

  export default PersonForm