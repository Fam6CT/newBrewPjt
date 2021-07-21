import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Search() {
    const showItems= ["micro", "nano", "regional", "brewpub", "large", "planning", "bar",
"contract", "proprietor", "closed"];
    const [suggestions, setSuggestions]=useState([]);
    const[displayList, setDisplayList] = useState(false);
    // const displayItems = showItems.map((showItem) => showItem).sort();
    const [responseData, setResponseData] = useState([]);
    const[showElement, setShowElement]= useState(false);
    const[errMsg, setErrMsg] = useState('');
    const[showErr, setShowErr]= useState(false);

    const onClickInput = () => {
      setErrMsg('');
    setShowErr(false);}

    const onInputChange = (e) =>{
      const val =  e.target.value;
      let newSuggest = [];
      if(val.length > 0){
          const regex = new RegExp(`^${val}`, 'i');
          newSuggest  = showItems.sort().filter(v=>regex.test(v));
      }
      setSuggestions(newSuggest);
      setDisplayList(true);
    };

    const handleSubmit=(e) => {
        e.preventDefault();
        setDisplayList(false);
        const validVal = ((document.getElementById('inputBrewery').value)===suggestions[0])? true: false;

        if(validVal){
        axios.get(`https://api.openbrewerydb.org/breweries?by_type=${suggestions}`)
          .then((response) => {
            setResponseData(response.data);
            setShowElement(true);
            setErrMsg('');
            setShowErr(false);
          })
          .catch((error) => {
            console.error(error);
            setShowElement(false);
          });
        } else{
            setErrMsg('Please enter a valid input');
            setShowErr(true);
        }
    };

    // Table rows
    let rows =
        responseData.map(row => <tr><td className="nameCol"><Link to={`/details/${row.id}`}
          > {row.name}</Link></td><td className="streetCol">{row.street}</td><td className="stateCol">{row.state}</td><td className="webCol">{row.website_url}</td></tr>);


    return (
        <div role="form" aria-labelledby="searchForm" className="bodySection">
            <form id="searchForm" onSubmit={handleSubmit}>
            <h2>Type of brewery</h2>
            <div className="container">
            <input 
            placeholder = "Type of brewery" 
            onChange={onInputChange}
            onClick = {onClickInput}
            type="text"
            id="inputBrewery" />
            <br/><br/>
            <h6>{showErr && errMsg}</h6>
            <button type="submit">Submit</button>
            </div>
        </form>
        <br/><br/>  
            {displayList && suggestions.length!==0 &&
                <section>
                <h3>Possible options</h3>
                <ul className="searchList">
                {suggestions.map((showItem)=> <li>{showItem}</li>)}
            </ul>
            </section>}
            <br/><br/>
            {showElement && <table>
              <caption>Click on name to get more details</caption>
                <thead>
                <tr>
                <th className="nameCol">Brewery Name</th>
                <th className="streetCol">Street</th>
                <th className="stateCol">State</th>
                <th className="webCol">Website</th>
                </tr>
                </thead>
              <tbody>
                {rows}
              </tbody>
            </table>}        
        </div>
    )
}

export default Search;
