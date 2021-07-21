import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Details = ({ match }) => {
  const [item, setItem] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [showElement, setShowElement] = useState(false);

  const fetchItem = useCallback(async () => {
    const getItem = await fetch(
      `https://api.openbrewerydb.org/breweries/${match.params.id}`
    );
    const item = await getItem.json();
    setItem(item);

    // Similar brewery type
    if (item.brewery_type) {
      axios
        .get(
          `https://api.openbrewerydb.org/breweries?by_type=${item.brewery_type}`
        )
        .then((response) => {
          setResponseData(response.data);
          setShowElement(true);
        })
        .catch((error) => {
          console.error(error);
          setShowElement(false);
        });
    }   
  }, [match]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return (
    <>
      <div className="bodySection">
        <h2>{item.name}</h2>
        <section className="sectionArea">
          <h4> Brewery Details</h4>
          <br />
          {item?.street && <p>Street : {item.street}</p>}
          {item?.city && <p>City : {item.city}</p>}
          {item?.state && <p>State : {item.state}</p>}
          {item?.postal_code && <p>Zip : {item.postal_code}</p>}
          {item?.country && <p>Country : {item.country}</p>}
          {item?.phone && <p>Phone : {item.phone}</p>}
          {item?.website_url && <p>Website: {item.website_url}</p>}
        </section>
      </div>
      <br />
      <br />
      <br />
      {showElement && (
        <div className="bodySection">
          <section className="sectionArea">
            <h4> Names of similar type breweries</h4>
            <br />
            {responseData.map((row) => (
              <p>{row.name}</p>
            ))}
            ))
          </section>
        </div>
      )}
    </>
  );
};

export default Details;
