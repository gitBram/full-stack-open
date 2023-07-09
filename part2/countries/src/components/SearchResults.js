import Button from './Button'

const SearchResults = ({countries, handleViewSingleCountry}) => {
    console.log("Countries:", countries)
    countries.map(country => console.log(country.name.official))
    if (countries.length <= 10){
        return (
            <div>
                {countries
                    .map(country => <><p key={country.name.official}>{country.name.common}</p><Button eventHandler={handleViewSingleCountry(country.name.common)} text={"View"} /></> )    
                }
            </div>        
        )
    }
    return (
        <p>More than 10 results found, please narrow down further. </p>
    )
}

export default SearchResults