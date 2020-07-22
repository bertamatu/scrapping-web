import React, { useState, useEffect } from "react";

const axios = require("axios");
const cheerio = require("cheerio");
const BASE_URL = `http://www.lrimones.lt/index.php?imonespaieska=&raktazodis=`;
function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getSearchResults();
  }, []);

  async function getSearchResults(searchQuery) {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}${searchQuery}`);
    setLoading(false);
    const data = response.data;
    const $ = cheerio.load(data);
    $(".contact").map((i, e) => {
      const CompanyInfo = $(e).text();
      console.log(CompanyInfo);
    });
    // ---- HOW TO setCompanies ???
  }

  if (loading) {
    return (
      <p style={{ margin: 50, fontWeight: "bold", color: "green" }}>
        loading..
      </p>
    );
  }
  return (
    <div>
      <input
        style={{ margin: 50, padding: 10 }}
        type="text"
        placeholder="Enter text..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button onClick={() => getSearchResults(searchQuery)}>Search</button>
      <br />
      {/* <ul>
        {companies.map((company, index) => (
          <li key={index}>{company}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
