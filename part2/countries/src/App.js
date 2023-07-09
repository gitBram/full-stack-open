import './App.css';
import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import DetailedCountryView from './components/DetailedCountryView';

function App() {
  // Init state vars
  const [newCountrySearch, setNewCountrySearch] = useState("")
  const [countries, setCountries] = useState([])
  const [detailViewCountry, setDetailViewCountry] = useState(null)


  // Load the data
  const loadCountriesHook = () => {
    countryServices.getAll()
      .then(receivedCountries => {setCountries(receivedCountries);console.log(receivedCountries)})
  }
  useEffect(loadCountriesHook, [])

  // Field change functions
  const handleNewCountrySearch = (event) => {
    const newCountrySearchValue = event.target.value
    setNewCountrySearch(newCountrySearchValue)

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newCountrySearchValue.toLowerCase()))
    const numberFoundCountries = filteredCountries.length

    if (numberFoundCountries===1) {
      console.log("Filtered countries:", filteredCountries)
      countryServices.getCountryInfo(filteredCountries[0].name.common)
        .then(countryInfo => setDetailViewCountry(countryInfo))
    } else {
      setDetailViewCountry(null)
    }
  }

  if (detailViewCountry === null){
    return (
      <div className="App">
        <Search eventHandle={handleNewCountrySearch}  text={newCountrySearch} />
        <SearchResults countries={countries.filter(country => country.name.common.toLowerCase().includes(newCountrySearch.toLowerCase()))} />
      </div>
    );
  }
  return (
    <div className="App">
      <Search eventHandle={handleNewCountrySearch}  text={newCountrySearch} />
      <DetailedCountryView countryInfo={detailViewCountry}/>
    </div>
  );
}

export default App;
