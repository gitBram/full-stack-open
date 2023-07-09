const Filter = ({eventHandle}) => {
    return (
      <div>      
        <form>
          <div>
            filter shown with <input onChange={eventHandle}/>
          </div>
        </form>
      </div>
    )
  }

  export default Filter