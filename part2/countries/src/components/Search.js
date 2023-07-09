
const Search = ({eventHandle, text}) => {
    console.log("The incoming value is", text)
    return (
    <div>
        find countries <input value={text}  onChange={eventHandle} /> 
    </div>
    )
}

export default Search