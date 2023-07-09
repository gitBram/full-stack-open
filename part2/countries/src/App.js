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

  // Load detailed view
  const loadDetailedView = (country) => {
    countryServices.getCountryInfo(country)
        .then(countryInfo => setDetailViewCountry(countryInfo))
  }
  const loadDetailedViewHandle = (country) => () => {
    loadDetailedView(country)
  }

  // Field change functions
  const handleNewCountrySearch = (event) => {
    
    const newCountrySearchValue = event.target.value
    console.log("NEW INPUT VAR:", newCountrySearchValue)
    setNewCountrySearch(newCountrySearchValue)
  

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newCountrySearchValue.toLowerCase()))
    const numberFoundCountries = filteredCountries.length

    if (numberFoundCountries===1) {
      loadDetailedView(filteredCountries[0].name.common)
    } else {
      setDetailViewCountry(null)
    }
  }


  // if (detailViewCountry === null){
  //   console.log("Returning list of countries...")
  //   return (
  //     <div className="App">
  //       <Search eventHandle={handleNewCountrySearch}  text={newCountrySearch} />
  //       <SearchResults countries={countries.filter(country => country.name.common.toLowerCase().includes(newCountrySearch.toLowerCase()))} handleViewSingleCountry={(countryName) => () => setNewCountrySearch(countryName)} />
  //     </div>
  //   );
  // }
  console.log("Returning detailed country page...")
  return (    
    <div className="App">
      <Search eventHandle={handleNewCountrySearch}  text={newCountrySearch} />
      {
        detailViewCountry !== null ? <DetailedCountryView countryInfo={detailViewCountry} /> : <SearchResults countries={countries.filter(country => country.name.common.toLowerCase().includes(newCountrySearch.toLowerCase()))} handleViewSingleCountry={loadDetailedViewHandle} />
      }
    </div>
  )
}

export default App;
