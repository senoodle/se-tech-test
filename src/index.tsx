import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import SaleInfo from "./pages/SaleInfo/SaleInfo";
import SearchResults from "./components/SearchResults/SearchResults";
import SaleDetails from "./components/SaleDetails/SaleDetails";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const api = fetch("https://staging.sparrow.escapes.tech/graphql/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
    { saleSearch(query: "London", travelTypes: "HOTEL_ONLY") { resultCount
      sales(limit: 10, offset: 0) {
      id editorial {
      title
      destinationName }
      photos { url } }
      }
      sale(saleId: "A16598") { editorial {
      title destinationName hotelDetails
      }
      prices {
      leadRate { forDisplay
      } }
      photos { url } }
    }
    `,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
  });

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search?query=<search term>" element={<SearchResults />} />
      <Route path="/sale/<ID>" element={<SaleDetails />} />
    </Routes>
  </BrowserRouter>
);
