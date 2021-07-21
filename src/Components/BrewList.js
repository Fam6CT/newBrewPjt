import axios from "axios";
import React, { useState } from "react";

function BrewList(props) {
  const displayItems = props.listItems.map((listItem) => listItem).sort();
  const [viewItem, setViewItem] = useState(displayItems[0]);
  const [responseData, setResponseData] = useState([]);
  const [showElement, setShowElement] = useState(false);
  const handleChange = (e) => {
    setViewItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.openbrewerydb.org/breweries?by_type=${viewItem}`)
      .then((response) => {
        setResponseData(response.data);
        setShowElement(true);
      })
      .catch((error) => {
        console.error(error);
        setShowElement(false);
      });
  };

  let rows = responseData.map((row) => (
    <tr>
      <td className="nameCol">{row.name}</td>
      <td className="streetCol">{row.street}</td>
      <td className="stateCol">{row.state}</td>
      <td className="webCol">{row.website_url}</td>
    </tr>
  ));

  return (
    <div className="bodySection">
      <form onSubmit={handleSubmit}>
        <h2>Choose a brewery type</h2>
        <div className="container">
          <select
            onChange={handleChange}
            value={viewItem}
            className="form-control col-lg-3"
          >
            {displayItems.map((displayItem) => (
              <option key={displayItem} value={displayItem}>
                {displayItem}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      {showElement && (
        <table>
          <thead>
            <tr>
              <th className="nameCol">Brewery Name</th>
              <th className="streetCol">Street</th>
              <th className="stateCol">State</th>
              <th className="webCol">Website</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
    </div>
  );
}

export default BrewList;
