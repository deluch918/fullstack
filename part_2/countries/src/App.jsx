import { useEffect, useState } from "react";
import countryService from "./modules/countries";
import Country from "./components/Country";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryToShowDetails, setCountryToShowDetails] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((response) => setAllCountries(response));
  }, []);

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
    setCountryToShowDetails(null);
  };

  const handleShowButton = (country) => {
    setCountryToShowDetails(country);
  };

  const filteredCountries = searchQuery
    ? allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  let contentToRender;

  if (countryToShowDetails) {
    contentToRender = <Country country={countryToShowDetails} />;
  } else {
    if (!searchQuery) {
      contentToRender = <p>Enter a country name to start searching.</p>;
    } else if (filteredCountries.length > 10) {
      contentToRender = <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      contentToRender = (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}
            <button onClick={() => handleShowButton(country)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      contentToRender = <Country country={filteredCountries[0]} />;
    } else {
      contentToRender = <p>No matches found for {searchQuery}</p>;
    }
  }

  return (
    <div>
      find countries: <input type="text" onChange={handleInput} />
      <div>{contentToRender}</div>
    </div>
  );
}

export default App;
