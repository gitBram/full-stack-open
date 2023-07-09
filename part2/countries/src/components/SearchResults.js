import Button from './Button'

const SearchResults = ({countries}) => {
    if (countries.length <= 10){
        return (
            <div>
                {countries
                    .map(country => {
                        <div>   
                            <p key={country.name.official}>{country.name.common}</p>
                            <button onClick={} value={"select"}></button>
                        </div>
                    })    
                }
            </div>
        )
    }
    return (
        <p>More than 10 results found, please narrow down further. </p>
    )
}

export default SearchResults