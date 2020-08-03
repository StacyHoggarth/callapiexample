import React, { useState } from 'react';
import ReactDOM from "react-dom";
import "./styles.css";
import axios from 'axios';


function App() {
  const [books, setBooks] = useState(null);

  //const apiURL = "https://federation.taylorcorp.com/connect/token";
  const apiURL = "https://api.centraaccess.com/api/v1/Jobs/JobRecord/02000Z?jobNumber=000568&pageNumber=1&numberOfRecords=50";
  const fetchData = async () => {
    //const response = await axios.get(apiURL);
    try {
      console.log ("calling " + apiURL );
      const response = await axios.get(apiURL
        /*,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              credentials: 'same-origin',
              body: {
                'client_id': 'scs_prod_CentraAccessAPI',
                'client_secret': 'gW?BXFwLE*5Y!d4',
                'scope': 'va_access_api'
              } 
            }*/
            );
            console.log(response);
            setBooks(response.data);
      } catch (error) {
              console.error(error);
      }
    }

  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <h2>Fetch a list from an API and display it</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
      </div>


      {/* Display data from API */}

      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(', ');

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
