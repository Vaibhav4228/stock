// src/api/stockService.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/aggs/ticker";

export const fetchStockData = async (ticker, from, to) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${ticker}/range/1/day/${from}/${to}`,
      {
        params: {
          adjusted: true,
          sort: "asc",
          apiKey: API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    throw error;
  }
};
