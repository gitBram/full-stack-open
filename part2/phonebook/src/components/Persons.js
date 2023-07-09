const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const Persons = ({persons, handleDeleteClick}) => {
    console.log("received persons", persons)
    return (
      <div>
        <h2>Numbers</h2>
        {persons.map((person => 
          <div key={person.id}>
            <p>{person.name} {person.number}</p> <Button handleClick={()=>handleDeleteClick(person.id)} text={"Delete"} />
          </div>
          ))}
      </div>
    )
  } 

  export default Persons