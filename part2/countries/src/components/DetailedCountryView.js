import Weather from './Weather'

const DetailedCountryView = ({countryInfo}) => {

    return (
        <div>
            <h2>{countryInfo.name.common}</h2>
            <p>capital {countryInfo.capital[0]}</p>
            <p>area {countryInfo.area}</p>
            <p><b>Languages:</b></p>
            <ul>
                {Object.values(countryInfo.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} ></img>
            <Weather city={countryInfo.capital[0]} country={countryInfo.name.common}  />
        </div>
    )
}

export default DetailedCountryView